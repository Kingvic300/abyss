"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/timeline"; // Your existing component
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Plus,
  Search,
  Gift,
  Users,
  Zap,
  Coins,
  Globe,
  Calendar,
  X,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Airdrop {
  id: string;
  title: string;
  time: string;
  status: "live" | "upcoming" | "expired";
  project: string;
  network: string;
  tokens: string;
  participants: number;
  image: string;
}

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: "completed" | "active" | "pending";
  content?: React.ReactNode;
}

const AIRDROP_CARDS: Airdrop[] = [
  {
    id: "1",
    title: "AquaDrop Genesis Airdrop",
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

const AirdropCard = ({
  airdrop,
  onClaimClick,
}: {
  airdrop: Airdrop;
  onClaimClick: (airdrop: Airdrop) => void;
}) => {
  return (
    <div className="bg-black/40 border border-gray-700 rounded-lg p-6 flex gap-6 hover:bg-black/60 transition-colors backdrop-blur-sm">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          {airdrop.status === "live" && (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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

        <h3 className="text-white font-semibold text-[22px] mb-4 leading-tight">
          {airdrop.title}
        </h3>

        <div className="flex items-center gap-3 text-gray-300 text-sm mb-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
            <Gift className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-medium">{airdrop.project}</span>
            <span className="text-gray-400 ml-2">• {airdrop.network}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-4">
          <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full">
            <Coins className="h-4 w-4 text-yellow-400" />
            <span className="font-medium">{airdrop.tokens}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{airdrop.participants.toLocaleString()} participants</span>
          </div>

          <div className="flex items-center gap-2 bg-green-900/30 text-green-400 px-3 py-1.5 rounded-full">
            <Zap className="h-3 w-3" />
            <span className="text-xs font-medium">Gasless Claim</span>
          </div>
        </div>

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

      <img
        src={airdrop.image}
        alt={airdrop.title}
        className="w-40 h-40 rounded-lg object-cover shrink-0 border border-gray-600"
      />
    </div>
  );
};

const AirdropsSection = () => {
  const [selectedAirdrop, setSelectedAirdrop] = useState<Airdrop | null>(null);

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
      <div className="bg-black min-h-screen text-white p-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Airdrops Timeline */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-4xl font-bold">Gasless Airdrops</h1>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
                >
                  <Plus
                    size={16}
                    className="mr-2"
                  />
                  Create Airdrop
                </Button>
                <button className="text-gray-400 hover:text-white">
                  <Search size={20} />
                </button>
              </div>
            </div>

            <Timeline
              items={timelineItems}
              showTimestamps={false}
            />
          </div>

          {/* Right Section - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-5">
              {/* Stats Header */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-6 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <Gift
                    size={28}
                    className="text-white"
                  />
                </div>
                <h2 className="text-3xl font-bold mb-3 text-white">
                  Web3 Made Easy
                </h2>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Claim tokens with one click. No wallet setup, no gas fees, no
                  complexity. Just connect with Google and receive assets
                  instantly.
                </p>

                {/* Stats */}
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
                  <p className="text-gray-400 text-sm mb-2">Primary Network</p>
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

      {/* Airdrop Details Sheet */}
      <Sheet
        open={!!selectedAirdrop}
        onOpenChange={(open) => !open && setSelectedAirdrop(null)}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg bg-black border-l border-gray-800 p-0 flex flex-col"
        >
          {selectedAirdrop && (
            <>
              {/* Hero Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={selectedAirdrop.image}
                  alt={selectedAirdrop.title}
                  className="w-full h-40 object-cover"
                />
              </div>

              {/* Scrollable Content */}
              <ScrollArea className="h-72">
                <div className="px-6 py-6">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedAirdrop.status === "live" && (
                        <>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-green-500">Live</span>
                        </>
                      )}
                      {selectedAirdrop.status === "upcoming" && (
                        <span className="text-xs font-medium text-gray-500">{selectedAirdrop.time}</span>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      {selectedAirdrop.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      {selectedAirdrop.project}
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Reward</p>
                      <p className="text-sm font-medium text-white">{selectedAirdrop.tokens}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Network</p>
                      <p className="text-sm font-medium text-white">{selectedAirdrop.network.replace(" Network", "")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Users</p>
                      <p className="text-sm font-medium text-white">{(selectedAirdrop.participants / 1000).toFixed(1)}k</p>
                    </div>
                  </div>

                  <div className="h-px bg-gray-800 mb-6"></div>

                  {/* About */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {selectedAirdrop.project} is distributing {selectedAirdrop.tokens} in tokens to early adopters and community members on {selectedAirdrop.network}.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3">How to claim</h3>
                    <ol className="space-y-2 text-sm">
                      <li className="flex gap-3 text-gray-300">
                        <span className="text-gray-600 flex-shrink-0">1.</span>
                        <span>Click "Claim Now" to start</span>
                      </li>
                      <li className="flex gap-3 text-gray-300">
                        <span className="text-gray-600 flex-shrink-0">2.</span>
                        <span>Connect with Google</span>
                      </li>
                      <li className="flex gap-3 text-gray-300">
                        <span className="text-gray-600 flex-shrink-0">3.</span>
                        <span>Receive tokens instantly</span>
                      </li>
                    </ol>
                  </div>

                  <div className="h-px bg-gray-800 mb-6"></div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-white mb-3">Requirements</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex gap-2">
                        <span className="text-gray-600">•</span>
                        <span>18 years or older</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-600">•</span>
                        <span>Valid Google account</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-600">•</span>
                        <span>One claim per account</span>
                      </li>
                    </ul>
                  </div>

                  <div className="h-px bg-gray-800 mb-6"></div>

                  {/* Organizer */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-white mb-2">Organized by</h3>
                    <p className="text-sm text-gray-300">{selectedAirdrop.project}</p>
                  </div>
                </div>
              </ScrollArea>

              {/* CTA Footer */}
              <div className="flex-shrink-0 border-t border-gray-800 px-6 py-4 bg-black">
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-medium h-10"
                  disabled={selectedAirdrop.status !== "live"}
                >
                  {selectedAirdrop.status === "live" ? "Claim Now" : "Coming Soon"}
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AirdropsSection;
