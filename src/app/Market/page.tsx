"use client";
import { useQuery } from "@tanstack/react-query";
import { GetTickerSchema } from "@/pages/api/types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AssetRow from "@/components/AssetRow";

function Page() {
  const fetchPrices = async (): Promise<GetTickerSchema> => {
    const { data } = await axios.get<GetTickerSchema>("/api/market");
    if (data.error.length > 0) {
      throw new Error(data.error[0]);
    }
    return data;
  };
  const {
    data: prices,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["prices"],
    queryFn: fetchPrices,
    refetchInterval: 30000000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { toastId: "loading" });
    }
    if (isError) {
      toast.dismiss("loading");
      toast.error(`Error: ${error.message}`);
    }
    if (!isLoading && !isError) {
      toast.dismiss("loading");
    }
  }, [isLoading, isError, error]); // Dependencies for useEffect

  const [countdown, setCountdown] = useState(30);
  const calculateOffset = () => {
    const circumference = 2 * Math.PI * 4;
    return circumference * (1 - countdown / 30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev == 0) {
          refetch();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [refetch]);

  return (
    <div className="p-4">
      {isLoading && <div className="text-white">Loading...</div>}

      {!isLoading && (
        <div>
          <div className="mb-4 py-8 flex justify-between items-center">
            <div className="font-20 font-bold text-white text-4xl">
              Market Stats{" "}
            </div>
            <div className="flex gap-4">
              <div className="text-white ">
                Next update in: {countdown} seconds
              </div>
              <svg width="20" height="20" viewBox="0 0 10 10">
                <circle
                  className="fill-transparent stroke-gray-500"
                  cx="5"
                  cy="5"
                  r="4"
                  strokeWidth="2"
                />
                <circle
                  className="fill-transparent stroke-white"
                  cx="5"
                  cy="5"
                  r="4"
                  strokeWidth="0.5"
                  strokeDasharray="25.132741228718345"
                  strokeDashoffset={calculateOffset()}
                  transform="rotate(-90 5 5)"
                />
              </svg>
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-lg ">
            {prices &&
              Object.entries(prices.result).map(([pair, data]) => {
                const bid = parseFloat(data.b[0]).toFixed(2);
                const ask = parseFloat(data.a[0]).toFixed(2);
                return (
                  <div key={pair} className=" ">
                    <AssetRow pair={pair} bid={bid} ask={ask} />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
export default Page;
