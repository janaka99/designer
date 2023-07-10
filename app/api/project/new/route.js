import Project from "@/models/project";
import { storage } from "@/utils/firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL, deleteObject } from "firebase/storage";
import { IsLoggedIn } from "../../../../middlewares";

export async function POST(req, next) {
  //check the if the user is logged and has authority to add new project
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      //get all the data from request body
      const data = await req.formData();

      //extract project details
      const [detailskey, detailsValue] = Array.from(data.entries())[0];

      //extract project image file
      const [fileskey, filesValue] = Array.from(data.entries())[1];

      //check the uploded image file is in valid format
      const isFile = typeof filesValue === "object";

      //check if there is a product image
      if (isFile) {
        //buffer the product image
        const buffer = Buffer.from(await filesValue.arrayBuffer());

        //generate unique name for product image
        var crypto = require("crypto");
        var vcode = crypto.randomBytes(20).toString("hex");

        //set firebase storage reference to save the product image
        const storageRef = ref(storage, `files/${vcode}.png`);

        //save product image to firebase storage
        const snapshot = await uploadBytesResumable(storageRef, buffer);

        //check wether product image was successfully uploaded
        if (snapshot.state === "success") {
          //if yes get the image url to save in database
          const imageURL = await getDownloadURL(snapshot.ref);
          4;

          //get the image path to save in database
          const imagePath = snapshot.ref.fullPath;

          //get project details to readable format
          const projectDetails = JSON.parse(detailsValue);

          //validate project details
          const project = validateProject(projectDetails);

          //check if validation fails
          if (project === false) {
            //if validation fails, then delete the uploaded project image
            await deleteObject(storageRef);
            //return error response
            return new Response("Something went wrong try again later", {
              status: 400,
            });
          }
          //if validation succeeds, then create new product object
          const newPost = new Project({
            title: projectDetails.title,
            description: projectDetails.description,
            websiteUrl: projectDetails.websiteUrl,
            githubUrl: projectDetails.githubUrl,
            category: projectDetails.category,
            imageUrl: imageURL,
            imagePath: imagePath,
            creator: loggedUser._id,
          });

          //save new product
          const pp = await newPost.save();

          if (pp) {
            //return success response
            return new Response(JSON.stringify(pp), {
              status: 200,
            });
          }
          //if catch any errors  while saving product, then delete the uploaded image
          await deleteObject(storageRef);
          //return error response
          return new Response(
            JSON.stringify({
              message: "Something went wrong try again later",
            }),
            {
              status: 401,
            }
          );
        } else {
          // return error response if catch any errors
          return new Response(
            JSON.stringify({ status: "Image upload failed " }),
            { status: 402 }
          );
        }
      }
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 403,
      });
    } catch (error) {
      console.log(error);
      // return error response if catch any errors
      return new Response("Something went wrong try again later", {
        status: 404,
      });
    }
  } else {
    //if logged user has no authority to add new product return error response
    return new Response(
      JSON.stringify({ message: "Something went wrong try again later" }),
      {
        status: 405,
      }
    );
  }
}

const validateProject = (project) => {
  let error = false;
  if (project.title === "") {
    error = true;
  }
  if (project.description === "") {
    error = true;
  }
  if (project.category === "") {
    error = true;
  }
  if (error) {
    return false;
  }
  return project;
};
