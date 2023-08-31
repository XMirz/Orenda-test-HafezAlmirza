import CustomerForm from "components/CustomerForm";
import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import { useApi } from "utils/hooks";
import { ApiResponse, BreadCrumbItem, Customer } from "utils/types";
import customersApi from "service/customers";
import { toast } from "components/ui/use-toast";
import { useLocation, useMatch, useNavigate } from "react-router-dom";

type Props = {};

const breadCrumbs: BreadCrumbItem[] = [
  {
    title: "Main Menu",
    path: "/customers",
  },
  {
    title: "Update Customer",
    path: "/customers",
  },
];

export default function UpdateCustomersPage({}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState<Customer>();

  const getCustomer = useApi<ApiResponse<Customer>>(customersApi.getCustomer);
  const updateCustomer = useApi<ApiResponse<Customer>>(
    customersApi.updateCustomer
  );

  // Get the customer data
  useEffect(() => {
    if (location) {
      const id = location.pathname.split("/")[2];
      getCustomer.request(id);
    }
  }, []);

  useEffect(() => {
    if (getCustomer.data?.success) setCustomer(getCustomer.data.data);
    if ((getCustomer.data && !getCustomer.data?.success) || getCustomer.error) {
      toast({
        title: "Failed",
        description: "Customer data not found",
      });
      setTimeout(() => {
        navigate("/customers/new");
      }, 500);
    }
  }, [getCustomer.data, getCustomer.error, navigate]);

  // UpdateCustomer Effect
  useEffect(() => {
    if (updateCustomer.data?.success) {
      toast({
        title: "Success",
        description: "Customer updated",
      });
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
    if (
      (updateCustomer.data && !updateCustomer.data?.success) ||
      updateCustomer.error
    ) {
      toast({
        title: "Failed",
        description: "Failed to update customer",
      });
    }
  }, [
    updateCustomer.data,
    updateCustomer.data?.success,
    updateCustomer.error,
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
        {customer && (
          <CustomerForm
            defaultValues={customer}
            onSubmit={(customerData) => {
              updateCustomer.request({
                id: customer.id,
                ...customerData,
              });
            }}
          />
        )}
      </div>
    </Layout>
  );
}
