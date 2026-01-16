import React from "react";
import { useTableContext } from "../TableContext";

export const ColGroup: React.FC = () => {
  const { columns, rowSelection } = useTableContext();

  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <colgroup>
      {rowSelection && <col style={{ width: "40px" }} />}
      {columns.map((column) => {
        const { width, key } = column;
        return <col key={key} style={width ? { width } : undefined} />;
      })}
    </colgroup>
  );
};
