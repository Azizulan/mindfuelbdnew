"use client";

import { useAuth } from "@/hooks/auth.hooks";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCaretDown, FaUser } from "react-icons/fa";

const UserMenu = () => {
  const [showUser, setShowUser] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  console.log(isAuthenticated);

  const handleLogout = () => {
    logout();
    setShowUser(false);
    router.push("/");
  };

  return (
    <div className="relative">
      <div
        onClick={() => setShowUser(!showUser)}
        className="flex cursor-pointer"
      >
        <FaUser />
        <FaCaretDown />
      </div>
      {showUser && (
        <motion.ul
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute top-6 left-0 z-50 bg-primeColor w-44 text-[#767676] h-auto p-4 pb-6"
        >
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Profile
                </li>
              </Link>
              <li
                onClick={handleLogout}
                className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer"
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <Link href="/signin">
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Login
                </li>
              </Link>
              <Link href="/signup">
                <li className="text-gray-400 px-4 py-1 border-b-[1px] border-b-gray-400 hover:border-b-white hover:text-white duration-300 cursor-pointer">
                  Sign Up
                </li>
              </Link>
            </>
          )}
        </motion.ul>
      )}
    </div>
  );
};

export default UserMenu;

