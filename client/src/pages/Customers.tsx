import { DataTable } from "components/DataTable";
import { customerColumns, customerFilterItems } from "utils/constants";
import { ApiResponse, Customer, RowAction } from "utils/types";
import React, { useEffect } from "react";
import customersApi from "service/customers";
import { useApi } from "utils/hooks";
import { useToast } from "components/ui/use-toast";

type Props = {};

function CustomersPage({}: Props) {
  const { toast } = useToast();

  const getAllCustomers = useApi<ApiResponse<Customer[]>>(
    customersApi.getAllCustomers
  );
  const deleteCustomers = useApi<ApiResponse<Customer>>(
    customersApi.deleteCustomer
  );

  useEffect(() => {
    getAllCustomers.request();
  }, []);

  useEffect(() => {
    if (deleteCustomers.data?.success) {
      toast({
        title: "Success",
        description: `${deleteCustomers.data.data.name} deleted.`,
      });
    }
  }, [deleteCustomers.data?.data.name, deleteCustomers.data?.success, toast]);

  const rowActions: RowAction<Customer>[] = [
    {
      label: "Edit",
      action: (data) => {},
    },
    {
      label: "Delete",
      action: (data) => {
        deleteCustomers.request(data.id);
      },
    },
  ];

  return (
    <div className="bg-gray-50 px-4 py-4 w-full  space-y-4">
      <div className="font-poppins ">
        <h1 className="font-semibold text-lg">Customers Page</h1>
        <div className=" font-light">
          <p>Main</p>
        </div>
      </div>
      {/* Content */}
      <div className="rounded-lg px-6 py-6 w-full bg-white shadow-sm border border-black/10 space-y-4">
        <div className="flex flex-row">
          <p className="font-poppins text-sm font-semibold">All Customer</p>
        </div>
        <div className="">
          {typeof getAllCustomers.data !== "undefined" && (
            <DataTable
              columns={customerColumns}
              data={getAllCustomers.data.data}
              filterItems={customerFilterItems}
              rowActions={rowActions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;
