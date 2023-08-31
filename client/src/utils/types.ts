import React from "react";
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  pagination?: Pagination;
  data: T;
};

export type Pagination = {
  size: number;
  page: number;
  totalPage: number;
  total: number;
};

export type RowAction<T> = {
  label: string;
  action: (item: T) => void;
};

export type CustomerForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
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

export type BreadCrumbItem = {
  path: string;
  title: string;
};
