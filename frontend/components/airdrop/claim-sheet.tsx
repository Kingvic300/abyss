"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Airdrop } from "./types";
import { AirdropMeta } from "./airdrop-meta";
import { ClaimSteps } from "./claim-steps";
import { enoki } from "@/lib/enoki";
import {
  useConnectWallet,
  useSignTransaction,
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
  useWallets,
} from "@mysten/dapp-kit";
import { isEnokiWallet, AuthProvider } from "@mysten/enoki";
import { type EnokiWallet } from "@mysten/enoki";
import { Transaction } from "@mysten/sui/transactions";
import { toBase64 } from "@mysten/sui/utils";
import { toast } from "sonner";

interface ClaimSheetProps {
  airdrop: Airdrop | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Client component for airdrop claim detail sheet
 * "use client" required for: Sheet, ScrollArea, state, event handlers
 *
 * Features:
 * - Mobile: Full-screen with sticky CTA at bottom
 * - Tablet/Desktop: Side panel overlay
 * - Prevents background scroll when open
 * - Scrollable content with proper height calculation
 */
export function ClaimSheet({ airdrop, isOpen, onClose }: ClaimSheetProps) {
  const currentAccount = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const wallets = useWallets().filter(isEnokiWallet);

  const walletsByProvider = wallets.reduce(
    (map, wallet) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>()
  );
  const googleWallet = walletsByProvider.get("google");

  const genesis_image =
    "https://api.dicebear.com/7.x/shapes/svg?seed=AquaDrop&size=300&backgroundColor=0d9488,10b981,059669";

  const handleClaimClick = async () => {
    if (!currentAccount) return;
    console.log("ready to claim for", currentAccount.address);

    const tx = new Transaction();

    tx.moveCall({
      target: `${process.env.NEXT_PUBLIC_PACKAGE_ID}::abyss::mint_nft`,
      arguments: [
        tx.pure.string("AquaDrop Genesis Airdrop"),
        tx.pure.string(genesis_image),
        tx.pure.string("Your first gasless NFT claim"),
        tx.pure.address(currentAccount.address),
      ],
    });

    const { digest } = await signAndExecuteTransaction(
      {
        transaction: tx,
        chain: "sui:testnet",
      },
      {
        onSuccess: (result) => {
          console.log("executed transaction", result);
          toast.success(
            `Transaction sent to ${shortAddress(currentAccount.address)}`,
            {
              description: `Your NFT claim has been processed successfully.`,
            }
          );
        },

        onError: (error) => {
          console.log(error);
          toast.error("Transaction failed", {
            description:
              "There was an error processing your claim. Please try again.",
          });
        },
      }
    );
  };
  // Prevent background scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!airdrop) return null;

  const shortAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-black border-l border-gray-800 p-0 flex flex-col overflow-hidden"
      >
        {/* Hero Image with Gradient Overlay */}
        <div className="relative flex-shrink-0 h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20">
          <img
            src={airdrop.image}
            alt={airdrop.title}
            className="w-full h-full object-cover opacity-80 mix-blend-overlay"
          />
          {/* Gradient Overlay for better visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                {airdrop.status === "live" && (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-green-500">
                      Live
                    </span>
                  </>
                )}
                {airdrop.status === "upcoming" && (
                  <span className="text-xs font-medium text-gray-500">
                    {airdrop.time}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white break-words">
                {airdrop.title}
              </h2>
              <p className="text-sm text-gray-400 mt-1">{airdrop.project}</p>
            </div>

            {/* Metrics - Compact Version */}
            <div className="mb-6">
              <AirdropMeta
                project={airdrop.project}
                network={airdrop.network}
                tokens={airdrop.tokens}
                participants={airdrop.participants}
                compact
              />
            </div>

            <div className="h-px bg-gray-800 mb-6" />

            {/* About */}
            <div className="mb-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                {airdrop.project} is distributing {airdrop.tokens} in tokens to
                early adopters and community members on {airdrop.network}.
              </p>
            </div>

            {/* Steps */}
            <ClaimSteps />

            <div className="h-px bg-gray-800 mb-6" />

            {/* Requirements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-white mb-3">
                Requirements
              </h3>
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

            <div className="h-px bg-gray-800 mb-6" />

            {/* Organizer */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-sm font-semibold text-white mb-2">
                Organized by
              </h3>
              <p className="text-sm text-gray-300">{airdrop.project}</p>
            </div>

            {/* Extra padding for mobile to account for sticky CTA */}
            <div className="h-20 sm:h-0" />
          </div>
        </ScrollArea>

        {/* Sticky CTA Footer - Always visible */}
        <div className="sticky bottom-0 flex-shrink-0 border-t border-gray-800 px-4 sm:px-6 py-3 sm:py-4 bg-black z-10">
          {!currentAccount ? (
            // 🔐 Not signed in
            googleWallet ? (
              <button
                onClick={() => connect({ wallet: googleWallet })}
                className="w-full bg-white text-black hover:bg-gray-100 font-medium h-10 sm:h-11 rounded-md"
              >
                Sign in with Google
              </button>
            ) : (
              <p className="text-sm text-gray-400 text-center">
                Google login unavailable
              </p>
            )
          ) : (
            // ✅ Signed in
            <div className="space-y-2">
              {/* Connected address */}
              <div className="text-xs text-gray-400 text-center">
                Connected as{" "}
                <span className="text-white font-mono">
                  {shortAddress(currentAccount.address)}
                </span>
              </div>

              {/* Claim button */}
              <Button
                className="w-full bg-white text-black hover:bg-gray-100 font-medium h-10 sm:h-11"
                disabled={airdrop.status !== "live"}
                onClick={handleClaimClick}
              >
                {airdrop.status === "live" ? "Claim Now" : "Coming Soon"}
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
