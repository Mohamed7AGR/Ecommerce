import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  const getCategories = async () => {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  };

  const res = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5000 * 1000,
  });

  return res;
}