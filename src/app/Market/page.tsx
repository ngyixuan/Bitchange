"use client";
import React from "react";
import AssetRow from "@/components/AssetRow";
// import useKrakenWebSocket from "@/hooks/useKrakenWebSocket";
import usePriceFetcher from "@/hooks/useFetchTickerPrice";
import CountdownCircle from "@/components/CountdownCircle";
function Page() {
  const { prices, countdown } = usePriceFetcher();
  // const { tickerData } = useKrakenWebSocket(); // Use the WebSocket hook

  return (
    <div className="p-4">
      {!prices && <div className="text-white">Loading...</div>}

      {prices && (
        <div>
          <div className="mb-4 py-8 flex justify-between items-center">
            <div className="font-20 font-bold text-white text-4xl">
              Market Stats
            </div>
            <div className="flex row gap-4">
              <div className="text-white">Update in {countdown}</div>
              <CountdownCircle countdown={countdown} totalDuration={30} />
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-lg ">
            {prices &&
              Object.entries(prices.result).map(([pair, data]) => {
                const bid = parseFloat(data.b[0]).toFixed(2);
                const ask = parseFloat(data.a[0]).toFixed(2);
                return <AssetRow key={pair} pair={pair} bid={bid} ask={ask} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
}
export default Page;
