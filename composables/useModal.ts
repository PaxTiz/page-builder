export const useModal = (key: string) => {
  const isActive = useState(key, () => false);

  const toggle = () => {
    isActive.value = !isActive.value;
  };

  return { isActive, toggle };
};
