import React from "react";
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type RowAction<T> = {
  label: string;
  action: (item: T) => void;
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  unit: number;
};

export type NavItem = {
  path: string;
  name: string;
  icon: React.JSX.Element;
};

export type FilterItem = {
  placeholder: string;
  columnName: string;
};
