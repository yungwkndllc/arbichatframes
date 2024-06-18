import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { VERCEL_URL } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "../../node_modules/@rainbow-me/rainbowkit/dist/index.css";

import dynamic from "next/dynamic";
const DynamicBuyImage = dynamic(() => import("./components/BuyImage"), {
  loading: () => <></>,
});

const DynamicChat = dynamic(() => import("./components/Chat"), {
  loading: () => <></>,
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "arbichat",
    description: "chat with friends!",
    other: {
      ...(await fetchMetadata(
        new URL("/arbichat", VERCEL_URL || "http://localhost:3000")
      )),
    },
  };
}

export default function Home() {
  return (
    <>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ConnectButton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          <DynamicBuyImage />
          <DynamicChat />
        </div>

        <footer className="mt-10 text-center">
          <a
            href="https://warpcast.com/yungwknd"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made with 🪄 by <span className="underline">@yungwknd</span>
          </a>
        </footer>
      </main>
    </>
  );
}
