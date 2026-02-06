import { type FC, useMemo } from "react";
import { useTableContext } from "../context";
import { table } from "../utils";
import { SortDirection } from "../types";

export const SortIndicator: FC<{ columnKey: string }> = ({ columnKey }) => {
  const { sorting } = useTableContext();

  const indicator = useMemo(() => {
    if (columnKey !== sorting.key) return "⇅";
    if (sorting.direction === SortDirection.ASC) return "↑";
    if (sorting.direction === SortDirection.DESC) return "↓";
    return "⇅";
  }, [columnKey, sorting.key, sorting.direction]);

  return <span className={table("sort-indicator")}>{indicator}</span>;
};
