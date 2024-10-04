import Pusher from "pusher";
import WebSocket from "ws";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  secret: process.env.PUSHER_SECRET as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  useTLS: true,
});

const ws = new WebSocket("wss://ws.kraken.com");

ws.on("open", () => {
  console.log("Connected to Kraken WebSocket");
  const subscriptionMessage = {
    event: "subscribe",
    pair: ["BTC/USDT", "ETH/USDT"],
    subscription: { name: "ticker" },
  };
  ws.send(JSON.stringify(subscriptionMessage));
});

ws.on("message", async (data: WebSocket.Data) => {
  const parsed = JSON.parse(data.toString());
  console.log("Received data from Kraken:", parsed);
  if (Array.isArray(parsed) && parsed[2] === "ticker") {
    const [, tickerInfo, , pair] = parsed;
    console.log("Forwarding to Pusher:", { pair, tickerInfo });
    await pusher.trigger("kraken-ticker-channel", "ticker-event", {
      pair,
      tickerInfo,
    });
  }
});

ws.on("error", (error: string) => {
  console.error("WebSocket error:", error);
});

export default ws;
