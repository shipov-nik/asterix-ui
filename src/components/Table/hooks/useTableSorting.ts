import { useCallback, useMemo, useState } from "react";
import { ColumnsType, DefaultRecordType, SortDirection, type SortState, CompareFn } from "../types";

type UseTableSortingProps<RecordType> = {
  data?: RecordType[];
  columns?: ColumnsType<RecordType>;
};

const defaultCompare = <RecordType extends DefaultRecordType>(
  a: RecordType,
  b: RecordType,
  key: string,
): number => {
  const aValue = a[key];
  const bValue = b[key];

  if (aValue === bValue) return 0;
  if (aValue == null) return 1;
  if (bValue == null) return -1;

  if (typeof aValue === "string" && typeof bValue === "string") {
    return aValue.localeCompare(bValue);
  }

  if (typeof aValue === "number" && typeof bValue === "number") {
    return aValue - bValue;
  }

  return String(aValue).localeCompare(String(bValue));
};

export const useTableSorting = <RecordType extends DefaultRecordType>(
  props: UseTableSortingProps<RecordType>,
) => {
  const { data, columns } = props;

  const [sorting, setSorting] = useState<SortState>({
    key: null,
    direction: null,
  });

  // Мемоизируем Map колонок для быстрого поиска O(1) вместо O(n)
  const columnsMap = useMemo(() => {
    if (!columns) return null;
    return new Map(columns.map((col) => [col.key, col]));
  }, [columns]);

  const sortedData = useMemo(() => {
    // Ранний выход если нет данных или сортировки
    if (!data || data.length === 0 || !sorting.key || !sorting.direction) {
      return data || [];
    }

    // Быстрый поиск колонки через Map
    const column = columnsMap?.get(sorting.key);
    if (!column || !column.sorter) {
      return data;
    }

    // Создаем копию только когда действительно нужно сортировать
    const sortedData = [...data];
    const sortMultiplier = sorting.direction === SortDirection.ASC ? 1 : -1;

    if (typeof column.sorter === "function") {
      const compareFn = column.sorter as CompareFn<RecordType>;
      sortedData.sort((a, b) => compareFn(a, b) * sortMultiplier);
    } else if (column.sorter === true) {
      sortedData.sort((a, b) => defaultCompare(a, b, sorting.key!) * sortMultiplier);
    }

    return sortedData;
  }, [data, columnsMap, sorting.key, sorting.direction]);

  const handleChangeSorting = useCallback((key: string) => {
    setSorting((prev) => {
      if (prev.key !== key) {
        return { key, direction: SortDirection.ASC };
      }

      if (prev.direction === SortDirection.ASC) {
        return { key, direction: SortDirection.DESC };
      }

      return { key: null, direction: null };
    });
  }, []);

  return { sorting, sortedData, handleChangeSorting };
};
