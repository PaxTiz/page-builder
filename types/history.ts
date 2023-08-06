import { Block } from './blocks';

export const historyActions = [
  'automatic',
  'save',
  'publish',
  'addBlock',
  'deleteBlock',
  'moveBlock',
  'undo',
] as const;

export type BlockHistoryAction = typeof historyActions[number];

export type BlockHistoryItem = {
  id: string;
  timestamp: number;
  blocks: Array<Block>;
  action: BlockHistoryAction;
};

export type BlockHistory = Array<BlockHistoryItem>;
