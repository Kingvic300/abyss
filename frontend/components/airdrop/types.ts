// Shared TypeScript interfaces for airdrop components

export interface Airdrop {
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

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  status: "completed" | "active" | "pending";
  content?: React.ReactNode;
}
