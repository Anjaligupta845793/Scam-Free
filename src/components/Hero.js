"use client";
import { useContract } from "@/context/Context";
import React from "react";

const Hero = () => {
  const { connectWallet, account } = useContract();
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center ">
        <div className="max-w-[800px]">
          <h1 className="text-5xl font-bold">
            Unmask Fake LinkedIn Profiles with Blockchain
          </h1>
          <p className="py-6">
            Protect yourself from scams and fraud. Verify identities, report
            suspicious accounts, and contribute to a safer professional
            network—because trust goes both ways.
          </p>
          {account ? (
            <span className="text-green-500 font-bold">
              {account.substring(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button onClick={connectWallet} className="btn btn-primary">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
