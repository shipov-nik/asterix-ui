import { useContext } from "react";
import { DefaultRecordType, TableContextType } from "../types";
import { TableContext } from "./TableContext";

export const useTableContext = <
  RecordType extends DefaultRecordType,
>(): TableContextType<RecordType> => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context as TableContextType<RecordType>;
};
