import { TransactionTargetResponse } from "frames.js";
import { NextRequest, NextResponse } from "next/server";
import { Abi, encodeFunctionData } from "viem";
import { arbichatABI } from "./contracts/arbichat";
import { ARBICHAT_ADDRESS } from "@/utils";
import { ethers } from "ethers";

export async function POST(
  req: NextRequest
): Promise<NextResponse<TransactionTargetResponse>> {
  // Get the query param of message
  console.log("***", req);

  const calldata = encodeFunctionData({
    abi: arbichatABI,
    functionName: "chat",
    args: [""],
  });

  return NextResponse.json({
    chainId: "eip155:42161",
    method: "eth_sendTransaction",
    params: {
      abi: arbichatABI as Abi,
      to: ARBICHAT_ADDRESS,
      data: calldata,
    },
  });
}
