import Project from "@/models/project";
import { connectToDB } from "@/utils/database";

export async function GET(req, res) {
  try {
    connectToDB();
    const projects = await Project.find().populate({
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
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
