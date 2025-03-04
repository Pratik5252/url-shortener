import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const handleLogin = () => {
    redirect("/signup");
  };
  return (
    <div className="w-full p-4 flex justify-between items-center border-b-[1px]">
      <div>URlShort</div>
      <div>
        {isAuthenticated ? (
          <button
            className=" bg-orange-300 py-2 px-6 hover:bg-orange-400 rounded-sm"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <button
            className=" bg-orange-300 py-2 px-6 hover:bg-orange-400 rounded-sm"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
