import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { IsLoggedIn } from "../../../../../middlewares";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      connectToDB();
      const projects = await Project.find({
        creator: loggedUser._id,
      }).populate({
        path: "creator",
      });
      if (projects) {
        return new Response(JSON.stringify(projects), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ message: "Something went wrong " }),
          {
            status: 500,
          }
        );
      }
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ message: "Something went wrong " }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
