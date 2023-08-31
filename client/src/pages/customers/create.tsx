import CustomerForm from "components/CustomerForm";
import Layout from "components/Layout";
import React, { useEffect } from "react";
import { useApi } from "utils/hooks";
import { ApiResponse, BreadCrumbItem, Customer } from "utils/types";
import customersApi from "service/api/customers";
import { toast } from "components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type Props = {};

const breadCrumbs: BreadCrumbItem[] = [
  {
    title: "Main Menu",
    path: "/customers",
  },
  {
    title: "Create New Customers",
    path: "/customers/new",
  },
];

export default function CreateCustomersPage({}: Props) {
  const navigate = useNavigate();
  const createCustomer = useApi<ApiResponse<Customer>>(
    customersApi.createCustomer
  );

  useEffect(() => {
    if (createCustomer.data?.success) {
      toast({
        title: "Success",
        description: "New Customer Created",
      });
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
    if (
      (createCustomer.data && !createCustomer.data?.success) ||
      createCustomer.error
    ) {
      toast({
        title: "Failed",
        description: "Failed to create customer",
      });
    }
  }, [
    createCustomer.data,
    createCustomer.data?.success,
    createCustomer.error,
    navigate,
  ]);

  return (
    <Layout title="Customers Page" breadCrumbs={breadCrumbs}>
      <div className="rounded-lg px-6 py-6 w-full bg-white shadow-sm border border-black/10 space-y-4">
        <div className="flex flex-row justify-between items-center">
          <p className="font-poppins text-sm font-semibold">
            Customer Information
          </p>
        </div>
        {/* Form */}
        <CustomerForm
          onSubmit={(customerData) => {
            createCustomer.request(customerData);
          }}
        />
      </div>
    </Layout>
  );
}
