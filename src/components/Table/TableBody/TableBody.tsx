import React, { useMemo } from "react";
import { useTableContext } from "../TableContext";
import { table } from "../utils/cn";
import { Empty } from "./Empty";
import { Row } from "./Row";

export const TableBody: React.FC = () => {
  const { sortedData, rowKey = "key" } = useTableContext();

  const rows = useMemo(() => {
    if (sortedData.length === 0) {
      return null;
    }

    return sortedData.map((row, index) => {
      const keyValue = typeof rowKey === "string" ? row[rowKey] : rowKey ? row[rowKey] : row.key;

      const uniqueKey =
        keyValue !== undefined && keyValue !== null ? String(keyValue) : `row-${index}`;

      return <Row row={row} rowIndex={index} key={uniqueKey} />;
    });
  }, [sortedData, rowKey]);

  return <tbody className={table("body")}>{rows || <Empty />}</tbody>;
};
