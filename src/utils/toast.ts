import toast from "react-hot-toast";

export const toastSuccess = (message: string) =>
  toast.success(message, {
    icon: "✅",
  });

export const toastError = (message: string) =>
  toast.error(message, {
    icon: "❌",
  });

export const toastLoading = (message: string) =>
  toast.loading(message);

export const toastDismiss = (id?: string) =>
  toast.dismiss(id);
