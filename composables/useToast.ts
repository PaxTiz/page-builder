import type { Toast } from '~/types';

export const useToast = () => {
  const _toast: Ref<Toast | null> = useState('toast', () => null);
  let timer: NodeJS.Timeout | null = null;

  const set = (toast: Toast) => {
    _toast.value = toast;
    if (timer) {
      clearTimeout(timer);
    }

    if (toast.type !== 'spin') {
      timer = setTimeout(() => {
        _toast.value = null;
        clearTimeout(timer!);
      }, toast.duration ?? 1000);
    }
  };

  return { toast: _toast, set };
};
