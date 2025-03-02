import dbConnection from "@/lib/db";
import { UserModel } from "@/models/User";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { userSchema } from "@/schema/UserValidate";

export async function POST(req: NextRequest) {
  try {
    await dbConnection();
    const { email, password, confirmPassword } = await req.json();

    // if (!email || !password) {
    //   return NextResponse.json(
    //     { error: "All fields are required" },
    //     { status: 400 }
    //   );
    // }

    const validate = userSchema.safeParse({ email, password, confirmPassword });
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 400 });
    }

    if (password != confirmPassword) {
      return NextResponse.json(
        {error: "Password don't match"},
        {status: 400 }
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    const token = jsonwebtoken.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "User registered successfully", token },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
