"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Sparkles, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AirdropPage() {
  const [assetType, setAssetType] = useState("token");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCreateAirdrop = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock airdrop link
    const link = `https://abyss.app/claim/${Math.random().toString(36).substring(2, 15)}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 z-20 w-full border-b border-white/10 bg-black/50 backdrop-blur-2xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 lg:px-12">
          {/* Header Section */}
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
              <Sparkles className="h-4 w-4" />
              <span>Create Your First Airdrop</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl bg-gradient-to-br from-white via-white to-gray-400 bg-clip-text text-transparent">
              Send Crypto in One Click
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-400">
              Create a shareable link to send crypto assets or messages. No wallet required for recipients.
            </p>
          </div>

          {/* Form Card */}
          <div className="mt-12">
            <div className="relative overflow-hidden rounded-3xl border border-gray-700 bg-gradient-to-br from-gray-900/50 to-black/30 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl">
              {/* Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />

              <form onSubmit={handleCreateAirdrop} className="relative space-y-6 sm:space-y-8">
                {/* Asset Type Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-300">
                    Asset Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["token", "nft", "message"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAssetType(type)}
                        className={cn(
                          "rounded-xl border-2 p-3 sm:p-4 text-center font-medium capitalize transition-all",
                          assetType === type
                            ? "border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/20"
                            : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:bg-gray-800"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Field */}
                {assetType !== "message" && (
                  <div className="space-y-3">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-300">
                      Amount {assetType === "nft" ? "(NFT ID or Quantity)" : ""}
                    </label>
                    <input
                      id="amount"
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={assetType === "token" ? "0.00" : "NFT ID"}
                      className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    />
                  </div>
                )}

                {/* Recipients Field */}
                <div className="space-y-3">
                  <label htmlFor="recipients" className="text-sm font-medium text-gray-300">
                    Number of Recipients
                  </label>
                  <input
                    id="recipients"
                    type="number"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="1"
                    min="1"
                    className="w-full rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-3">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Add a personal message to your recipients..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 w-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-base font-medium shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Create Airdrop Link
                </Button>
              </form>

              {/* Generated Link */}
              {generatedLink && (
                <div className="mt-8 space-y-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Your Airdrop Link is Ready!</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="flex-1 overflow-hidden rounded-lg border border-gray-700 bg-black/50 px-4 py-3">
                      <p className="truncate text-sm text-gray-400">{generatedLink}</p>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={handleCopyLink}
                      className="shrink-0 border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Share this link with your recipients. They can claim their airdrop with just one click!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-700 bg-gray-900/30 p-6 backdrop-blur-sm transition-all hover:border-gray-600 hover:bg-gray-900/50"
              >
                <div className="mb-3 inline-flex rounded-lg bg-cyan-500/10 p-3 text-cyan-400">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Background Gradient */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-black to-black" />
    </div>
  );
}

const features = [
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instant Setup",
    description: "Create shareable links in seconds. No complex wallet connections needed.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Secure & Safe",
    description: "Enterprise-grade security ensures your assets are protected at all times.",
  },
  {
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "No Wallet Needed",
    description: "Recipients can claim without any prior crypto knowledge or wallet setup.",
  },
];
