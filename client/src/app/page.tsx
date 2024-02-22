'use client';
import Image from "next/image";
import { Orbitron } from "next/font/google";

const font = Orbitron({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="">
      <section className="w-screen h-screen grid place-items-center bg-[url('/background.png')] bg-center p-4">
        <div className="grid grid-cols-1">
          <div className="rounded-xl">
            <Image
              src={"/logo.svg"}
              width={753}
              height={163}
              alt="logo"
              priority
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="border border-red-300 rounded-xl text-center text-2xl w-full h-32 shadow-sm grid place-items-center hover:shadow-xl transition duration-500 ease-in-out">
              <div>ECG analysis</div>
            </div>
            <div className="border border-red-300 rounded-xl text-center text-2xl w-full h-32 shadow-sm grid place-items-center hover:shadow-xl transition duration-500 ease-in-out">
              <div>ECG data</div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="analysis"
        className="grid place-items-center w-screen h-screen bg-red-300"
      >
        <div>h</div>
      </section>
      <section id="data" className="grid place-items-center w-screen h-screen bg-red-400">
        <div>h</div>
      </section>
    </main>
  );
}
