import Input from "@/components/Input";
import React from "react";

const Register = () => {
  return (
    <section className="flex w-96 items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-gray-100">Register</h2>
        <form className="space-y-4">
          <Input
            htmlFor="username"
            labelClassName="mb-1 block text-gray-200"
            labelName="Username"
            type="text"
            name="username"
            id="username"
            className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required={true}
          />
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
          <Input
            htmlFor="confirmPassword"
            labelName="Confirm Password"
            labelClassName="mb-1 block text-gray-200"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
            required={true}
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
