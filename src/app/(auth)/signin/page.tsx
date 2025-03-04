"use client";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const Signup = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, isAuthenticated } = useAuth();

  //Takes care of redirecting user to home page if they are already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  //Handles form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signin", {
        email,
        password,
      });
      login(res.data.token);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full ">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="w-96 bg-white p-4 rounded-lg shadow-lg border">
          <form onSubmit={handleSubmit} className="flex flex-col py-4 gap-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-base font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 outline-none focus:border-b-[1px] mb-2 border-[1px] border-gray-300"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-base font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 outline-none focus:border-b-[1px] mb-2 border-[1px] border-gray-300"
              />
            </div>
            
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 w-fit p-2 px-8 rounded-md font-semibold text-sm mt-4"
            >
              Sign In
            </button>

            <p>
              Don't have an account? <Link href="/signup">Signup</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
