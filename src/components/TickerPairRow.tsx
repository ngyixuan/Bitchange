interface TickerPairRowProps {
  pair: string;
  bid: string;
  ask: string;
}

const TickerPairRow: React.FC<TickerPairRowProps> = ({ pair, bid, ask }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="absolute -inset-[2px] rounded-lg bg-gradient-to-r from-[#85FFC4] to-[#BC85FF] opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative px-7 py-6 ring-1 ring-gray-900/5  leading-none items-top  space-x-6 p-8 bg-[#1C1924] flex rounded-lg justify-between text-white ">
        <div className="font-bold text-lg">{pair}</div>
        <div className="flex gap-3 text-lg ">
          <div className="">Bid: {bid}</div>
          <div>Ask: {ask}</div>
        </div>
      </div>
    </div>
  );
};
export default TickerPairRow;
