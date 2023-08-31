import apiClient from "../api";

const getAllCustomers = () => apiClient.get("/customers");

const deleteCustomer = (customerId: string) => {
  return apiClient.delete(`/customers/${customerId}`);
};

const customersApi = {
  getAllCustomers,
  deleteCustomer,
};
export default customersApi;
