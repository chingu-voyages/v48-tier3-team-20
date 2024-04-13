"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userData, login, logout } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    const checkJwt = async () => {
      try {
        const res = await fetch("/api/users/check-login");
        const { data, error } = await res.json();
        if (error || !data) {
          if (userData && userData.userId) logout();
          throw new Error(error);
        }
        if (!userData || !userData.userId) login(data);
      } catch (error) {
        const err = error as Error;
        console.log("error caught in header:", err);
        router.push(window.location.pathname + window.location.search);
        // router.refresh();
      }
    };

    checkJwt();
  }, [login, logout, router, userData]);

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
            <Link
              className="text-sky-700"
              href={`/profile/${userData.username}`}
            >
              Profile
            </Link>
            <LogoutButton className="text-sky-700" />
          </>
        )}
      </nav>
    </header>
  );
}
