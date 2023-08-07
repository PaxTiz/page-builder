export const useModal = (key: string) => {
  const isActive = useState(key, () => false);

  const body: Ref<HTMLBodyElement | null> = ref(null);
  const isBodyLocked = useScrollLock(body);

  onMounted(() => {
    body.value = document.querySelector('body');
  });

  const toggle = () => {
    isActive.value = !isActive.value;
    isBodyLocked.value = isActive.value;
  };

  return { isActive, toggle };
};
