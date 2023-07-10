import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillDelete, AiFillEdit, AiFillHeart } from "react-icons/ai";

const CardInProfile = ({ project, getProjects }: any) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: any) => {
    setIsDeleting(true);
    if (window.confirm("Are you sure you want to delete this post")) {
      const data = {
        projectId: id,
      };
      const res = await fetch("/api/project/delete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Successfully deleted");
        getProjects();
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="relative cursor-pointer w-full aspect-[10/10] flex flex-col rounded-xl overflow-hidden">
      <img
        className="w-full h-full object-cover bg-gray-600 rounded-xl overflow-hidden"
        src={`${project.imageUrl}`}
        alt="image"
      />
      <div className="flex gap-7 mt-4 items-center h-16 ">
        <div className="text-base font-bold flex items-center gap-2">
          <Link href="/" className="w-[40px] h-[40px]">
            <img
              className="object-cover rounded-[50%] w-[35px] h-[35px]"
              src={`${project.creator.image}`}
              width={60}
              height={60}
              alt="profile"
            />
          </Link>
          <div className="">{project.title}</div>
        </div>
      </div>
      <div className="absolute top-[5px] right-0 w-full flex justify-end px-2 z-[1] gap-3">
        <a
          href={`/post/edit/${project.title}?id=${project._id}`}
          className=" p-2 rounded-full bg-[#191919] w-10 h-10t flex justify-center items-center hover:bg-[#ff9d00] hover:text-[#191919] text-[#ff9d00] duration-200"
        >
          <AiFillEdit className="" size={20} />
        </a>
        <a className=" p-2 rounded-full bg-[#191919]  w-10 h-10 flex justify-center items-center hover:bg-[#ff0000] hover:text-[#191919] text-[#ff0000] duration-200">
          <AiFillDelete size={20} onClick={() => handleDelete(project._id)} />
        </a>
      </div>
    </div>
  );
};

export default CardInProfile;
