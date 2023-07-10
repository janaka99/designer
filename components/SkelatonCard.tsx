import React from "react";
import { CgArrowTopRight } from "react-icons/cg";

type Props = {};

const SkelatonCard = ({}: Props) => {
  return (
    <div
      className="w-[100%] mx-auto bg-gray-600/5 aspect-[8/4] md:aspect-[8/5] lg:aspect-[8/6] rounded-sm overflow-hidden

    "
    >
      <div
        className="w-full h-full 
            bg-gradient-to-r from-transparent via-gray-200 to-transparent
            -translate-x-full animate-[shimmer_2s_infinite]
            oveflow-hidden
      "
      ></div>
    </div>
  );
};

export default SkelatonCard;
