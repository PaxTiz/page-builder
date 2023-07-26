import { Block } from "./blocks";

export type BlockHistorySaveMode = "manual" | "automatic";

export type BlockHistoryAction =
  | "automatic"
  | "save"
  | "publish"
  | "addBlock"
  | "deleteBlock"
  | "moveBlock"
  | "undo";

export type BlockHistoryItem = {
  id: string;
  timestamp: number;
  blocks: Array<Block>;
  action: BlockHistoryAction;
  saveMode: BlockHistorySaveMode;
};

export type BlockHistory = Array<BlockHistoryItem>;
