import { useCallback, useEffect, useState } from "react";

import throttle from "lodash/throttle";

export default function useWindowSize() {
  const [height, setHeight] = useState(() => window.innerHeight);

  const callback = useCallback(
    throttle(
      () => {
        setHeight(window.innerHeight);
      },
      80,
      {
        trailing: true,
      }
    ),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", callback);
    window.addEventListener("deviceorientation", callback);
    return () => {
      window.removeEventListener("resize", callback);
      window.removeEventListener("deviceorientation", callback);
    };
  }, [callback]);
  return height;
}
