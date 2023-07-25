import { nanoid } from "nanoid";
import { Block, isContainerBlock } from "~/types";

const deleteBlock = (array: Array<Block>, blockId: string): Array<Block> => {
  return array
    .filter((e) => e.id !== blockId)
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

const findContainingArray = (
  blocks: Array<Block>,
  blockId: string,
  indexes: Array<number>
): { blocks: Array<Block>; indexes: Array<number> } | undefined => {
  const index = blocks.findIndex((e) => e.id === blockId);
  if (index === -1) {
    for (const block of blocks) {
      if (isContainerBlock(block)) {
        const result = findContainingArray(block.children, blockId, indexes);
        if (result) {
          const blockIndex = blocks.findIndex((e) => e.id === block.id);
          result.indexes.push(blockIndex);
          return result;
        }
      }
    }

    return undefined;
  }

  indexes.push(index);
  return { blocks, indexes };
};

export const useBlocks = () => {
  const blocksState: Ref<Array<Block>> = useState("blocks", () => []);
  const { undo, canUndo } = useRefHistory(blocksState);

  const add = (block: Block) => {
    blocksState.value = [
      ...blocksState.value,
      {
        ...block,
        id: nanoid(),
      },
    ];
  };

  const setBlocks = (blocks: Array<Block>) => {
    blocksState.value = blocks;
  };

  const remove = (blockId: string) => {
    blocksState.value = deleteBlock(blocksState.value, blockId);
  };

  return {
    blocks: blocksState,
    setBlocks,
    add,
    remove,
    canUndo,
    undo,
  };
};
