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

  const move = (blockId: string, direction: "up" | "down") => {
    const copiedBlocks = blocksState.value;
    const index = copiedBlocks.findIndex((e) => e.id === blockId);

    if (index === -1) {
      const array = findContainingArray(copiedBlocks, blockId, [])!;
      const indexes = array.indexes.reverse();

      const movedBlockIndex = indexes[indexes.length - 1];
      if (movedBlockIndex === 0) {
        
      }

      let blocks = copiedBlocks;
      for (const index of indexes) {
        const block = blocks[index];
        if (isContainerBlock(block)) {
          blocks = block.children;
        }
      }

      console.log(blocks);
    } else {
      if (index === 0 && direction === "up") {
        return;
      }

      const newIndex = direction === "up" ? index - 1 : index + 1;
      copiedBlocks[index] = copiedBlocks.splice(
        newIndex,
        1,
        copiedBlocks[index]
      )[0];
    }

    blocksState.value = copiedBlocks;
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
    move,
    canUndo,
    undo,
  };
};
