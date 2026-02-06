import { type FC, type ReactNode, memo } from "react";
import { useTableContext } from "../context";
import { table } from "../utils";
import { DefaultRecordType } from "../types";
import { Checkbox } from "../../Checkbox";

type RowProps = {
  row: DefaultRecordType;
  rowIndex: number;
};

export const Row: FC<RowProps> = memo(({ row, rowIndex }) => {
  const { columns, rowSelection, isRowSelected, toggleRowSelection } = useTableContext();

  const selected = isRowSelected?.(row, rowIndex) ?? false;

  return (
    <tr className={table("row", { selected })}>
      {rowSelection && (
        <td className={table("cell", { align: "center" })}>
          <div className={table("checkbox")}>
            <Checkbox checked={selected} onChange={() => toggleRowSelection?.(row, rowIndex)} />
          </div>
        </td>
      )}
      {columns?.map(({ align, key, render }) => (
        <td className={table("cell", { align })} key={key}>
          {render ? render(row[key], row, rowIndex) : (row[key] as ReactNode)}
        </td>
      ))}
    </tr>
  );
});

Row.displayName = "Row";
