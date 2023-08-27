import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-32 md:h-24 px-4 bg-[#191919] flex justify-around mt-auto flex-col md:flex-row  ">
      <div className=" text-center mx-auto py-5 md:py-10  font-bold text-[#8d8d8d] text-sm uppercase tracking-[5px]">
        Designed And Developed By &nbsp;
        <Link className="underline" href="https://janaka99.netlify.app">
          Janaka
        </Link>
      </div>
      {/* <div className=" text-center mx-auto pb-5 md:pb-0 md:py-10  font-bold text-[#808080] text-sm uppercase tracking-[2px]">
        Design Inspired by &nbsp;
        <Link className="underline" href="https://dribbble.com/">
          Dribbble
        </Link>
      </div> */}
    </footer>
  );
};

export default Footer;
