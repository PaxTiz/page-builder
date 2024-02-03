import type { Block } from '~/types';

export const useSidebar = () => {
  const element: Ref<Block | null> = useState(
    'sidebar_current_block',
    () => null,
  );

  const setElement = (block: Block | null) => {
    element.value = block;
  };

  return { element, setElement };
};
