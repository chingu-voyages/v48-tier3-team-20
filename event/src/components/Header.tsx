"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";


export default function Header() {
  const [isLogin, setIsLogin] = React.useState(false);
  const { userData, login, logout } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    const checkJwt = async () => {
      try {
        const res = await fetch("/api/users/check-login");
        const { data, error } = await res.json();
        if (error || !data) {
          if (userData && userData.userId) {
            logout();
          }
          setIsLogin(false);
          return;
        }
        if (!userData || !userData.userId) {
          login(data);
        }
        setIsLogin(true);
      } catch (error) {
        const err = error as Error;
        console.log("error caught in header:", err);
        router.refresh();
      }
    };
    checkJwt();
  });

  return (
    <header className="flex w-full items-center justify-between bg-gradient-to-r from-rose-100 to-pink-200 px-6 py-4 text-lg"> 
      <div className="flex items-center gap-2 text-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <p className="text-xl font-semibold">Event<span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent ">Bytes</span></p>
        </Link>
      </div>
      <nav className="flex items-center">
        {!isLogin || userData === null ? (
          <Link
            className="rounded-full bg-white px-8 py-2 text-[#544350] font-semibold"
            href="/login"
          >
            Login
          </Link>
        ) : (
          <>
            {userData.isSubscribed && (
              <Link className="text-gray-700" href="/host">
                Host
              </Link>
            )}
            <Link className="text-gray-700 mx-3" href="/dashboard">
              Dashboard
            </Link>
            <Link
              className="text-gray-700"
              href={`/profile/${userData.username}`}
            >
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-user-circle mr-3"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
            </Link>
            <LogoutButton className="rounded-full text-[#544350] font-semibold bg-white px-8 py-2 hover:font-semibold" />
          </>
        )}
      </nav>
    </header>
  );
}
