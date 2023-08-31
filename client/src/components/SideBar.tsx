import { Box, Home, Users } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../utils/types";

type Props = {
  showSidebar: boolean;
};

const navItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: <Home />,
  },
  {
    path: "/product",
    name: "Products",
    icon: <Box />,
  },
  {
    path: "/customers",
    name: "Customers",
    icon: <Users />,
  },
];

type ItemProps = {
  item: NavItem;
  isSelected: boolean;
};

export function Item({ item, isSelected }: ItemProps) {
  return (
    <Link
      className={`px-4 py-2 flex flex-row  items-center rounded-lg hover:text-white  ${
        isSelected ? "bg-white/30 text-white" : "text-gray-200"
      }`}
      to={item.path}
    >
      <div className="h-10 w-10 flex justify-center items-center">
        {item.icon}
      </div>
      <div className="w-0 hidden group-hover:flex group-hover:w-max duration-300  ">
        <p className="flex-1 font-poppins text-md ">{item.name}</p>
      </div>
    </Link>
  );
}

export default function SideBar({ showSidebar }: Props) {
  const location = useLocation();
  return (
    <div className="font-poppins border-r shadow-md bg-red-700 sticky  group w-20 hover:w-64 transition-all">
      <div className="py-4 px-2 space-y-2 ">
        {navItems.map((item) => (
          <Item
            key={item.path}
            item={item}
            isSelected={location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
}
