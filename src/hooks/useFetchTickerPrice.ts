import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GetTickerSchema } from "@/pages/api/types";

const fetchPrices = async (): Promise<GetTickerSchema> => {
  const { data } = await axios.get<GetTickerSchema>("/api/market");
  if (data.error.length > 0) {
    throw new Error(data.error[0]);
  }
  return data;
};

const usePriceFetcher = () => {
  const {
    data: prices,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    refetchInterval: false, // Disable automatic refetching
  });

  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) {
          refetch(); // Call refetch when countdown reaches 0
          return 30; // Reset countdown
        }
        return prev - 1;
      });
    }, 1000); // Update countdown every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [refetch]);

  return { prices, isLoading, isError, error, countdown };
};

export default usePriceFetcher;
