import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Method 1: use REST
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get(
      "https://api.kraken.com/0/public/Ticker?pair=BTCUSD,ETHUSD",
    );

    res.status(200).json(response.data);
  } catch {
    res.status(500).json({ error: "Error fetching data from Kraken API" });
  }
}
