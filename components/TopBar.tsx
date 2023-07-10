import { TopBarLinks } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BsFilterSquare } from "react-icons/bs";

const TopBar = () => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const clientDivRef = React.useRef<HTMLDivElement>(null);

  const handleLeft = () => {
    if (clientDivRef.current && divRef.current) {
      divRef.current.scrollLeft = 0;
    }
  };

  const handleRight = () => {
    if (clientDivRef.current && divRef.current) {
      const clientWidth = clientDivRef.current.offsetWidth;
      const divWidth = divRef.current.offsetWidth;
      if (clientWidth > divWidth) {
        const slideWidth = clientWidth - divWidth;
        divRef.current.scrollLeft = slideWidth;
      }
    }
  };

  return (
    <div className="flex gap-7 w-[95%] h-20  mx-auto items-center justify-between relative">
      <div className="w-[200px] justify-start">
        <div className="border w-[110px] rounded-lg p-2 flex gap-2 items-center cursor-pointer">
          Following <AiOutlineDown />
        </div>
      </div>
      <div
        className={`flex justify-center gap-2 w-full   absolute top-20 left-0 border-t-2 lg:static lg:border-none  overflow-x-auto`}
      >
        <button className="w-10 " onClick={handleLeft}>
          {"<"}
        </button>
        <div
          ref={divRef}
          className="flex justify-start items-center  overflow-x-hidden no-scrollbar scroll-smooth"
        >
          <div
            className={`flex-grow-0 justify-start origin-top-left `}
            ref={clientDivRef}
          >
            <div className="flex-grow-0 justify-start overflow-x-auto h-16 flex   items-center gap-7   my-5 py-5 lg:my-0 lg:py-0 ">
              {TopBarLinks.map((link) => (
                <Link
                  className="w-fit whitespace-nowrap hover:text-gray-800 cursor-pointer"
                  href={link.href}
                  key={link.key}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <button className="w-10 " onClick={handleRight}>
          {">"}
        </button>
      </div>
      <div className="w-[200px] flex justify-end">
        <div className="border w-[110px] rounded-lg p-2 flex gap-2 items-center justify-between cursor-pointer">
          Filters <BsFilterSquare />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
