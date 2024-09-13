import { connectToDatabase } from "@/app/utils/database";
import User from "@/models/user";

export async function POST(req: Request, res: Response) {
  console.log("checkEmail API fired");
  const { email } = (await req.json()) as {
    email: string;
  };

  try {
    await connectToDatabase();

    // const hashedPassword = await hash(password, 10);

    const existingUser = await User.find({
      email: email,
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          isValidUser: true,
          message: "User exists!",
        }),
        {
          status: 200,
        }
      );
    }

    throw new Error("User not found!");
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}
