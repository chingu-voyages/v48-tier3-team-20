"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { UserContext, UserData } from "@/context/UserContext";

// add data to UserContext to keep login state on FE
// delete UserContext on logout

export default function LoginPage() {
  const router = useRouter();
  const { login } = React.useContext(UserContext);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      console.log("login page, response not ok");
      return;
    }

    const { user }: { user: UserData } = await response.json();
    console.log("data", user);

    login(user);

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
