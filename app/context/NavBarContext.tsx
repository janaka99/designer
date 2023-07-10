"use client";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

type IsMobileState = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

const IsMobileContext = createContext<IsMobileState | null>(null);

export const useIsMobileContext = (): IsMobileState => {
  const isMobileContext = useContext(IsMobileContext);

  if (!isMobileContext) {
    throw new Error("Please use ThemeProvider in parent component");
  }

  return isMobileContext;
};

export const IsMobileThemeProvider = (props: PropsWithChildren) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <IsMobileContext.Provider value={{ isMobile, setIsMobile }}>
      {props.children}
    </IsMobileContext.Provider>
  );
};

export default useIsMobileContext;
