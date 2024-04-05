"use client";
import React from "react";
import { UserContext, UserData } from "@/context/UserContext";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const { userData, login, logout } = React.useContext(UserContext);

  React.useEffect(() => {
    const checkJwt = async () => {
      const res = await fetch("/api/users/");
      const { data, error } = await res.json();
      if (error || !data) {
        if (userData && userData.userId) logout();
      } else {
        if (!userData || !userData.userId) login(data);
      }
    };

    checkJwt();
  }, [login, logout, userData]);

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
            {userData.isSubscribed && (
              <Link className="text-sky-700" href="/host">
                Host
              </Link>
            )}
            <Link className="text-sky-700" href="/dashboard">
              Dashboard
            </Link>
            <Link className="text-sky-700" href="/profile">
              Profile
            </Link>
            <LogoutButton className="text-sky-700" />
          </>
        )}
      </nav>
    </header>
  );
}
