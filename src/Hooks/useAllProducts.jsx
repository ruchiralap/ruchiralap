import { useQuery } from "@tanstack/react-query";
import PrivateAxios from "./PrivateAxios";

const useAllProducts = () => {
  const { data: allProducts = [], refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await PrivateAxios.get("/products");
      return res.data;
    },
  });

  return [allProducts, refetch];
};

export default useAllProducts;
