import { useQuery } from "@tanstack/react-query";
import PrivateAxios from "./PrivateAxios";

const useCategory = () => {
  const {
    data: allCategory = [],
    refetch,
    isPending: loading,
  } = useQuery({
    queryKey: ["allCategory"],
    queryFn: async () => {
      const res = await PrivateAxios.get("/categories");
      return res.data;
    },
  });

  return [allCategory, refetch, loading];
};

export default useCategory;
