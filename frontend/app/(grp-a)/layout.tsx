"use client";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell, Calendar, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
      });
      setCurrentTime(time + " GMT+1");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-[#352939] h-screen w-full">
      <header className="fixed top-0 z-20 w-full border-b border-white/10 backdrop-blur-2xl">
        <div className="mx-auto max-w-300 px-4 sm:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-14">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* timer section */}
            <p className="text-gray-400 text-sm">{currentTime}</p>
            <Button
              variant="ghost"
              size="sm"
              className="p-0! hover:bg-transparent"
              asChild
            >
              <Link href="/airdrop"> Create Airdrop </Link>
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="p-0! hover:bg-transparent"
              title="Search"
            >
              <Search size={16} />
            </Button>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="p-0! hover:bg-transparent relative"
              title="Notification"
            >
              <Bell size={16} />
              <span className="absolute top-2 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <ProfileDropdown />
          </div>
        </div>
      </header>
      <div className="h-screen overflow-auto hide-scrollbar">
        <div className="max-w-5xl mx-auto pt-24 pb-4 px-4 sm:px-6 grid grid-cols-3 gap-5 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
