import { type ReactNode, type TableHTMLAttributes } from "react";

export type DefaultRecordType = Record<string, unknown>;

export type AlignType = "left" | "center" | "right";

export type CompareFn<RecordType> = (a: RecordType, b: RecordType) => number;

export type ColumnType<RecordType> = {
  /** Идентификатор колонки */
  key: string;
  /** Заголовок колонки */
  title: string;
  /** Выравнивание содержимого колонки */
  align?: AlignType;
  /** Сортировка колонки (может быть boolean или function) */
  sorter?: boolean | CompareFn<RecordType>;
  /** Ширина колонки */
  width?: number | string;
  /** Определяет визуализацию ячейки таблицы */
  render?: (value: RecordType[keyof RecordType], record: RecordType, index: number) => ReactNode;
};

export type ColumnsType<RecordType> = ColumnType<RecordType>[];

export type RowSelection = {
  /** Ключи выбранных строк по умолчанию */
  selectedRowKeys?: Array<string | number>;
  /** Колбэк функция, выполняющаяся при выборе строк */
  onChange?: (selectedRowKeys: Array<string | number>) => void;
};

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

export type SortState = {
  key: string | null;
  direction: SortDirection | null;
};

// --- Props ---

export type TableBaseProps<RecordType> = {
  /** Источник данных */
  data?: RecordType[];
  /** Колонки таблицы */
  columns?: ColumnsType<RecordType>;
  /** Уникальный ключ строки (по умолчанию "key") */
  rowKey?: string | keyof RecordType;
  /** Опции при выборе строки с помощью чекбокса */
  rowSelection?: RowSelection;
};

export type TableProps<RecordType> = TableHTMLAttributes<HTMLTableElement> &
  TableBaseProps<RecordType>;

export type TableProviderProps<RecordType> = TableBaseProps<RecordType> & {
  children: ReactNode;
};

export type TableContextType<RecordType> = TableBaseProps<RecordType> & {
  sorting: SortState;
  sortedData: RecordType[];
  handleChangeSorting: (key: string) => void;

  selectedRowKeys?: Array<string | number>;
  isRowSelected?: (row: RecordType, index: number) => boolean;
  toggleRowSelection?: (row: RecordType, index: number) => void;
  isAllRowsSelected?: boolean;
  isIndeterminate?: boolean;
  toggleAllRowsSelection?: () => void;
};
