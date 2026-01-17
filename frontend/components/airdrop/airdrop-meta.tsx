import React from "react";
import { Coins, Users, Zap, Gift } from "lucide-react";

interface AirdropMetaProps {
  project: string;
  network: string;
  tokens: string;
  participants: number;
  compact?: boolean;
}

/**
 * Server component for displaying airdrop metadata
 * No "use client" needed - pure data display without interactivity
 */
export function AirdropMeta({
  project,
  network,
  tokens,
  participants,
  compact = false,
}: AirdropMetaProps) {
  if (compact) {
    // Compact version for sheet
    return (
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Reward</p>
          <p className="text-sm font-medium text-white">{tokens}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Network</p>
          <p className="text-sm font-medium text-white">
            {network.replace(" Network", "")}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Users</p>
          <p className="text-sm font-medium text-white">
            {(participants / 1000).toFixed(1)}k
          </p>
        </div>
      </div>
    );
  }

  // Full version for card
  return (
    <>
      <div className="flex items-center gap-3 text-gray-300 text-sm mb-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center shrink-0">
          <Gift className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 break-words">
          <span className="font-medium">{project}</span>
          <span className="text-gray-400 ml-2">• {network}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-4">
        <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
          <Coins className="h-4 w-4 text-yellow-400 shrink-0" />
          <span className="font-medium">{tokens}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0" />
          <span>{participants.toLocaleString()} participants</span>
        </div>

        <div className="flex items-center gap-2 bg-green-900/30 text-green-400 px-3 py-1.5 rounded-full">
          <Zap className="h-3 w-3 shrink-0" />
          <span className="text-xs font-medium">Gasless Claim</span>
        </div>
      </div>
    </>
  );
}
