import { useEffect } from "react";
import { useAppSelector } from "./useRedux";
import { toastSuccess, toastError } from "../utils/toast";

export const useTodosToast = () => {
  const { loading, error } = useAppSelector((s) => s.todos);

  useEffect(() => {
    if (error) {
      toastError(error);
    }
  }, [error]);

  useEffect(() => {
    if (!loading && !error) {
      // bisa dipakai untuk auto success
    }
  }, [loading, error]);
};