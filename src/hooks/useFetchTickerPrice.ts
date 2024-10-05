import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetTickerSchema } from "@/pages/api/types";
const timer = 10;
const fetchTickerPrices = async (): Promise<GetTickerSchema> => {
  const { data } = await axios.get<GetTickerSchema>("/api/market");
  if (data.error.length > 0) {
    throw new Error(data.error[0]);
  }
  return data;
};

const usePriceFetcher = () => {
  const {
    data: tickerData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tickerData"],
    queryFn: fetchTickerPrices,
    refetchInterval: false,
  });

  const [countdown, setCountdown] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          refetch();
          return timer;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  return { tickerData, isLoading, isError, error, countdown };
};

export default usePriceFetcher;
