import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillHeart } from "react-icons/ai";

const Card = ({ project }: any) => {
  return (
    <div className="w-full aspect-[10/10] flex flex-col rounded-xl overflow-hidden border-[1px]  shadow-2xl">
      <a
        href={`/post/view/${project.title}?id=${project._id}`}
        className="w-full h-full overflow-hidden rounded-t-xl "
      >
        <img
          className="w-full h-full object-cover bg-gray-600 hover:scale-[1.025] duration-150"
          src={`${project.imageUrl}`}
          alt="image"
        />
      </a>
      <div className="flex gap-7 mt-1 items-center h-16 p-2">
        <div className="text-base font-bold flex items-center gap-2">
          <a
            href={`/user/${project.creator.username}?email=${project.creator.email}`}
            className="w-[40px] h-[40px]"
          >
            <img
              className="object-cover rounded-[50%] w-[35px] h-[35px]"
              src={`${project.creator.image}`}
              width={60}
              height={60}
              alt="profile"
            />
          </a>
          <a
            href={`/post/view/${project.title}?id=${project._id}`}
            className="cursor-pointer text-base font-medium  "
          >
            {project.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
