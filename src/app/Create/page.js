"use client";
import { useState } from "react";
import Image from "next/image";
import { PinataSDK } from "pinata-web3";
import { useContract } from "@/context/Context";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY,
});

const Page = () => {
  const [name, setname] = useState("");
  const [url, seturl] = useState("");
  const [discription, setdiscription] = useState("");
  const [reason, setreason] = useState("");
  const [image, setimage] = useState("");
  const [isValid, setisValid] = useState(true);
  const [fileUrl, setfileUrl] = useState("");
  const [uploadLoader, setuploadLoader] = useState(false);
  const { setProfileHandler } = useContract();
  const [submitLoader, setsubmitLoader] = useState(false);

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("no file is selected!");
      return;
    }
    setimage(file);
    console.log(file);
    console.log("pinata", pinata);
    setuploadLoader(true);
    try {
      const upload = await pinata.upload.file(file);
      console.log(upload);
      const fileurl = "https://gateway.pinata.cloud/ipfs/" + upload.IpfsHash;
      setfileUrl(fileurl);
      setuploadLoader(false);
    } catch (error) {
      console.log(error);
      setuploadLoader(false);
    }
  };
  const validateLinkedinURL = (e) => {
    const url = e.target.value;
    seturl(e.target.value);
    const linkedinPattern =
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_%]+\/?$/;
    setisValid(linkedinPattern.test(url));
    const status = linkedinPattern.test(url);
    console.log(status);
    if (!status) {
      console.log("wrong");
    }
  };
  const submitHandler = (e) => {
    setsubmitLoader(true);
    e.preventDefault();

    setProfileHandler(url, name, discription, reason, fileUrl);
    setsubmitLoader(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-5">
      <div className="max-w-5xl w-full grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* Form Section */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-white text-2xl font-semibold mb-4">
            Report Scammer
          </h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="form-control">
              <label className="label text-white">
                <span className="label-text">LinkedIn Profile URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter profile URL"
                className="input input-bordered w-full bg-gray-700 text-white"
                value={url}
                onChange={validateLinkedinURL}
              />
            </div>
            <div className="form-control">
              <label className="label text-white">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="input input-bordered w-full bg-gray-700 text-white"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label text-white">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Describe the scam"
                className="textarea textarea-bordered w-full bg-gray-700 text-white"
                value={discription}
                onChange={(e) => setdiscription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label text-white">
                <span className="label-text">Reason</span>
              </label>
              <input
                type="text"
                placeholder="Reason for reporting"
                className="input input-bordered w-full bg-gray-700 text-white"
                value={reason}
                onChange={(e) => setreason(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label text-white">
                <span className="label-text">Screenshot</span>
                {uploadLoader && (
                  <span className="loading loading-ring loading-xs"></span>
                )}
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full bg-gray-700 text-white"
                onChange={imageHandler}
              />
            </div>
            <button
              className="btn btn-primary w-full mt-4"
              disabled={submitLoader}
            >
              {submitLoader ? (
                <span className="loading loading-ring loading-xs"></span>
              ) : (
                "Submit Report"
              )}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col items-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Form Preview</h2>
          <p className="text-gray-400">
            Your submitted details will be displayed here.
          </p>
          <div className="mt-6 w-full bg-gray-700 p-6 rounded-lg text-center shadow-md">
            <h3 className="text-lg font-semibold text-primary mb-2">
              Submitted Details
            </h3>
            <div className="text-left space-y-2">
              <p>
                <span className="text-gray-400 font-medium">LinkedIn URL:</span>{" "}
                {url || "N/A"}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Name:</span>{" "}
                {name || "N/A"}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Description:</span>{" "}
                {discription || "N/A"}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Reason:</span>{" "}
                {reason || "N/A"}
              </p>
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  width={200}
                  height={100}
                  alt="screen shot "
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
