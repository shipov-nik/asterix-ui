import { type FC } from "react";
import { useTableContext } from "../context";
import { table } from "../utils";

export const Empty: FC = () => {
  const { columns, rowSelection } = useTableContext();

  const colSpan = (columns?.length ?? 0) + (rowSelection ? 1 : 0) || 1;

  return (
    <tr className={table("row", { empty: true })}>
      <td className={table("cell")} colSpan={colSpan}>
        No data
      </td>
    </tr>
  );
};
