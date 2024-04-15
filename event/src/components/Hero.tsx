"use client";
import { cn } from "@/lib/utils";
import React, { FormEvent } from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q");
    if (!q) {
      return;
    }
    router.push(`/search?q=${q}`);
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center gap-4 bg-gradient-to-r  from-rose-200 to-pink-200 py-12">
      <h1 className="text-center text-4xl font-extrabold text-[#544350] sm:text-3xl md:text-6xl">
        Find your <br /> favourite{" "}
        <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent ">
          event
        </span>
      </h1>
      <p className="my-4 text-center text-xl text-[#7A6774C2] sm:w-[50%]">
        Invite your best friends and make them happy! <br /> Create
        unforgettable memories with your favorite people!
      </p>
      <form className="relative mb-10 flex" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-full py-4 pl-8 pr-20 focus:outline-none text-[#544350] font-semibold"
          type="text"
          name="q"
          placeholder="enter a keyword"
        />
        <button
          type="submit"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "rounded-3xl bg-gradient-to-r from-red-500 to-blue-500 px-6 py-2 text-sm font-bold text-white hover:ring",
          )}
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default Hero;
