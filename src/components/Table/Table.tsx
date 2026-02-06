import { TableProvider } from "./context";
import { ColGroup, TableHead, TableBody } from "./components";
import { DefaultRecordType, TableProps } from "./types";
import { tableWrapper, table } from "./utils/cn";
import "./Table.scss";

export const Table = <RecordType extends DefaultRecordType>(props: TableProps<RecordType>) => {
  const { className, data, columns, rowKey = "key", rowSelection, ...attrs } = props;

  return (
    <TableProvider data={data} columns={columns} rowKey={rowKey} rowSelection={rowSelection}>
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
