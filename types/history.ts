import { Block } from "./blocks";

export type BlockHistoryItem = {
  id: string;
  timestamp: number;
  blocks: Array<Block>;
  saveMode: "manual" | "automatic";
};

export type BlockHistory = Array<BlockHistoryItem>;
