"use client";
import Loading from "@/components/Loading";
import React, { useEffect, useState } from "react";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";

const page = (props: any) => {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(props.searchParams);
  const getProject = async () => {
    setIsLoading(true);
    const res = await fetch(
      `/api/project/view/project_id?id=${props.searchParams.id}`,
      {
        method: "GET",
      }
    );
    const newRes = await res.json();
    if (res.ok) {
      console.log(newRes);
      setProject(newRes);
      setIsLoading(false);
    } else {
    }
  };

  useEffect(() => {
    getProject();
  }, []);
  if (project === null) {
    return <Loading />;
  }
  if (isLoading) return <Loading />;
  return (
    <div className="max-w-[1580px] w-[95%] mx-auto py-10 flex flex-col gap-10">
      <div className="text-center text-3xl text-bold">{project.title}</div>
      <div className="flex justify-center">
        <img src={`${project.imageUrl}`} alt="" className="" />
      </div>
      <div className="text-[20px]">
        Category:{" "}
        <span className="text-[#ED54A7] font-bold">{project.category}</span>
      </div>
      <div className="text-[20px] font-[400] ">{project.description}</div>
      <div className="flex justify-center gap-20">
        <a
          href={`${project.githubUrl}`}
          className="text-5xl cursor-pointer hover:scale-[1.1] duration-200"
        >
          <AiFillGithub />{" "}
        </a>
        <a
          href={`${project.websiteUrl}`}
          className="text-5xl cursor-pointer hover:scale-[1.1] duration-200"
        >
          <AiOutlineLink />{" "}
        </a>
      </div>
    </div>
  );
};

export default page;
