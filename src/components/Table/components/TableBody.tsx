import { type FC, useMemo } from "react";
import { useTableContext } from "../context";
import { table, getRowKey } from "../utils";
import { Empty } from "./Empty";
import { Row } from "./Row";

export const TableBody: FC = () => {
  const { sortedData, rowKey = "key" } = useTableContext();

  const rows = useMemo(() => {
    if (sortedData.length === 0) return null;

    return sortedData.map((row, index) => {
      const key = getRowKey(row, index, rowKey);
      return <Row row={row} rowIndex={index} key={key} />;
    });
  }, [sortedData, rowKey]);

  return <tbody className={table("body")}>{rows ?? <Empty />}</tbody>;
};
