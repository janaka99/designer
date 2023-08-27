import React from "react";

const Banner = () => {
  return (
    <div className="max-w-[1280px] w-[90%] sm:h-[calc(100vh-80px)] items-center justify-center mx-auto py-12 text-center flex ">
      <div className="flex flex-col gap-12 flex-[2]">
        <div className="z-[111]">
          <div className="">Share - Inspire - Create</div>
          <div className="text-center  text-6xl sm:text-9xl font-bold ">
            Unleash Your <br /> Creativity
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          {/* <div className="">Inspire</div> */}
          {/* <div className="">Create</div> */}
        </div>
        <div className="max-w-[450px] mx-auto">
          Ignite Your Creative Spark, Connect through Designs, and Inspire
          Boundless Imagination
        </div>
        <button className="btn-1 mx-auto">Craft, Shape, Innovate</button>
      </div>
      {/* <div className="banner-img w-[50%] h-[80%] flex-[1] overflow-hidden"></div> */}
    </div>
  );
};

export default Banner;
