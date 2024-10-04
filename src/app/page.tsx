import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen w-full flex gap-7 flex-col justify-center items-center text-white  font-bold">
      <div className="text-5xl"> Welcome to Bitchange</div>

      <Link
        className="bg-gradient-to-r from-[#85FFC4] via-[#5CC6FF] to-[#BC85FF] py-4 px-8 text-white text-2xl font-bold  rounded-full hover:from-[#85FFC4] hover:to-[#5CC6FF] transition duration-300 ease-in-out"
        href="/Market"
      >
        Explore market
      </Link>
    </div>
  );
}
