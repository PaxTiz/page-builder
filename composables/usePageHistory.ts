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

  const save = (pageId: string, item: BlockHistoryItem) => {
    if (history.value.length === 60) {
      // After 60 saves, remove the first item
      const newStorage = sorted.value.slice(0, sorted.value.length - 1);
      newStorage.push(item);
      history.value = newStorage;
    } else {
      history.value = [...history.value, item];
    }

    // Backend also remove the latest inserted item if 60 items
    return useFetch(`/api/pages/${pageId}/versions`, {
      method: 'POST',
      body: item,
    });
  };

  return { history, sorted, save, loadHistory };
};
