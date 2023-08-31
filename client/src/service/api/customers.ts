import { Customer } from "utils/types";
import apiClient from ".";

const createCustomer = (customer: Customer) => {
  return apiClient.post("/customers", customer);
};

const getAllCustomers = () => apiClient.get("/customers/full");

const getCustomer = (customerId: string) =>
  apiClient.get(`/customers/${customerId}`);

const updateCustomer = (customer: Customer) =>
  apiClient.patch(`/customers/${customer.id}`, customer);

const deleteCustomer = (customerId: string) => {
  return apiClient.delete(`/customers/${customerId}`);
};

const customersApi = {
  createCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
export default customersApi;
