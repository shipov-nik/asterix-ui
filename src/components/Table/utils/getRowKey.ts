import { DefaultRecordType } from "../types";

/**
 * Извлекает уникальный ключ строки из записи.
 * Если значение по ключу отсутствует — возвращает fallback `row-${index}`.
 */
export const getRowKey = <RecordType extends DefaultRecordType>(
  row: RecordType,
  index: number,
  rowKey: string | keyof RecordType = "key",
): string => {
  const value = row[rowKey as string];
  return value != null ? String(value) : `row-${index}`;
};
