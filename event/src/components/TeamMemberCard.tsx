import React from "react";

export interface TeamMember {
  name: string;
  description: string;
  githubLink: string;
  linkedinLink: string;
  role: string;
}

const TeamMemberCard = ({ name, role, description, githubLink, linkedinLink}: TeamMember) => {
  return (
    <div className="mb-6 grid gap-8 md:grid-cols-1 lg:mb-5">
      <div className="items-center rounded-lg shadow sm:flex bg-gradient-to-r from-rose-100 to-pink-200">
        <div className="p-5">
          <h3 className="text-xl font-bold tracking-tight text-gray-900">
            <a href="#">{name}</a>
          </h3>
          <span className="text-gray-500">{role}</span>
          <p className="mb-4 mt-3 font-light text-gray-500">{description}</p>
          <ul className="flex space-x-4 sm:mt-0">
            <li className="flex">
              <a href={linkedinLink} className="text-gray-500">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" /></svg>
              </a>
              <a href={githubLink} className="text-gray-500">
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
