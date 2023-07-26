import { BlockHistory, BlockHistoryItem } from "~/types";

export const usePageHistory = () => {
  const history: Ref<BlockHistory> = useSessionStorage("blocks_history", []);

  const sorted = useSorted(history, (a, b) => b.timestamp - a.timestamp);

  const save = (item: BlockHistoryItem) => {
    if (history.value.length === 60) {
      // After 60 saves, remove the first item
      const newStorage = sorted.value.slice(0, sorted.value.length - 1);
      newStorage.push(item);
      history.value = newStorage;
    } else {
      history.value = [...history.value, item];
    }
  };

  return { history, sorted, save };
};
