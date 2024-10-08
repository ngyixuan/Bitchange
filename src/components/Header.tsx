import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <div className="font-14 p-4 flex gap-4 items-center backdrop-blur-lg transition-colors duration-500  w-full min-h-10 text-white  ">
        <div className="mr-8 text-4xl font-bold">
          <Link
            href="/"
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#85FFC4] via-[#5CC6FF] to-[#BC85FF] font-18"
          >
            BitChange
          </Link>
        </div>
        <Link href="/Market" className="font-18 text-white">
          Market
        </Link>
      </div>
    </>
  );
};
