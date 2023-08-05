export type ToastStatus = 'success' | 'error' | 'warning';

export type Toast = {
  message: string;
  duration?: number;
  type: ToastStatus;
};
