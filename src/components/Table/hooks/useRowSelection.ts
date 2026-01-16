import { useCallback, useEffect, useMemo, useState } from "react";
import { DefaultRecordType, RowSelection } from "../types";

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

  // Получение ключа строки
  const getRowKey = useCallback(
    (row: RecordType, index: number): string | number => {
      if (typeof rowKey === "string") {
        const keyValue = row[rowKey];
        return keyValue !== undefined && keyValue !== null ? String(keyValue) : `row-${index}`;
      }
      if (rowKey) {
        const keyValue = row[rowKey];
        return keyValue !== undefined && keyValue !== null ? String(keyValue) : `row-${index}`;
      }
      return row.key !== undefined && row.key !== null ? String(row.key) : `row-${index}`;
    },
    [rowKey],
  );

  // Проверка, выбрана ли строка
  const isRowSelected = useCallback(
    (row: RecordType, index: number): boolean => {
      const key = getRowKey(row, index);
      return selectedRowKeys.includes(key);
    },
    [selectedRowKeys, getRowKey],
  );

  // Переключение выбора строки
  const toggleRowSelection = useCallback(
    (row: RecordType, index: number) => {
      const key = getRowKey(row, index);
      setSelectedRowKeys((prev) => {
        const newKeys = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];

        // Вызываем коллбэк onChange
        rowSelection?.onChange?.(newKeys);

        return newKeys;
      });
    },
    [getRowKey, rowSelection],
  );

  // Получение всех ключей строк
  const getAllRowKeys = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => getRowKey(row, index));
  }, [data, getRowKey]);

  // Проверка, выбраны ли все строки
  const isAllRowsSelected = useMemo(() => {
    if (!data || data.length === 0) return false;
    return getAllRowKeys.length > 0 && getAllRowKeys.every((key) => selectedRowKeys.includes(key));
  }, [getAllRowKeys, selectedRowKeys, data]);

  // Проверка, выбрана ли хотя бы одна строка (для indeterminate состояния)
  const isIndeterminate = useMemo(() => {
    if (!data || data.length === 0) return false;
    const selectedCount = getAllRowKeys.filter((key) => selectedRowKeys.includes(key)).length;
    return selectedCount > 0 && selectedCount < getAllRowKeys.length;
  }, [getAllRowKeys, selectedRowKeys, data]);

  // Переключение выбора всех строк
  const toggleAllRowsSelection = useCallback(() => {
    const newKeys = isAllRowsSelected ? [] : getAllRowKeys;

    setSelectedRowKeys(newKeys);

    // Вызываем коллбэк onChange
    rowSelection?.onChange?.(newKeys);
  }, [isAllRowsSelected, getAllRowKeys, rowSelection]);

  return {
    selectedRowKeys,
    isRowSelected,
    toggleRowSelection,
    isAllRowsSelected,
    isIndeterminate,
    toggleAllRowsSelection,
  };
};
