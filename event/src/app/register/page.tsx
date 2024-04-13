"use client"
import Button from "@/components/Button";
import Input from "@/components/Input";
import React, { FormEvent } from "react";
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';


const Register = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullname = formData.get("fullname");
    const username = formData.get("username");    
    const email = formData.get("email");
    const password = formData.get("password")
    const confirmPassword = formData.get("confirm")    

    if (!fullname || !username || !email || !password || !confirmPassword) {
      console.error("Please enter all fields.");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
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
        router.push("/profile");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <section className="register-form flex w-96 items-center justify-center">
      <div className="form-container w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="fullname" name="fullname" id="fullname" required={true} />
          <Input type="username" name="username" id="username" required={true} />
          <Input type="email" name="email" id="email" required={true} />
          <Input type="password" name="password" id="password" required={true}/>
          <Input type="password" name="confirm" id="confirm" required={true} />
          <button type="submit">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;