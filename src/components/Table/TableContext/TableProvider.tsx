import { useMemo } from "react";
import { DefaultRecordType, TableProviderProps, TableContextType } from "../types";
import { TableContext } from "./TableContext";
import { useTableSorting, useRowSelection } from "../hooks";

export const TableProvider = <RecordType extends DefaultRecordType>(
  props: TableProviderProps<RecordType>,
) => {
  const { children, data, columns, rowKey, rowSelection } = props;

  const { sorting, sortedData, handleChangeSorting } = useTableSorting({ data, columns });

  const {
    selectedRowKeys,
    isRowSelected,
    toggleRowSelection,
    isAllRowsSelected,
    isIndeterminate,
    toggleAllRowsSelection,
  } = useRowSelection({ data, rowKey, rowSelection });

  const contextValue = useMemo<TableContextType<RecordType>>(
    () => ({
      data,
      columns,
      rowKey,
      rowSelection,

      sorting,
      sortedData,
      handleChangeSorting,

      selectedRowKeys,
      isRowSelected,
      toggleRowSelection,
      isAllRowsSelected,
      isIndeterminate,
      toggleAllRowsSelection,
    }),
    [
      data,
      columns,
      rowKey,
      rowSelection,
      sorting,
      sortedData,
      handleChangeSorting,
      selectedRowKeys,
      isRowSelected,
      toggleRowSelection,
      isAllRowsSelected,
      isIndeterminate,
      toggleAllRowsSelection,
    ],
  );

  return (
    <TableContext.Provider value={contextValue as unknown as TableContextType<DefaultRecordType>}>
      {children}
    </TableContext.Provider>
  );
};
