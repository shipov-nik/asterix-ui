import { createContext } from "react";
import { DefaultRecordType, TableContextType } from "../types";

export const TableContext = createContext<TableContextType<DefaultRecordType> | null>(null);
