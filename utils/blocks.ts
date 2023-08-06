import { nanoid } from 'nanoid';
import {
  Block,
  BlockHistoryAction,
  BlockHistoryItem,
  isContainerBlock,
} from '~/types';

export const deleteBlock = (
  array: Array<Block>,
  blockId: string,
): Array<Block> => {
  return array
    .filter(e => e.id !== blockId)
    .map((object) => {
      if (isContainerBlock(object)) {
        return {
          ...object,
          children: deleteBlock(object.children, blockId),
        };
      }

      return object;
    });
};

export const updateBlock = (
  blocks: Array<Block>,
  newBlock: Block,
): Array<Block> => {
  return blocks.map((block) => {
    if (isContainerBlock(block)) {
      return {
        ...block,
        children: updateBlock(block.children, newBlock),
      };
    }

    if (block.id === newBlock.id) {
      return newBlock;
    }

    return block;
  });
};

export const addHistoryItem = (
  method: (pageId: string, item: BlockHistoryItem) => void,
  pageId: string,
  action: BlockHistoryAction,
  blocks: Array<Block>,
) => {
  method(pageId, {
    id: nanoid(10),
    action,
    blocks,
    timestamp: new Date().getTime(),
  });
};
