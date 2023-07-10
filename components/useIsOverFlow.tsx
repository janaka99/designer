"use client";
import React, { useLayoutEffect, useState } from "react";

const useIsOverFlow = (ref: any, callback: any | undefined) => {
  const [isOverFlow, setIsOverFlow] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const current = ref;

    const trigger = () => {
      const hasOverflow = current.scrollWidth > current.clientWidth;
      setIsOverFlow(hasOverflow);
      console.log(current.innerWidth, current.clientWidth);
      if (callback) callback(hasOverflow);
    };
    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverFlow;
};

export default useIsOverFlow;
