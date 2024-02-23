"use client";
import Image from "next/image";
import { Roboto } from "next/font/google";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Link from "next/link";

const font = Roboto({ weight: "400", subsets: ["latin"] });

export default function Home() {
  let formData = new FormData();
  const [predictedValue, set] = useState<number>(0);
  const [age, setAge] = useState(0)
  const [sex, setSex] = useState(1)
  const [cp, setCp] = useState(0)
  const [trestbps, setTrestbps] = useState(0)
  const [chol, setChol] = useState(0)
  const [fbs, setFbs] = useState(0)
  const [restecg, setRestecg] = useState(0)
  const [thalach, setThalach] = useState(0)
  const [exang, setExang] = useState(0)
  const [oldpeak, setOldpeak] = useState<number>(0)
  const [slope, setSlope] = useState(0)
  const [ca, setCa] = useState(0)
  const [thal, setThal] = useState(0)
  const [target, setTarget] = useState(0)


  const handleAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(parseInt(event.target.value))
  }

  const handleSex = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSex(parseInt(event.target.value))
  }

  const handleCP = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCp(parseInt(event.target.value))
  }

  const handleCholestrol = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChol(parseInt(event.target.value))
  }

  const handleBP = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrestbps(parseInt(event.target.value))
  }

  const handleFBS = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFbs(parseInt(event.target.value))
  }

  const handleThalach = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThalach(parseInt(event.target.value))
  }

  const handleExang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExang(parseInt(event.target.value))
  }

  const handleOldPeak = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldpeak(parseInt(event.target.value))
  }

  const handleSlope = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSlope(parseInt(event.target.value))
  }

  const handleCA = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCa(parseInt(event.target.value))
  }

  const handleThal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setThal(parseInt(event.target.value))
  }


  function handleFileChange(file: string | Blob) {
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
          setRestecg(2);
        } else if (
          prediction ===
          "ECG Images of Patient that have abnormal heartbeat (233x12=2796)"
        ) {
          setRestecg(1);
        } else if (
          prediction ===
          "ECG Images of Patient that have History of MI (172x12=2064)"
        ) {
          setRestecg(1);
        } else if (prediction === "Normal Person ECG Images (284x12=3408)") {
          setRestecg(0);
        }
      });
      // USE restecg from this
      const out_data = [
        age,
        sex,
        cp,
        trestbps,
        chol,
        fbs,
        restecg,
        thalach,
        exang,
        oldpeak,
        slope,
        ca,
        thal
      ]
      console.log(JSON.stringify({"data": [44,1,1,120,263,0,1,173,0,0,2,0,3]}))
      fetch("http://127.0.0.1:8000/essential_parameters", {
        method: "POST",
        body: JSON.stringify({"data": out_data}),
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }).then((response) => response.json()).then((data) => {
        setTarget(data.prediction)
        console.log(data.prediction)
      })

  }
  useEffect(() => {}, [predictedValue, target]);
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
          <div className="grid grid-cols-1 gap-2 ">
            <Link href="#analysis">
              <div className="border border-red-300 rounded-xl text-center text-2xl w-full h-32 shadow-sm grid place-items-center hover:shadow-xl transition duration-500 ease-in-out">
                <div>ECG analysis</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="analysis"
        className="grid place-items-center place-content-center w-screen bg-red-300 grid-cols-31 gap-4 p-4"
      >
        <div className="grid grid-cols-1 gap-3 bg-red-200 shadow-2xl rounded-xl p-8 place-items-center w-full">
          <div className="p-2">
            <h1 className="text-center text-wrap p-2">
              Put the ECG image that you&apos;ve received here
            </h1>
            <FileUploader
              handleChange={handleFileChange}
              types={["JPG", "PNG"]}
            />
          </div>          
          {/*age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,tha*/}
          <div className="p-2 grid grid-cols-1 gap-3">
            <h1 className="text-center">Input your ECG values</h1>
            <input type="number" placeholder="age" className="w-full p-2 text-black" onChange={handleAge}/>
            <select className="w-full p-2 text-black" onChange={handleSex}>
              <option value={0}>Female</option>
              <option value={1}>Male</option>
            </select>
            <select className="w-full p-2 text-black" onChange={handleCP}>
              <option value={0}>Typical Angina</option>
              <option value={1}>Atypical Angina</option>
              <option value={2}>Non-anginal Pain</option>
              <option value={3}>Asymptomatic</option>
            </select>
            <input type="number" placeholder="trestbps" className="w-full p-2 text-black" onChange={handleBP}/>
            <input type="number" placeholder="cholestrol" className="w-full p-2 text-black" onChange={handleCholestrol}/>
            <input type="number" placeholder="fbs" className="w-full p-2 text-black" onChange={handleFBS}/>
            <input type="number" placeholder="thalach" className="w-full p-2 text-black" onChange={handleThalach}/> 
            <h1>Exercise induced angina</h1>
            <select className="w-full p-2 text-black" onChange={handleExang}>
              <option value={0}>No</option>
              <option value={1}>Yes</option>
            </select>
            <input type="number" placeholder="oldpeak" className="w-full p-2 text-black" onChange={handleOldPeak}/>
            <select className="w-full p-2 text-black" onChange={handleSlope}>
              <option value={0}>Upsloping</option>
              <option value={1}>Flat</option>
              <option value={2}>Downsloping</option>
            </select>
            <input type="number" placeholder="Number of major vessels (0-3) coloured by fluoroscopy" className="w-full p-2 text-black" onChange={handleCA}/>
            <h1>Blood supply to the heart</h1>
            <select className="w-full p-2 text-black" onChange={handleThal}>
              <option value={0}>Normal</option>
              <option value={1}>Fixed Defect</option>
              <option value={2}>Reversible Defect</option>
            </select>            
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="submit"
              className="bg-red-400 p-4 text-xl text-white rounded-xl hover:bg-red-500 hover:shadow-lg transition duration-500 ease-in-out"
              onClick={handleSubmit}
            >
              Predict
            </button>
            <button
              type="submit"
              className="bg-red-400 p-4 text-xl text-white rounded-xl hover:bg-red-500 hover:shadow-lg transition duration-500 ease-in-out"
            >False Value</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 bg-red-200 shadow-2xl rounded-xl p-8 place-items-center w-full">
          {target ? <h1 className="text-center text-2xl">You have a heart disease. Please consult a doctor immediately</h1> : <h1 className="text-center text-2xl">You don&apos;t have a heart disease</h1>}
        </div>
      </section>
      {/* <section id="data" className="grid place-items-center w-screen h-screen bg-red-400">
        <div>h</div>
      </section> */}
    </main>
  );
}
