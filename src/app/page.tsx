"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const Home = () => {
  const [longUrl, setLongUrl] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/shorturl", {
        longUrl,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex flex-col items-center mt-20">
        <h2>Url Shortener</h2>
        <div className="w-1/2">
          <form
            onSubmit={handleSubmit}
            className="flex justify-between border rounded-sm overflow-hidden transition-colors focus-within:border-orange-400"
          >
            <input
              type="url"
              name=""
              id="longurl"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
              className="w-[75%] flex-1 outline-none px-4 py-4"
            />
            <button
              type="submit"
              className="w-[25%] bg-orange-300 hover:bg-orange-400 px-8 rounded-r-[1px]"
            >
              Short URL 🔗
            </button>
          </form>
        </div>
        <Link href="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Home;
