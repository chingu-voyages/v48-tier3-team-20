import React from "react";
import TeamMemberCard from "./TeamMemberCard";
import teamMembers from "../lib/teamMembersData"

const TeamMembers = () => {
  return (
    <div>
      <section className="">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 border-t-2">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">Our Chingu Team</h2>
            <p className="font-light lg:mb-16 sm:text-xl text-[#7A6774C2]">We are a dedicated team of individuals brought together by our shared passion for coding and collaboration. We have embarked on this Chingu Voyage with a unified goal: to create something remarkable.</p>
          </div> 
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                name={member.name}
                description={member.description}
                role={member.role}
                githubLink={member.githubLink}
                linkedinLink={member.linkedinLink}

              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamMembers;
