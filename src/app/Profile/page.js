"use client";
import { useEffect } from "react";
import { useContract } from "@/context/Context";

const ProfileComponent = () => {
  const { account, contract, connectWallet, getProfilesHandler } =
    useContract();

  return (
    <div>
      Profile Data Here
      <button onClick={getProfilesHandler}>click</button>
    </div>
  );
};

export default ProfileComponent;
