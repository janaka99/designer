"use client";
import Loading from "@/components/Loading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const NewPost = () => {
  const router = useRouter();

  const [file, setFile] = useState<any>(null);
  const { data: session, status } = useSession();
  const [tempImgUrl, setTempImgUrl] = useState<any>("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [category, setCategory] = useState("selected");

  const [pageLoading, setPageLoading] = useState(true);

  const [titleError, setTitleError] = useState("");
  const [fileError, setFileError] = useState<any>(null);
  const [descriptionError, setDescriptionError] = useState("");

  const [isCreatingNewProject, setisCreatingNewProject] = useState(false);

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
    setisCreatingNewProject(true);
    emptyAllErrorStates();
    console.log("asdasd clicked");
    let err = false;
    if (title === "") {
      setTitleError("Title is required");
      err = true;
      console.log("asdasd clicked 2");
    }
    if (description === "") {
      setDescriptionError("Description is required");
      err = true;
      console.log("asdasd clicked 3");
    }
    if (file === null) {
      setFileError("File is required");
      console.log("asdasd clicked 4");
      err = true;
    }
    if (err != true) {
      const data = {
        title: title,
        description: description,
        websiteUrl: websiteUrl,
        githubUrl: githubUrl,
        category: category,
      };
      console.log("asdasd cdata ", data);
      const form = new FormData();
      form.append("details", JSON.stringify(data));
      form.append("file", file);

      const res = await fetch("/api/project/new", {
        method: "POST",
        body: form,
      });
      if (res.ok) {
        router.push("/");
      } else {
        alert("Something went wrong");
        setisCreatingNewProject(false);
      }
    }
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/`);
    }
    if (status === "authenticated") {
      setPageLoading(false);
    }
  }, [status]);

  return (
    <>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className="py-7 max-w-[1280px] w-[90%] mx-auto flex flex-col gap-10">
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
                placeholder="Designer"
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
                placeholder="This was created using..."
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
                placeholder="https://example.com"
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
                placeholder="github/project"
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col w-fit gap-2">
              <label htmlFor="title">Categories</label>
              <select
                className="border p-2 w-fit"
                name="category"
                id="category"
                defaultValue={"Web Development"}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="Web Development">Web Development</option>
                <option value="Animation">Animation</option>
                <option value="Branding">Branding</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
            <div className="flex flex-col w-fit ">
              {isCreatingNewProject ? (
                <button className="bg-[#d37c9d]  py-2 px-5 cursor-pointer rounded-md text-white">
                  Creating...
                </button>
              ) : (
                <button
                  className="bg-[#f471a3] hover:bg-[#d76893] py-2 px-5 cursor-pointer rounded-md text-white"
                  onClick={handleProjectSubmit}
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPost;
