"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { userData } = React.useContext(UserContext);

  return (
    <header className="flex w-full justify-between bg-sky-100 px-6 py-4">
      <Link href="/" className="text-sky-700">
        LOGO
      </Link>
      <nav className="flex gap-4">
        <Link className="text-sky-700" href="/category">
          Category
        </Link>
        {userData === null ? (
          <>
            <Link className="text-sky-700" href="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link className="text-sky-700" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sky-700" href="/profile">
              {userData.username}
            </Link>
            <LogoutButton className="text-sky-700" />
          </>
        )}
      </nav>
    </header>
  );
}
