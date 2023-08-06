export type ToastStatus = 'success' | 'error' | 'warning' | 'spin';

export type Toast = {
  message: string;
  duration?: number;
  type: ToastStatus;
};
