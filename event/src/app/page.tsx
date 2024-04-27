import Hero from "@/components/Hero";
import React, { Suspense } from "react";
import TeamMembers from "@/components/TeamMembers";
import HomePageEvents from "@/components/HomePageEvents";
import LoadingPage from "./loading";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <main className="h-full w-full text-lg">
        <Hero />
      <Suspense fallback={<LoadingPage loading={true} />}> 
          <HomePageEvents />
      </Suspense>
      <TeamMembers />
      </main>
    </>
  );
}
