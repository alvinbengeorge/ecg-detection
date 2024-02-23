"use client";
import Image from "next/image";
import { Roboto } from "next/font/google";
import React, { useEffect, useState } from "react";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  let formData = new FormData();
  const [predictedValue, set] = useState<string>("");
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }
    const file = event.target.files[0];
    formData.append("file", file);
  }

  function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      body: formData,
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { prediction } = data;
        if (
          prediction ===
          "ECG Images of Myocardial Infarction Patients (240x12=2880)"
        ) {
          set("Myocardial Infarction");
        } else if (
          prediction ===
          "ECG Images of Patient that have abnormal heartbeat (233x12=2796)"
        ) {
          set("Abnormal Heartbeat");
        } else if (
          prediction ===
          "ECG Images of Patient that have History of MI (172x12=2064)"
        ) {
          set("Had MI");
        } else if (prediction === "Normal Person ECG Images (284x12=3408)") {
          set("Normal");
        }
      });
  }
  useEffect(() => {}, [predictedValue]);
  return (
    <main className={font.className}>
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
        <div className="grid grid-cols-1 gap-3">
          <input type="file" onChange={handleFileChange} />
          <button
            type="submit"
            className="bg-red-400 p-4 text-xl text-white"
            onClick={handleSubmit}
          >
            Predict
          </button>
        </div>
        <div>
          <div id="prediction">{predictedValue}</div>
        </div>
      </section>
      {/* <section id="data" className="grid place-items-center w-screen h-screen bg-red-400">
        <div>h</div>
      </section> */}
    </main>
  );
}
