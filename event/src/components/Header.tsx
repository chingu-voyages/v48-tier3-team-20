"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export default function Header() {
  const { userData } = React.useContext(UserContext);

  // use userData to conditionally render login/logout buttons
  console.log(userData);

  return (
    <header className="flex w-full justify-between bg-sky-100 px-6 py-4">
      <Link href="/" className="text-sky-700">
        LOGO
      </Link>
      <nav className="flex gap-4">
        <Link className="text-sky-700" href="/category">
          Category
        </Link>
        <Link className="text-sky-700" href="/login">
          Login
        </Link>
        <Link className="text-sky-700" href="/api/users/logout">
          Logout
        </Link>
        <Link className="text-sky-700" href="/profile">
          Profile
        </Link>
      </nav>
    </header>
  );
}
