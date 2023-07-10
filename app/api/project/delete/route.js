import Project from "@/models/project";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "../../../../middlewares";

export async function POST(req, next) {
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const { projectId } = await req.json();

      await Project.findByIdAndDelete({ _id: projectId });

      return new Response(
        { message: "Succesfully deleted your Project" },
        { status: 200 }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ message: "Something went wrong try again later" }),
        {
          status: 405,
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: "Something went wrong try again later" }),
      {
        status: 405,
      }
    );
  }
}
