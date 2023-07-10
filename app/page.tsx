"use client";
import TopBar from "@/components/TopBar";
import useIsMobileContext from "./context/NavBarContext";
import Cards from "@/components/Cards";

export default function Home() {
  const { isMobile } = useIsMobileContext();

  return (
    <main
      className={`flex flex-col w-full gap-7  justify-center         ${
        isMobile && "h-[calc(100vh-96px)] overflow-hidden "
      }`}
    >
      <TopBar />
      <Cards />
    </main>
  );
}
