"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { sleep } from "@/lib/utils";

const Register = () => {
  const [message, setMessage] = React.useState("");

  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullname = formData.get("fullname");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm");

    if (!fullname || !username || !email || !password || !confirmPassword) {
      setMessage("Please enter all fields.");
      return;
    }

    if ((username as string).length < 3) {
      setMessage("Username: Min 3 letters long");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        setMessage("Successfully registered!");
        await sleep(2000);
        router.push("/login");
      } else {
        const errorData = await response.json();
        console.log(errorData);
        setMessage(errorData.error);
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <section className="register-form flex w-full max-w-md items-center justify-center">
      <div className="form-container relative w-full rounded-lg bg-gray-100 p-8 shadow-md">
        {message && (
          <p className="absolute -top-2 text-lg font-bold text-red-500">
            {message}
          </p>
        )}
        <h2 className="mb-6 text-3xl font-semibold text-gray-800">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="fullname" id="fullname" text="Full Name" />
          <Input name="username" id="username" />
          <Input type="email" name="email" id="email" />
          <Input type="password" name="password" id="password" />
          <Input
            type="password"
            name="confirm"
            id="confirm"
            text="Confirm Password"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
        <Link href="/login" className="mt-4 block text-blue-600 underline">
          Already have an account? Login here.
        </Link>
      </div>
    </section>
  );
};

export default Register;
