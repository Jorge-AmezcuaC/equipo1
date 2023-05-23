import { useState, useCallback } from "react";

const useRefresh = (fn) => {
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      fn();
    });
  });

  return [refreshing, onRefresh];
};

export default useRefresh;
