"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function LogoutButton({
  className = "",
}: {
  className?: string;
}) {
  const { logout } = React.useContext(UserContext);
  const router = useRouter();

  const logoutUser = async () => {
    // delete cookie -> delete data in UserContext -> redirect to /login
    await fetch("/api/users/logout");
    logout();
    router.push("/login");
  };

  return (
    <button className={className} onClick={logoutUser}>
      Logout
    </button>
  );
}
