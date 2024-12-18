import { apiClient } from "@/api/ApiClient";
import { useMutation } from "@tanstack/react-query";
import { TradeInType } from "@/Store/TradeInStore";

export const useAddTradeInRequest = () => {
  const {
    isPending: isTradeInPending,
    isSuccess: isTradeInSuccess,
    mutateAsync: mutateAsync,
  } = useMutation({
    mutationFn: async (name: TradeInType) => await apiClient.TradeIn(name),
  });

  return {
    mutateAsync,
    isTradeInPending,
    isTradeInSuccess,
  };
};