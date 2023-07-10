import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-screen h-[calc(100vh-192px)] flex justify-center items-center">
      <img src="/rolling.svg" alt="" />
    </div>
  );
};

export default Loading;
