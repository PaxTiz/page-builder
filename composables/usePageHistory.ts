import { Page } from 'server/schema';
import { BlockHistory, BlockHistoryItem } from '~/types';

export const usePageHistory = () => {
  const history: Ref<BlockHistory> = useState('blocks_history', () => []);

  const sorted = useSorted(history, (a, b) => b.timestamp - a.timestamp);

  const loadHistory = (pageId: string) => {
    return useFetch(`/api/pages/${pageId}/versions`).then((response) => {
      if (response.error.value) {
        throw createError(response.error.value);
      }

      history.value = response.data.value!.map(e => ({
        ...e,
        timestamp: new Date(e.timestamp).getTime(),
      }));
    });
  };

  const save = (pageId: string, item: BlockHistoryItem, page?: Page) => {
    if (history.value.length === 60) {
      // After 60 saves, remove the first item
      const newStorage = sorted.value.slice(0, sorted.value.length - 1);
      newStorage.push(item);
      history.value = newStorage;
    } else {
      history.value = [...history.value, item];
    }

    // Backend also remove the first inserted item if 60 items
    if (item.action === 'save' && page) {
      // If manual save, then update the page
      return useFetch(`/api/pages/${pageId}`, {
        method: 'PATCH',
        body: {
          name: page.name,
          slug: page.slug,
          blocks: item.blocks,
          history: {
            id: item.id,
            timestamp: item.timestamp,
            action: item.action,
          },
        },
      });
    } else {
      // otherwise, just add a new history entry
      return useFetch(`/api/pages/${pageId}/versions`, {
        method: 'POST',
        body: item,
      });
    }
  };

  return { history, sorted, save, loadHistory };
};
