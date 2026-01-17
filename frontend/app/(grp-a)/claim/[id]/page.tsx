import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const page = () => {
  return (
    <>
      <div className="col-span-1 space-y-3 sticky top-24 h-[calc(100vh-7rem)]">
        <Image
          src={"/fallback.png"}
          alt="Airdrop"
          width={400}
          height={400}
          className="rounded-md shadow"
        />
        <div>
          <p className="text-gray-400 text-sm border-b-2 py-2">Hosted by</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-0.5">
              <div className="w-full h-full rounded-full overflow-hidden bg-white"></div>
            </div>
            <span className="text-white text-sm font-medium">KAYODE DADA</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 space-y-6 pl-6">
        <h1 className="text-5xl font-semibold text-giest">AquaDrop Genesis</h1>
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            <div className="border w-12 h-12 rounded-sm overflow-hidden text-center">
              <div className="w-full text-center font-semibold text-sm bg-white/10">
                DEC
              </div>
              <p>22</p>
            </div>
            <div>
              <p className="font-semibold">Claim Period</p>
              <p>Live until 31 December</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="border w-12 h-12 rounded-sm overflow-hidden flex items-center justify-center">
              <MapPin />
            </div>
            <div>
              <p className="font-semibold">Sui Testnet</p>
              <p>Gasless NFT claim</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-md overflow-hidden border">
          <div className="px-3 py-1 bg-white/10 rounded-t-sm">
            <p className="text-sm text-white">Registration</p>
          </div>
          <div className="px-3 py-2 border-b h-40">
            <p className="text-white">
              Claim your exclusive AquaDrop Genesis NFT. This is your first
              gasless claim on the Sui network. Sign in with Google to get
              started and receive your unique digital collectible instantly.
            </p>
          </div>
          <div className="flex">
            <Button className="w-full rounded-none rounded-bl-md">
              Connect Wallet
            </Button>
            <Button
              variant={"outline"}
              className="w-full rounded-none rounded-br-md"
            >
              Sign In with Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default page