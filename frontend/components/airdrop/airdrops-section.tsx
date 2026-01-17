"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/timeline";
import { Plus, Search, Gift, Globe } from "lucide-react";
import { AirdropCard } from "./airdrop-card";
import { ClaimSheet } from "./claim-sheet";
import type { Airdrop, TimelineItem } from "./types";
import Link from "next/link";

// Mock airdrop data
const AIRDROP_CARDS: Airdrop[] = [
  {
    id: "1",
    title: "AquaDrop Genesis NFT",
    time: "Live Now",
    status: "live",
    project: "AquaDrop Protocol",
    network: "Sui Network",
    tokens: "5,000 AQUA",
    participants: 2847,
    image:
      "https://api.dicebear.com/7.x/shapes/svg?seed=AquaDrop&size=300&backgroundColor=0d9488,10b981,059669",
  },
  {
    id: "2",
    title: "Sui Liquid Staking Rewards",
    time: "Today, 15:00",
    status: "upcoming",
    project: "Wave Finance",
    network: "Sui Network",
    tokens: "250 WAVE",
    participants: 8921,
    image:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Wave&size=300&backgroundColor=3b82f6,2563eb,1d4ed8",
  },
  {
    id: "3",
    title: "zkLogin Gasless Giveaway",
    time: "Tomorrow, 16:00",
    status: "upcoming",
    project: "Sui Foundation",
    network: "Sui Network",
    tokens: "1,000 SUI",
    participants: 15623,
    image:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Sui&size=300&backgroundColor=8b5cf6,7c3aed,6d28d9",
  },
  {
    id: "4",
    title: "NFT Whitelist Spots",
    time: "Friday, 17:00",
    status: "upcoming",
    project: "Oceanic NFTs",
    network: "Sui Network",
    tokens: "WL Access",
    participants: 2341,
    image:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Oceanic&size=300&backgroundColor=ec4899,db2777,be185d",
  },
  {
    id: "5",
    title: "DeFi Incentive Program",
    time: "Next Week",
    status: "upcoming",
    project: "Coral Swap",
    network: "Sui Network",
    tokens: "500 CORAL",
    participants: 568,
    image:
      "https://api.dicebear.com/7.x/shapes/svg?seed=Coral&size=300&backgroundColor=f59e0b,d97706,b45309",
  },
];

/**
 * Main airdrops section component
 * Uses "use client" because it manages selectedAirdrop state
 * In a real app, this could be a server component if state was managed via URL params
 */
export default function AirdropsSection() {
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);

  // Map airdrops to timeline items
  const timelineItems: TimelineItem[] = AIRDROP_CARDS.map((airdrop) => ({
    id: airdrop.id,
    title: airdrop.status === "live" ? "Live Now" : "Upcoming",
    description:
      airdrop.status === "live" ? "Available for claiming" : "Starting soon",
    timestamp: new Date(),
    status:
      airdrop.status === "live"
        ? "active"
        : airdrop.status === "upcoming"
        ? "pending"
        : "completed",
    content: (
      <AirdropCard
        airdrop={airdrop}
        onClaimClick={setSelectedAirdrop}
      />
    ),
  }));

  return (
    <>
      {/* Main container with overflow control */}
      <div className="bg-[#352939] min-h-screen text-white p-4 sm:p-6 overflow-x-hidden">
        <div className="max-w-7xl mx-auto min-h-screen">
          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Section - Airdrops Timeline (takes 2 columns on desktop) */}
            <div className="lg:col-span-2 min-w-0">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  Gasless Airdrops
                </h1>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                    asChild
                  >
                    <Link href="/airdrop">
                      <Plus
                        size={16}
                        className="mr-2"
                      />
                      Create Airdrop
                    </Link>
                  </Button>
                  <button className="text-gray-400 hover:text-white p-2">
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* Timeline with cards */}
              <Timeline
                items={timelineItems}
                showTimestamps={false}
              />
            </div>

            {/* Right Section - Sidebar (1 column on desktop, full width on mobile) */}
            <div className="lg:col-span-1 min-w-0">
              <div className="lg:sticky lg:top-5 lg:h-screen">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6 overflow-hidden">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                    <Gift
                      size={28}
                      className="text-white"
                    />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                    Web3 Made Easy
                  </h2>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    Claim tokens with one click. No wallet setup, no gas fees,
                    no complexity. Just connect with Google and receive assets
                    instantly.
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-cyan-400">
                        5,231
                      </div>
                      <p className="text-gray-400 text-xs">Claims Today</p>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-green-400">
                        99.8%
                      </div>
                      <p className="text-gray-400 text-xs">Success Rate</p>
                    </div>
                  </div>

                  {/* Network Selector */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">
                      Primary Network
                    </p>
                    <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
                      <Globe className="h-4 w-4 text-cyan-400" />
                      <span className="font-medium">Sui Network</span>
                      <span className="ml-auto text-xs text-green-400">
                        • Active
                      </span>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-bold text-sm py-2">
                    Get Notified of New Drops
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Sheet */}
      <ClaimSheet
        airdrop={selectedAirdrop}
        isOpen={!!selectedAirdrop}
        onClose={() => setSelectedAirdrop(null)}
      />
    </>
  );
}
