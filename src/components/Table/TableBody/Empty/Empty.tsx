import React from "react";
import { table } from "../../utils/cn";
import { useTableContext } from "../../TableContext";

export const Empty: React.FC = () => {
  const { columns } = useTableContext();

  return (
    <tr className={table("row", { empty: true })}>
      <td className={table("cell")} colSpan={columns?.length || 1}>
        No data
      </td>
    </tr>
  );
};
