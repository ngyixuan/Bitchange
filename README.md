## What is Bitchange?

This is a client-side platform built with React and Next.js that provides low-latency cryptocurrency price updates for BTC/USD and ETH/USD pairs.

## Technology Stack

- **Next.js**: Server-side rendering and API integration for fetching and updating data.
- **TailwindCss**: For quick and efficient styling.
- **Axios**: Perform HTTP requests to the Kraken public API.
- **Tanstack Query**: For state management and caching of API data.
- **Websocket (Backup Method)**: Used for real-time data fetching from the Kraken API.

## Key Feature:

- **Low-latency Price Ticker Dashboard**: Displays real-time updates for BTC/USD and ETH/USD.
- **Price Data Chart (coming soon)**: Visualize price trends over various timeframes (eg: 1 hour, 1 day, 1 week) .
- **Multiple pair support (coming soon)**: Expand the platform to add more cryptocurrency pairs.
- **Swap function (coming soon)**: Enables users to exchange cryptocurrencies based on live rates.

## Installation

Clone the Bitchange repository and install dependencies:

```
git clone https://github.com/ngyixuan/Bitchange.git
cd Bitchange
npm install
```

## Running the Application

### To view the site, go to:

```bash
bitchange.vercel.app
```

### To start the local development server, run:

```bash
npm run dev
```
