"use client";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const NewPost = (props: any) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [file, setFile] = useState<any>(null);
  const [tempImgUrl, setTempImgUrl] = useState<any>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [category, setCategory] = useState("selected");

  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState<any>(null);
  const [descriptionError, setDescriptionError] = useState("");

  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isupdating, setisupdating] = useState(false);

  const getProject = async () => {
    const res = await fetch(
      `/api/project/edit/project_id?id=${props.searchParams.id}`,
      {
        method: "GET",
      }
    );
    const newRes = await res.json();
    if (res.ok) {
      console.log(newRes);
      setProject(newRes);
      setTitle(newRes.title);
      setDescription(newRes.description);
      setWebsiteUrl(newRes.websiteUrl);
      setGithubUrl(newRes.githubUrl);
      setCategory(newRes.category);
      setTempImgUrl(newRes.imageUrl);
      setIsLoading(false);
    } else {
    }
  };

  const loadImage = (e: any | null) => {
    setFile(null);
    setTempImgUrl(null);
    var reader = new FileReader();
    reader.onloadend = function () {
      setTempImgUrl(reader.result);
    };
    setFile(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const emptyAllErrorStates = () => {
    setTitleError("");
    setDescriptionError("");
    setFileError("");
  };

  const handleProjectSubmit = async () => {
    setisupdating(true);
    emptyAllErrorStates();
    let err = false;
    if (title === "") {
      setTitleError("Title is required");
      err = true;
    }
    if (description === "") {
      setDescriptionError("Description is required");
      err = true;
    }

    if (err != true) {
      const data = {
        title: title,
        description: description,
        websiteUrl: websiteUrl,
        githubUrl: githubUrl,
        category: category,
        project_id: project._id,
      };
      console.log("asdasd cdata ", data);
      const form = new FormData();
      form.append("details", JSON.stringify(data));
      if (file !== null) {
        form.append("file", file);
      }

      const res = await fetch("/api/project/update", {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        const newRes = await res.json();
        alert("Successfully updated the project");
        setProject(newRes);
        setTitle(newRes.title);
        setDescription(newRes.description);
        setWebsiteUrl(newRes.websiteUrl);
        setGithubUrl(newRes.githubUrl);
        setCategory(newRes.category);
        setTempImgUrl(newRes.imageUrl);
        setisupdating(false);
      } else {
        alert("Something went wrong");
        setisupdating(false);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getProject();
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (project === null) {
    return <Loading />;
  }
  if (isLoading) return <Loading />;

  return (
    <div className="py-7 max-w-[1544px] w-[95%] mx-auto flex flex-col gap-10">
      <h1 className="text-4xl font-bold">Create a new Project</h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex gap-20 items-center">
            <label htmlFor="">Upload File</label>
            <label
              className="border rounded-md py-2 px-5 cursor-pointer"
              htmlFor="file"
            >
              Upload
            </label>
          </div>
          <div className="flex flex-col justify-center items-center border h-[200px] md:h-[350px] lg-h[400px] xl:[500px] ">
            <img
              className="w-full h-full object-contain"
              src={
                tempImgUrl === ""
                  ? "https://th.bing.com/th/id/OIP.ekbEDv9gYcFJ1sRCzq093wAAAA?pid=ImgDet&rs=1"
                  : tempImgUrl
              }
              width={1000}
              height={1000}
            />
          </div>
          <input
            className="hidden"
            type="file"
            id="file"
            onChange={(e) => {
              loadImage(e);
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="outline-none p-3 bg-gray-200 w-full rounded-md"
            type="text"
            id="title"
            defaultValue={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="description">Description</label>
          <textarea
            className="outline-none p-3 bg-gray-200 w-full rounded-md"
            id="description"
            defaultValue={description}
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="websiteurl">Website url</label>
          <input
            className="outline-none p-3 bg-gray-200 w-full rounded-md"
            type="text"
            id="websiteurl"
            defaultValue={websiteUrl}
            onChange={(e) => {
              setWebsiteUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <label htmlFor="github">Github</label>
          <input
            className="outline-none p-3 bg-gray-200 w-full rounded-md"
            type="text"
            id="github"
            defaultValue={githubUrl}
            onChange={(e) => {
              setGithubUrl(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-start w-fit gap-10">
          <div className="">
            Selected: <span className="text-[#f471a3]">{category}</span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="title">Categories</label>
            <select
              className="border p-2 w-fit"
              name="category"
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="sample">Sample</option>
              <option value="asdasdasd">asdasdasd</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-fit ">
          {isupdating ? (
            <button className="bg-[#ef93b6]  py-2 px-5 cursor-pointer rounded-md text-white">
              Updating...
            </button>
          ) : (
            <button
              className="bg-[#f471a3] hover:bg-[#d76893] py-2 px-5 cursor-pointer rounded-md text-white"
              onClick={handleProjectSubmit}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPost;
