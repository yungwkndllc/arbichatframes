/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./arbichat";
import { IMAGE_URL, VERCEL_URL } from "@/utils";

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: IMAGE_URL,
      imageOptions: {
        aspectRatio: "1.91:1",
      },
      buttons: [
        <Button
          action="link"
          target={`https://arbiscan.io/tx/${ctx.message.transactionId}`}
        >
          View on arbiscan
        </Button>,
      ],
    };
  }

  return {
    image: IMAGE_URL,
    imageOptions: {
      aspectRatio: "1.91:1",
    },
    textInput: "enter your message",
    buttons: [
      <Button
        action="tx"
        target={`${VERCEL_URL}/arbichat/txdata`}
        post_url="/arbichat"
      >
        chat
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
