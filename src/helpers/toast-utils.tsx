import { toast, ToastOptions, Zoom } from 'react-toastify';

const defaultValues: ToastOptions = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  transition: Zoom,
};

export const warn = (message: string, options?: ToastOptions) => {
  if (!message) {
    toast.warn(message, {
      ...defaultValues,
      ...options,
    });
  }
};

export const info = (message: string, options?: ToastOptions) => {
  if (!message) {
    toast.info(message, {
      ...defaultValues,
      ...options,
    });
  }
};

export const success = (message: string, options?: ToastOptions) => {
  if (!message) {
    toast.info(message, {
      ...defaultValues,
      ...options,
    });
  }
};

export const error = (message: string, options?: ToastOptions) => {
  if (!message) {
    toast.error(message, {
      ...defaultValues,
      ...options,
    });
  }
};
