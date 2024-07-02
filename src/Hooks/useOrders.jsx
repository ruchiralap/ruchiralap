import { useQuery } from "@tanstack/react-query";
import PrivateAxios from "./PrivateAxios";
const useOrders = () => {
  const {
    data: allOrders = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await PrivateAxios.get("/orders");
      return res.data;
    },
  });

  return [allOrders, refetch, loading];
};

export default useOrders;
