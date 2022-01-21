import { useMountedRef } from "hooks";
import { useCallback, useReducer, useState } from "react";

// 定义接口的时候可以接收泛型
interface State<D> {
  error: null | Error;
  data: D | null;
  state: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  state: "idle",
  data: null,
  error: null,
};

const defaultInitConfig = {
  throwOnError: false,
};

// 重新包装一层dispathc，使得dispatch更安全
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultInitConfig
) => {
  const config = { ...defaultInitConfig, ...initialConfig };
  const [state, dispatch] = useReducer(
    (preState: State<D>, action: Partial<State<D>>) => ({
      ...preState,
      ...action,
    }),
    { ...defaultInitialState, ...initialState }
  );

  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        state: "success",
        data,
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        state: "error",
        data: null,
      }),
    [safeDispatch]
  );

  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入 promise 类型数组");
      }
      safeDispatch({ state: "loading" });

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          // catch 会消化异常导致不再抛出
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    isSuccess: state.state === "success",
    retry,
    run,
    setData,
    setError,
    ...state,
  };
};
