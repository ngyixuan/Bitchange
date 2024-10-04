import { useEffect, useState, useCallback } from "react";
import { GetTickerPairData, GetTickerSchema } from "@/pages/api/types";

const initialState: GetTickerSchema = {
  error: [],
  result: {},
};

const useKrakenWebSocket = () => {
  const [tickerData, setTickerData] = useState<GetTickerSchema>(initialState);

  const connectWebSocket = useCallback(() => {
    const socket = new WebSocket("wss://ws.kraken.com");

    socket.onopen = () => {
      console.log("WebSocket connection established");
      const subscriptionMessage = {
        event: "subscribe",
        pair: ["BTC/USDT", "ETH/USDT"],
        subscription: { name: "ticker" },
      };
      socket.send(JSON.stringify(subscriptionMessage));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data) && data[2] === "ticker") {
        const [, tickerInfo, , pair] = data;
        setTickerData((prevData) => ({
          ...prevData,
          result: {
            ...prevData.result,
            [pair]: tickerInfo as GetTickerPairData,
          },
        }));
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(connectWebSocket, 5000);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setTimeout(connectWebSocket, 5000);
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const cleanup = connectWebSocket();
    return cleanup;
  }, [connectWebSocket]);

  return { tickerData };
};

export default useKrakenWebSocket;
