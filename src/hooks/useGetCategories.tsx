import { apiClient } from "@/api/ApiClient";
import { categoriesAtom } from "@/Store/CategoriesStore";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const useGetCategories = () => {
  const [, setCategories] = useAtom(categoriesAtom);

  const {
    data: categoriesFromServer,
    isFetched: isCategoriesFetched,
    isSuccess: isCategoriesSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => apiClient.GetCategories(),
  });

  useEffect(() => {
    setCategories(categoriesFromServer);
  }, [isCategoriesSuccess]);

  return {
    categoriesFromServer,
    isCategoriesFetched,
    isCategoriesSuccess,
  };
};
