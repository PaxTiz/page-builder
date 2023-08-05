import { nanoid } from 'nanoid';
import { Page } from '~/server/schema';
import { Block } from '~/types';

type ActualPage = Page & { blocks: Array<Block> }

export const useBlocks = () => {
  const page: Ref<ActualPage> = useState('page', () => ({
    id: '',
    name: '',
    slug: '',
    blocks: [],
  }));

  const { undo: undoAction, canUndo } = useRefHistory(page);
  const { save } = usePageHistory();

  const add = (block: Block) => {
    page.value = {
      ...page.value,
      blocks: [
        ...page.value.blocks,
        {
          ...block,
          id: nanoid(),
        },

      ],
    };

    addHistoryItem(save, 'addBlock', page.value.blocks);
  };

  const setBlocks = (blocks: Array<Block>) => {
    page.value = {
      ...page.value,
      blocks,
    };
  };

  const remove = (blockId: string) => {
    page.value = {
      ...page.value,
      blocks: deleteBlock(page.value.blocks, blockId),
    };
    addHistoryItem(save, 'deleteBlock', page.value.blocks);
  };

  const move = (blocks: Array<Block>) => {
    page.value = {
      ...page.value,
      blocks,
    };
    addHistoryItem(save, 'moveBlock', page.value.blocks);
  };

  const update = (block: Block) => {
    page.value = {
      ...page.value,
      blocks: updateBlock(page.value.blocks, block),
    };
  };

  const undo = () => {
    undoAction();
    addHistoryItem(save, 'undo', page.value.blocks);
  };

  const load = async (pageId: string) => {
    const response = await useFetch(`/api/pages/${pageId}`);
    if (response.error.value) {
      throw createError(response.error.value);
    }

    page.value = response.data.value as ActualPage;
  };

  return {
    page,
    setBlocks,
    add,
    remove,
    move,
    update,
    canUndo,
    undo,
    load,
  };
};
