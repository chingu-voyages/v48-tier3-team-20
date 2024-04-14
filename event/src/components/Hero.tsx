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
    router.push(`/search?q=${q}`);
  };

  return (
    <div className="mb-10 flex w-full flex-col items-center gap-4 pt-12">
      <h1 className="text-4xl font-extrabold text-black sm:text-3xl md:text-5xl">
        Find your favourite event
      </h1>
      <p className="my-4 text-xl">
        Invite your best friends and make them happy
      </p>
      <form className="relative mb-10 flex" onSubmit={handleSubmit}>
        <input
          className="w-80 rounded-lg py-2 pl-8 pr-16"
          type="text"
          name="q"
          placeholder="enter keyword or location"
        />
        <button
          type="submit"
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "rounded-3xl bg-slate-200 px-2 py-1 text-sm hover:ring",
          )}
        >
          GO
        </button>
      </form>
    </div>
  );
};

export default Hero;
