import { apiClient } from "@/api/ApiClient";
import { brandsAtom } from "@/Store/BrandsStore";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useGetBrands = () => {
  const [brands, setBrands] = useAtom(brandsAtom);

  const {
    data: brandsFromServer,
    isFetched: isBrandsFetched,
    isSuccess: isBrandsSuccess,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await apiClient.GetBrands(),
  });

  useEffect(() => {
    setBrands(brandsFromServer);
  }, [isBrandsSuccess]);

  return {
    isBrandsSuccess,
    isBrandsFetched,
    brandsFromServer,
  };
};
