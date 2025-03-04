import dbConnection from "@/lib/db";
import { UserModel } from "@/models/User";
import { signinSchema } from "@/schema/UserValidate";
import { NextRequest, NextResponse } from "next/server";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await dbConnection();
    const { email, password } = await req.json();

    const validate = signinSchema.safeParse({ email, password });
    if (!validate.success) {
      return NextResponse.json(
        {
          error: validate.error,
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        { status: 400 }
      );
    }

    // Check if password is correct
    const match = bycrypt.compare(password, existingUser.password);
    if (!match) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
        },
        { status: 400 }
      );
    }

    console.log(existingUser);

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET || "",
      { expiresIn: "1h" }
    );

    return NextResponse.json({
      message: "User logged in successfully",
      token,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong" + error,
      },
      { status: 500 }
    );
  }
}
