"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { UserContext, UserData } from "@/context/UserContext";
import Input from "@/components/Input";
import { useSearchParams } from "next/navigation";

// add data to UserContext to keep login state on FE
// delete UserContext on logout

export default function LoginPage() {
  const [message, setMessage] = React.useState("");
  const router = useRouter();
  const { login } = React.useContext(UserContext);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

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
      const msg = await response.json();
      setMessage(msg.message);
      return;
    }

    const { user }: { user: UserData } = await response.json();

    login(user);
    redirect ? router.push(redirect) : router.push("/dashboard");
  }

  return (
    <section className="flex w-96 items-center justify-center">
      <div className="relative w-full max-w-md rounded-lg bg-gray-100 p-8 shadow-md dark:bg-gray-800">
        {message && (
          <p className="absolute -top-2 text-lg font-bold text-red-500">
            {message}
          </p>
        )}
        <h2 className="mb-6 text-3xl font-semibold text-gray-900">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="email" name="email" id="email" required={true} />
          <Input
            type="password"
            name="password"
            id="password"
            required={true}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
