import { apiClient } from "@/api/ApiClient";
import { searchedItemsAtom } from "@/Store/SearchedItemsStore";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";

export const useGetSearchItems = () => {
  const [, setSearchedItemsFromStore] = useAtom(searchedItemsAtom);

  const {
    data: searchedItems,
    isPending: isSearchedItemsPending,
    isSuccess: isSearchedItemsSuccess,
    mutateAsync: mutateSearchedItems,
  } = useMutation({
    mutationFn: async (tag: string) => apiClient.GetSearchItems(tag),
    onSuccess: (data) => {
      setSearchedItemsFromStore(data);
    },
  });

  return {
    searchedItems,
    isSearchedItemsPending,
    isSearchedItemsSuccess,
    mutateSearchedItems,
  };
};
