import { DataTable } from "components/DataTable";
import { customerColumns, customerFilterItems } from "utils/constants";
import {
  ApiResponse,
  Customer,
  Pagination as PaginationType,
  RowAction,
} from "utils/types";
import React, { useEffect } from "react";
import customersApi from "service/api/customers";
import { useApi } from "utils/hooks";
import { useToast } from "components/ui/use-toast";
import { Button } from "components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
        <div className="flex flex-col gap-y-6">
          {typeof getAllCustomers.data !== "undefined" && (
            <>
              <DataTable
                columns={customerColumns}
                data={getAllCustomers.data.data}
                filterItems={customerFilterItems}
                rowActions={rowActions}
                pagination={getAllCustomers.data.pagination!!}
              />
              {/* <Pagination pagination={getAllCustomers.data.pagination!!} /> */}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default IndexCustomersPage;

// type PaginationProps = {
//   pagination: PaginationType;
// };
// export function Pagination({ pagination }: PaginationProps) {
//   return (
//     <div className="flex justify-end">
//       <div className="flex flex-row gap-x-2">
//         {Array(pagination.totalPage)
//           .fill(0)
//           .map((a, i) => (
//             <Button variant={"outline"}>{`${i + 1}`}</Button>
//           ))}
//         <Button variant={"outline"}>
//           <ChevronLeft />
//         </Button>
//         <Button variant={"outline"}>
//           <ChevronRight />
//         </Button>
//       </div>
//     </div>
//   );
// }
