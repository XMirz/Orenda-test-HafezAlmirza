import { ArrowRight, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { BreadCrumbItem } from "utils/types";

type Props = {
  title: string;
  breadCrumbs: BreadCrumbItem[];
  children: React.JSX.Element;
};

export default function Layout({ children, title, breadCrumbs }: Props) {
  return (
    <div className=" px-4 py-4 w-full  space-y-4">
      <div className="font-poppins ">
        <h1 className="font-semibold text-lg">{title}</h1>
        {/* BreadCrumbs */}
        <div className="  flex flex-row items-center text-gray-700">
          {breadCrumbs.map((item, index) => (
            <div key={index} className="contents">
              {index > 0 && <ChevronRight className="h-5 w-5 " />}
              {(index !== breadCrumbs.length - 1 && (
                <Link to={item.path} className="text-red-600">
                  {item.title}
                </Link>
              )) || <span>{item.title}</span>}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
