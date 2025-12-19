"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/timeline";
import { Plus, Search, MapPin } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: "completed" | "active" | "pending";
}

const EVENTS_DATA: TimelineItem[] = [
  {
    id: "1",
    title: "Temi's Closet Lagos Pop-Up",
    description: "By Temi Akande • Bashorun R.I. Okusanya Avenue",
    timestamp: new Date(),
    status: "active",
  },
  {
    id: "2",
    title: "Book Launch - When Home Slipped Away",
    description: "By Oluwatofunmi • Lagos, Lagos",
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "3",
    title: "Book Launch - When Home Slipped Away",
    description: "By Oluwatofunmi • Lagos, Lagos",
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "4",
    title: "Book Launch - When Home Slipped Away",
    description: "By Oluwatofunmi • Lagos, Lagos",
    timestamp: new Date(),
    status: "pending",
  },
  {
    id: "5",
    title: "Book Launch - When Home Slipped Away",
    description: "By Oluwatofunmi • Lagos, Lagos",
    timestamp: new Date(),
    status: "pending",
  },
];

const EventSection = () => {
  return (
    <div className="bg-white min-h-screen text-gray-900 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-auto hide-scrollbar">
        {/* Left Section - Events Timeline */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Events</h1>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900"
              >
                <Plus
                  size={16}
                  className="mr-2"
                />
                Submit Event
              </Button>
              <button className="text-gray-600 hover:text-gray-900">
                <Search size={20} />
              </button>
            </div>
          </div>

          <Timeline items={EVENTS_DATA} />
        </div>

        {/* Right Section - Sidebar */}
        <div className="lg:col-span-1 sticky top-0 h-screen">
          <div>
            {/* Location Header */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <div className="w-12 h-12 rounded-full gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-4">
                <MapPin
                  size={24}
                  className="text-white"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">Lagos</h2>
              <p className="text-gray-600 text-sm mb-6">
                Discover the hottest events in Lagos, and get notified of new
                events before they sell out.
              </p>

              {/* Email Input */}
              <input
                type="email"
                placeholder="me@email.com"
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 mb-4 text-sm focus:outline-none focus:border-gray-500"
              />

              {/* Subscribe Button */}
              <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 font-semibold">
                Subscribe
              </Button>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden h-64 relative">
              <div className="w-full h-full gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <div className="absolute inset-0 opacity-20">
                  {/* Simple map grid pattern */}
                  <svg className="w-full h-full">
                    <defs>
                      <pattern
                        id="grid"
                        width="20"
                        height="20"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 20 0 L 0 0 0 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                          className="text-gray-400"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#grid)"
                    />
                  </svg>
                </div>

                {/* Map markers */}
                <div className="absolute top-20 left-16">
                  <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                </div>
                <div className="absolute top-32 right-20">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    2
                  </div>
                </div>
                <div className="absolute bottom-16 right-32">
                  <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    3
                  </div>
                </div>

                <span className="text-gray-500 font-semibold text-lg absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  Lagos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSection;
