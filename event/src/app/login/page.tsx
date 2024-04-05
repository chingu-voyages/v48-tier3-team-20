"use client";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function LoginPage() {
  const router = useRouter();

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

    if (response.ok) {
      router.push("/about");
    } else {
      // Handle errors
    }
    const data = await response.json();
    console.log("data", data);
  }

  return (
    <section className="flex w-96 items-center justify-center">
      <div className="bg- w-full max-w-md rounded-lg p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-semibold text-gray-100">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
         
         <Input 
            htmlFor="email"
            labelClassName="mb-1 block text-gray-200"
            labelName="Email"
            type="email"
            name="email"
            id="email"
            className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required={true}
         />
    
          <Input
            htmlFor="password"
            labelClassName="mb-1 block text-gray-200"
            labelName="Password"
            type="password"
            name="password"
            id="password"
            className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
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
