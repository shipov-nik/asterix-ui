import { type FC } from "react";
import { useTableContext } from "../context";

export const ColGroup: FC = () => {
  const { columns, rowSelection } = useTableContext();

  if (!columns || columns.length === 0) {
    return null;
  }

  return (
    <colgroup>
      {rowSelection && <col style={{ width: "40px" }} />}
      {columns.map(({ width, key }) => (
        <col key={key} style={width ? { width } : undefined} />
      ))}
    </colgroup>
  );
};
