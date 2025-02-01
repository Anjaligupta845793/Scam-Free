"use client";
import { useEffect } from "react";

import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  console.log(params);

  return <p>Post: {params.url}</p>;
};

export default Page;
