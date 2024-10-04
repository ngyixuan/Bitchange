import type { NextApiResponse } from "next";
import api from ".";

// Method 1: use REST
export default async function handler(res: NextApiResponse) {
  try {
    const response = await api.get("/Ticker?pair=BTCUSD,ETHUSD");
    res.status(200).json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching data from Kraken API" });
  }
}
