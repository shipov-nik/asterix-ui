import { useCallback, useEffect, useMemo, useState } from "react";
import { DefaultRecordType, RowSelection } from "../types";
import { getRowKey } from "../utils/getRowKey";

type UseRowSelectionProps<RecordType> = {
  data?: RecordType[];
  rowKey?: string | keyof RecordType;
  rowSelection?: RowSelection;
};

export const useRowSelection = <RecordType extends DefaultRecordType>(
  props: UseRowSelectionProps<RecordType>,
) => {
  const { data, rowKey = "key", rowSelection } = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<string | number>>(
    rowSelection?.selectedRowKeys || [],
  );

  // Синхронизация с внешним selectedRowKeys
  useEffect(() => {
    if (rowSelection?.selectedRowKeys !== undefined) {
      setSelectedRowKeys(rowSelection.selectedRowKeys);
    }
  }, [rowSelection?.selectedRowKeys]);

  // Проверка, выбрана ли строка
  const isRowSelected = useCallback(
    (row: RecordType, index: number): boolean => {
      const key = getRowKey(row, index, rowKey);
      return selectedRowKeys.includes(key);
    },
    [selectedRowKeys, rowKey],
  );

  // Переключение выбора строки
  const toggleRowSelection = useCallback(
    (row: RecordType, index: number) => {
      const key = getRowKey(row, index, rowKey);
      setSelectedRowKeys((prev) => {
        const newKeys = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
        rowSelection?.onChange?.(newKeys);
        return newKeys;
      });
    },
    [rowKey, rowSelection],
  );

  // Все ключи строк
  const allRowKeys = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => getRowKey(row, index, rowKey));
  }, [data, rowKey]);

  // Проверка, выбраны ли все строки
  const isAllRowsSelected = useMemo(() => {
    if (!data || data.length === 0) return false;
    return allRowKeys.length > 0 && allRowKeys.every((key) => selectedRowKeys.includes(key));
  }, [allRowKeys, selectedRowKeys, data]);

  // Проверка, выбрана ли хотя бы одна строка (для indeterminate состояния)
  const isIndeterminate = useMemo(() => {
    if (!data || data.length === 0) return false;
    const selectedCount = allRowKeys.filter((key) => selectedRowKeys.includes(key)).length;
    return selectedCount > 0 && selectedCount < allRowKeys.length;
  }, [allRowKeys, selectedRowKeys, data]);

  // Переключение выбора всех строк
  const toggleAllRowsSelection = useCallback(() => {
    const newKeys = isAllRowsSelected ? [] : allRowKeys;
    setSelectedRowKeys(newKeys);
    rowSelection?.onChange?.(newKeys);
  }, [isAllRowsSelected, allRowKeys, rowSelection]);

  return {
    selectedRowKeys,
    isRowSelected,
    toggleRowSelection,
    isAllRowsSelected,
    isIndeterminate,
    toggleAllRowsSelection,
  };
};
