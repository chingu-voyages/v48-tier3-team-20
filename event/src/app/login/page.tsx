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
    <form onSubmit={handleSubmit}>
      <Input type="email" name="email" id="email" required={true} />
      <Input type="password" name="password" id="password" required={true} />
      <button type="submit">Login</button>
    </form>
  );
}
