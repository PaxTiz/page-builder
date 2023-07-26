import { Block } from "types";

export const usePreview = () => {
  const preview: Ref<Array<Block>> = useState("preview", () => []);

  const setBlocks = (blocks: Array<Block>) => {
    preview.value = blocks;
  };

  return { preview, setBlocks };
};
