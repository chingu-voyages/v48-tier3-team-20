import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";

const Register = () => {
  return (
    <section className="flex w-96 items-center justify-center">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-gray-100">Register</h2>
        <form className="space-y-4">
          <Input type="text" name="username" id="username" required={true} />
          <Input type="text" name="email" id="email" required={true} />
          <Input type="password" name="password" id="password" required={true} />
          <Input type="password" name="confirm" id="confirm" required={true} />
         <Button type="submit" title="Submit"  />
        </form>
      </div>
    </section>
  );
};

export default Register;
