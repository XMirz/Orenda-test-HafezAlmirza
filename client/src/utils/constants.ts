import { ColumnDef } from "@tanstack/react-table";
import { Customer, FilterItem } from "./types";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Customer Name",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];

export const customerFilterItems: FilterItem[] = [
  {
    placeholder: "Search name",
    columnName: "name",
  },
  {
    placeholder: "Phone",
    columnName: "phone",
  },
];
