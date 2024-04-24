import Hero from "@/components/Hero";
import React, { Suspense } from "react";
import TeamMembers from "@/components/TeamMembers";
import Events from "@/components/Events";
import LoadingPage from "./loading";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <main className="h-full w-full text-lg">
        <Hero />
      </main>
      <Suspense fallback={<LoadingPage loading={true} />}> 
          <Events />
      </Suspense>
      <TeamMembers />
    </>
  );
}
