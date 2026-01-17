"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type { Airdrop } from "./types";
import { AirdropMeta } from "./airdrop-meta";

interface AirdropCardProps {
  airdrop: Airdrop;
  onClaimClick: (airdrop: Airdrop) => void;
}

/**
 * Client component for airdrop card with interactive claim button
 * "use client" required for: button click handlers and hover states
 */
export function AirdropCard({ airdrop, onClaimClick }: AirdropCardProps) {
  return (
    <div className="bg-black/20 border border-gray-700 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:bg-black/30 transition-colors backdrop-blur-sm overflow-hidden">
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          {airdrop.status === "live" && (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="text-green-500 text-xs font-bold">LIVE</span>
              <span className="text-gray-400 text-sm font-semibold">
                {airdrop.time}
              </span>
            </>
          )}
          {airdrop.status === "upcoming" && (
            <span className="text-gray-400 text-sm font-semibold">
              {airdrop.time}
            </span>
          )}
          {airdrop.status === "expired" && (
            <span className="text-red-400 text-sm font-semibold">
              {airdrop.time}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-lg sm:text-[22px] mb-4 leading-tight break-words">
          {airdrop.title}
        </h3>

        {/* Metadata */}
        <AirdropMeta
          project={airdrop.project}
          network={airdrop.network}
          tokens={airdrop.tokens}
          participants={airdrop.participants}
        />

        {/* CTA Button */}
        <Button
          onClick={() => onClaimClick(airdrop)}
          className={`w-full mt-2 ${
            airdrop.status === "live"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              : "bg-gray-700 hover:bg-gray-600 text-gray-200"
          }`}
          disabled={airdrop.status !== "live"}
        >
          {airdrop.status === "live" ? "Claim Now" : "Coming Soon"}
        </Button>
      </div>

      {/* Image - Order changes on mobile */}
      <div className="relative w-full sm:w-40 h-40 rounded-lg overflow-hidden shrink-0 border border-gray-600 order-first sm:order-last bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20">
        <img
          src={airdrop.image}
          alt={airdrop.title}
          className="w-full h-full object-cover opacity-80 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
      </div>
    </div>
  );
}
