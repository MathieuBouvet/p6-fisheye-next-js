import useSWR, { Fetcher } from "swr";
import apiClient from "@lib/apiClient";

function getFetcher<T>() {
  const fetcher: Fetcher<T, string> = async key => apiClient.get<T>(key);
  return fetcher;
}

export default getFetcher;
