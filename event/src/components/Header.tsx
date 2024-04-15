"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import icon from "@/app/icon.png";
import Image from "next/image";
import Hero from "./Hero";

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
    <header className="flex justify-between items-center w-full px-6 py-4 text-lg bg-gradient-to-r from-rose-200 to-pink-200">
    <div className="flex items-center gap-2 text-gray-700">
      <Link href="/" className="flex items-center gap-2">
        <Image src={icon} alt="logo" height={32} width={32} className="rounded-full" />
        <p className="">EventBytes</p>
      </Link>
    </div>
    <div className="">
    <Link className="text-gray-700 mr-2" href="/category">
  Category
</Link>
<Link className="text-gray-700 mr-2" href="/category">
  Pricing
</Link>
<Link className="text-gray-700" href="/category">
  About
</Link>
      </div>
    <div>
      {!isLogin || userData === null ? (
        <Link className="text-gray-700 bg-white rounded-full px-8 py-2 font-medium hover:font-semibold" href="/login">
          Login
        </Link>
      ) : (
        <>
          {userData.isSubscribed && (
            <Link className="text-gray-700" href="/host">
              Host
            </Link>
          )}
          <Link className="text-gray-700" href="/dashboard">
            Dashboard
          </Link>
          <Link className="text-gray-700" href={`/profile/${userData.username}`}>
            Profile
          </Link>
          <LogoutButton className="text-gray-700" />
        </>
      )}
    </div>
  </header>
  );
}
