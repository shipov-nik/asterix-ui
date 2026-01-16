import React, { useMemo } from "react";
import { table } from "../../utils/cn";
import { useTableContext } from "../../TableContext";
import { SortDirection } from "../../types";

export const SortIndicator: React.FC<{ columnKey: string }> = ({ columnKey }) => {
  const { sorting } = useTableContext();

  const indicator = useMemo(() => {
    if (columnKey !== sorting.key) return "⇅";
    if (sorting.direction === SortDirection.ASC) return "↑";
    if (sorting.direction === SortDirection.DESC) return "↓";
    return "⇅";
  }, [columnKey, sorting.key, sorting.direction]);

  return <span className={table("sort-indicator")}>{indicator}</span>;
};
