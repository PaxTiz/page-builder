import { nanoid } from 'nanoid';
import { Block } from '~/types';

export const useBlocks = () => {
  const blocksState: Ref<Array<Block>> = useState('blocks', () => []);
  const { undo: undoAction, canUndo } = useRefHistory(blocksState);
  const { save } = usePageHistory();

  const add = (block: Block) => {
    blocksState.value = [
      ...blocksState.value,
      {
        ...block,
        id: nanoid(),
      },
    ];

    addHistoryItem(save, 'addBlock', blocksState.value);
  };

  const setBlocks = (blocks: Array<Block>) => {
    blocksState.value = blocks;
  };

  const remove = (blockId: string) => {
    blocksState.value = deleteBlock(blocksState.value, blockId);
    addHistoryItem(save, 'deleteBlock', blocksState.value);
  };

  const move = (blocks: Array<Block>) => {
    blocksState.value = blocks;
    addHistoryItem(save, 'moveBlock', blocksState.value);
  };

  const update = (block: Block) => {
    blocksState.value = updateBlock(blocksState.value, block);
  };

  const undo = () => {
    undoAction();
    addHistoryItem(save, 'undo', blocksState.value);
  };

  return {
    blocks: blocksState,
    setBlocks,
    add,
    remove,
    move,
    update,
    canUndo,
    undo,
  };
};
