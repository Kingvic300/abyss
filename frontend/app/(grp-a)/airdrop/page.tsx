"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Copy, Check, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AirdropPage() {
  const [assetType, setAssetType] = useState("token");
  const [amount, setAmount] = useState("");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState("/fallback.png");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateAirdrop = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a mock airdrop link
    const link = `${window.location.origin}/${Math.random()
      .toString(36)
      .substring(2, 15)}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="col-span-3 grid grid-cols-3 gap-5 w-full">
      {/* Left Sidebar */}
      <div className="col-span-1 space-y-3 sticky top-24 h-screen">
        <div className="relative group">
          <Image
            src={imagePreview}
            alt="Create Airdrop"
            width={400}
            height={400}
            className="rounded-md shadow object-cover"
          />
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("image-upload")?.click()}
            className="absolute bottom-3 right-5 z-100 rounded-full bg-black/60 border-gray-700 hover:bg-black/80 p-2 py-3 transition-all"
          >
            <Camera />
          </Button>
        </div>
        <div>
          <p className="text-gray-400 text-sm border-b-2 py-2">Why Airdrop?</p>
          <div className="space-y-2 mt-3">
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">✓</span>
              <span className="text-white text-sm">Instant Setup</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">✓</span>
              <span className="text-white text-sm">Secure & Safe</span>
            </div>
            <div className="flex gap-2">
              <span className="text-cyan-400 font-semibold">✓</span>
              <span className="text-white text-sm">No Wallet Needed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="col-span-2 space-y-6 pl-6">
        <div>
          <h1 className="text-5xl font-semibold text-white mb-2">
            Send Crypto in One Click
          </h1>
          <p className="text-gray-400">
            Create a shareable link to send crypto assets or messages. No wallet
            required for recipients.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="pointer-events-none absolute inset-0" />

          <form
            onSubmit={handleCreateAirdrop}
            className="relative space-y-6"
          >
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
                      "rounded-xl border-2 p-3 text-center font-medium capitalize transition-all",
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
                <label
                  htmlFor="amount"
                  className="text-sm font-medium text-gray-300"
                >
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
              <label
                htmlFor="recipients"
                className="text-sm font-medium text-gray-300"
              >
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
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-300"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal message to your recipients..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900/50 px-4 py-3 text-white placeholder:text-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="h-12 w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white text-base font-medium shadow-lg shadow-cyan-500/20 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
            >
              <Send className="mr-2 h-5 w-5" />
              Create Airdrop Link
            </Button>
          </form>

          {/* Generated Link */}
          {generatedLink && (
            <div className="mt-6 space-y-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <h3 className="font-semibold text-white text-sm">
                  Your Airdrop Link is Ready!
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                <div className="overflow-hidden rounded-lg border border-gray-700 bg-black/50 px-4 py-3">
                  <p className="truncate text-sm text-gray-400">
                    {generatedLink}
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCopyLink}
                  className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-gray-400">
                Share this link with your recipients. They can claim their
                airdrop with just one click!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
