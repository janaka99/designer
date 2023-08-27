"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import SkelatonCard from "@/components/SkelatonCard";
import Card from "@/components/Card";
import CardInProfile from "@/components/CardInProfile";

const page = (props: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(status);
  const [projects, setprojects] = useState([]);
  const [postsLoading, setpostsLoading] = useState(true);

  const getProjects = async () => {
    setpostsLoading(true);
    const res = await fetch(
      `/api/project/my/getId?email:${props.searchParams.email}`,
      {
        method: "GET",
      }
    );
    const newRes = await res.json();

    if (res.ok) {
      console.log(newRes);
      setprojects(newRes);
      setpostsLoading(false);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      getProjects();
    }
    if (status === "unauthenticated") {
      router.push(`/`);
    }
  }, [status]);

  if (postsLoading) {
    return <Loading />;
  }
  return (
    <div className="py-10 max-w-[1280px] w-[90%] mx-auto flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <img
          className="w-24 h-24 object-cover rounded-[50%]"
          src={`${session?.user?.image}`}
          alt=""
        />
        <div className="text-7xl text-center">{session?.user?.name}</div>
        <div className="text-2xl text-center">{session?.user?.email}</div>
      </div>
      <div className="self-start text-4xl">Projects</div>
      <div className="max-w-[1580px] w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-7 lg:grid-cols-3 xl:grid-cols-4 ">
        {projects.length === 0 ? (
          <>
            <SkelatonCard key={1} />
            <SkelatonCard key={2} />
            <SkelatonCard key={3} />
            <SkelatonCard key={4} />
            <SkelatonCard key={5} />
            <SkelatonCard key={6} />
          </>
        ) : (
          projects.map((project: any) => (
            <CardInProfile
              key={project._id}
              project={project}
              getProjects={getProjects}
            />
          ))
        )}
      </div>
    </div>
  );
  // }
};

export default page;
