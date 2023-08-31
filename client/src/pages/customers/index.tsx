import { DataTable } from "components/DataTable";
import { customerColumns, customerFilterItems } from "utils/constants";
import { ApiResponse, Customer, RowAction } from "utils/types";
import React, { useEffect } from "react";
import customersApi from "service/customers";
import { useApi } from "utils/hooks";
import { useToast } from "components/ui/use-toast";
import { Button } from "components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout";

type Props = {};

const breadCrumbs = [
  {
    title: "Main Menu",
    path: "/customers",
  },
];

function IndexCustomersPage({}: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();

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
      action: (data) => {
        navigate(`/customers/${data.id}`);
      },
    },
    {
      label: "Delete",
      action: (data) => {
        deleteCustomers.request(data.id);
      },
    },
  ];

  return (
    <Layout title="Customer Page" breadCrumbs={breadCrumbs}>
      {/* Content */}
      <div className="rounded-lg px-6 py-6 w-full bg-white shadow-sm border border-black/10 space-y-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-poppins text-sm font-semibold">All Customer</p>
          <Button
            variant={"destructive"}
            className="bg-red-700"
            onClick={() => {
              navigate("/customers/new");
            }}
          >
            <Plus /> <span className="ml-2">Add New Customer</span>
          </Button>
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
    </Layout>
  );
}

export default IndexCustomersPage;
