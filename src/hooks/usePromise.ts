import type { BaseResponseType } from "@/types/common/base-response.type";
import { useState } from "react";
import { toast } from "sonner";

export function usePromise<T extends BaseResponseType>({
  initialLoading,
  promise,
  onSuccess,
  onSuccessAsync,
  onError,
  onErrorAsync,
  onFinally,
  onFinallyAsync,
}: {
  initialLoading?: boolean;
  promise: () => Promise<T>;
  onSuccess?: (_data: T) => void;
  onSuccessAsync?: (_data: T) => Promise<void>;
  onError?: (_error: Error) => void;
  onErrorAsync?: (_error: Error) => Promise<void>;
  onFinally?: () => void;
  onFinallyAsync?: () => Promise<void>;
}): {
  loading: boolean;
  runPromise: () => Promise<void>;
} {
  const [loading, setLoading] = useState(initialLoading || false);
  const runPromise = async () => {
    try {
      setLoading(true);
      const response = await promise();
      if (response.statusCode < 200 || response.statusCode >= 300) {
        throw new Error(response.message || "An error occurred");
      }
      onSuccess?.(response);
      await onSuccessAsync?.(response);
    } catch (error) {
      onError?.(error as Error);
      toast.error((error as Error).message || "An error occurred");
      await onErrorAsync?.(error as Error);
    } finally {
      setLoading(false);
      onFinally?.();
      await onFinallyAsync?.();
    }
  };

  if (typeof promise !== "function") {
    throw new Error("Promise must be a function");
  }

  return { loading, runPromise };
}
