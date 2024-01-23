import { useCallback, useEffect, useState } from "react";

export const useRequestTrigger = <D, P>(
  request: (props: P) => Promise<D>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<D | null>(null);

  const run = useCallback((props: P) => {
    setIsLoading(true);
    return request(props)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [request,]);

  return {
    run,
    isLoading,
    error,
    data,
  };
};

export const useRequest = <D, P>(request: (props: P) => Promise<D>, props: P) => {
  const { run, ...rest } = useRequestTrigger(request);
  useEffect(() => {
    run(props);
  }, [run, props]);

  return {run, ...rest};
};
