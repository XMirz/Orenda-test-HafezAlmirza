import { AxiosResponse } from "axios";
import { useState } from "react";
import { ApiResponse } from "./types";

export const useApi = <T>(
  apiCall: (...args: any) => Promise<AxiosResponse<any, any>>
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    try {
      const result = await apiCall(...args);
      setData(result.data);
    } catch (err) {
      setError((err as Error).message || "Unexpected Error!");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};
