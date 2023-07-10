import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { IsLoggedIn } from "../../../../../middlewares";

export async function GET(req, res) {
  const loggedUser = await IsLoggedIn(req);

  if (loggedUser !== false) {
    try {
      connectToDB();
      const id = req.nextUrl.searchParams.get("id");
      const project = await Project.findOne({ _id: id }).populate({
        path: "creator",
      });
      if (project) {
        return new Response(JSON.stringify(project), {
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
    } catch (error) {
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
