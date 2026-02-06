import { type FC } from "react";
import { useTableContext } from "../context";
import { table } from "../utils";
import { SortIndicator } from "./SortIndicator";
import { Checkbox } from "../../Checkbox";

export const TableHead: FC = () => {
  const {
    columns,
    sorting,
    handleChangeSorting,
    rowSelection,
    isAllRowsSelected,
    isIndeterminate,
    toggleAllRowsSelection,
  } = useTableContext();

  return (
    <thead className={table("head")}>
      <tr className={table("row")}>
        {rowSelection && (
          <th className={table("cell", { align: "center" })}>
            <div className={table("checkbox")}>
              <Checkbox
                checked={isAllRowsSelected || false}
                indeterminate={isIndeterminate}
                onChange={toggleAllRowsSelection}
              />
            </div>
          </th>
        )}
        {columns?.map((column) => {
          const { align, title, sorter, key } = column;
          return (
            <th className={table("cell", { align })} key={key}>
              {sorter ? (
                <div
                  className={table("sort", {
                    active: key === sorting.key,
                  })}
                  onClick={() => handleChangeSorting(key)}
                >
                  {title}
                  <SortIndicator columnKey={key} />
                </div>
              ) : (
                title
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
