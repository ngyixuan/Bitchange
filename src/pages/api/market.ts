import type { NextApiResponse } from "next";
import axios from "axios";

export default async function handler(res: NextApiResponse) {
  try {
    const response = await axios.get(
      "https://api.kraken.com/0/public/Ticker?pair=BTCUSDT,ETHUSDT",
    );
    res.status(200).json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching data from Kraken API" });
  }
}
