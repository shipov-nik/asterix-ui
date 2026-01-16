import { FC } from "react";
import { useTableContext } from "../../TableContext";
import { DefaultRecordType } from "../../types";
import { table } from "../../utils/cn";
import { Checkbox } from "../../../Checkbox";

type RowProps = {
  row: DefaultRecordType;
  rowIndex: number;
};

export const Row: FC<RowProps> = (props) => {
  const { row, rowIndex } = props;
  const { columns, rowSelection, isRowSelected, toggleRowSelection } = useTableContext();

  const selected = isRowSelected ? isRowSelected(row, rowIndex) : false;

  return (
    <tr className={table("row")}>
      {rowSelection && (
        <td className={table("cell", { align: "center" })}>
          <div className={table("checkbox")}>
            <Checkbox checked={selected} onChange={() => toggleRowSelection?.(row, rowIndex)} />
          </div>
        </td>
      )}
      {columns?.map((column) => {
        const { align, key, render } = column;
        return (
          <td className={table("cell", { align })} key={key}>
            {render ? render(row[key], row, rowIndex) : (row[key] as React.ReactNode)}
          </td>
        );
      })}
    </tr>
  );
};
