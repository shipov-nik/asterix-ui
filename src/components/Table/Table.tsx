import { TableProvider } from "./TableContext";
import { ColGroup } from "./ColGroup";
import { TableHead } from "./TableHead";
import { TableBody } from "./TableBody";
import { DefaultRecordType, TableProps } from "./types";
import { tableWrapper, table } from "./utils/cn";
import "./Table.scss";

export const Table = <RecordType extends DefaultRecordType>(props: TableProps<RecordType>) => {
  const { className, data, columns, rowKey = "key", rowSelection, ...attrs } = props;

  const providerProps = {
    className,
    data,
    columns,
    rowKey,
    rowSelection,
  };

  return (
    <TableProvider {...providerProps}>
      <div className={tableWrapper()}>
        <table className={table({}, className)} {...attrs}>
          <ColGroup />
          <TableHead />
          <TableBody />
        </table>
      </div>
    </TableProvider>
  );
};
