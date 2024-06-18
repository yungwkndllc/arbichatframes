"use client";
import Image from "next/image";
import { ARBICHAT_ADDRESS, IMAGE_URL } from "@/utils";
import { useWriteContract } from "wagmi";
import { arbichatABI } from "../arbichat/txdata/contracts/arbichat";
import { useState } from "react";

export default function BuyImage() {
  const { writeContract, error } = useWriteContract();

  const [message, setMessage] = useState("");

  const onClickFunction = async () => {
    writeContract({
      abi: arbichatABI,
      address: ARBICHAT_ADDRESS,
      functionName: "chat",
      args: [message],
    });
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={`/logozoomed.png`}
        className="mt-10"
        alt="higher"
        width={800}
        height={800}
        priority
      />
      <div className="flex mt-4">
        {/* Message input */}
        <input
          className="border border-gray-300 p-2 text-black"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="mr-2 bg-coolGreen hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            onClickFunction();
          }}
        >
          chat
        </button>
      </div>
    </div>
  );
}
