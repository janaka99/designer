import Project from "@/models/project";
import { connectToDB } from "@/utils/database";
import { IsLoggedIn } from "../../../../../middlewares";
import User from "@/models/user";

export async function GET(req, res) {
  try {
    connectToDB();
    const email = req.nextUrl.searchParams.get("email");
    console.log(email);
    const user = await User.findOne({ email: email });
    if (!user) {
    }
    const projects = await Project.find({
      creator: user._id,
    }).populate({
      path: "creator",
    });

    return new Response(JSON.stringify({ user, projects }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ message: "Something went wrong " }), {
      status: 500,
    });
  }
}
