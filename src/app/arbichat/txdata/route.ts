import { NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { arbichatABI } from "./contracts/arbichat";
import { ARBICHAT_ADDRESS } from "@/utils";
import { frames } from "./txdata";
import { transaction } from "frames.js/core";

const handleRequest = frames(async (ctx) => {
  // Get the query param of message
  if (!ctx.message?.inputText) {
    return NextResponse.error();
  }

  const calldata = encodeFunctionData({
    abi: arbichatABI,
    functionName: "chat",
    args: [ctx.message.inputText],
  });

  return transaction({
    chainId: "eip155:42161",
    method: "eth_sendTransaction",
    params: {
      abi: arbichatABI as Abi,
      to: ARBICHAT_ADDRESS,
      data: calldata,
    },
  });
});

export const GET = handleRequest;
export const POST = handleRequest;
