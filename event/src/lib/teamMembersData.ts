export interface TeamMember {
    name: string;
    description: string;
    githubLink: string;
    linkedinLink: string;
    role: string;
}

const teamMembers: TeamMember[] = [
    {
        name: "Boon Kai",
        role:  "Full Stack Developer",
        description: "Boon Kai is a full stack developer who likes drinking tea and taking on a good challenge.",
        githubLink: "https://github.com/bk7312",
        linkedinLink: "https://www.linkedin.com"
    },
    {
        name: "Avaz",
        role:  "Frontend Developer",
        description: "Avaz is a dedicated Frontend Developer from Korea, passionate about creating intuitive and visually appealing user interfaces that enhance user experience.",
        githubLink: "https://github.com/devavaz",
        linkedinLink: "https://www.linkedin.com/in"
    },
    {
        name: "Eric Iwan",
        role:  "Backend Developer",
        description: "Eric Iwan is a hardworking Backend Developer from Japan, working in MERN for the last 3 years and always seeking out challenges that will grow him as a developer.",
        githubLink: "https://github.com/ejemy",
        linkedinLink: "https://www.linkedin.com/in/eric-iwan-61319714b/"
    },
    {
        name: "Jeisa Raja",
        role:  "Backend Developer",
        description: "Jeisa Raja is a talented Backend Developer from Indonesia, known for her proficiency in designing and implementing complex backend architectures.",
        githubLink: "https://github.com/jeisaRaja",
        linkedinLink: "https://www.linkedin.com/in"
    },
    {
        name: "Jyotirmoy Das",
        role:  "Backend Developer",
        description: "Jyotirmoy Das is a skilled Full Stack Developer from India having experience in designing and developing modern and responsive web applications.",
        githubLink: "https://github.com/jdx-code",
        linkedinLink: "https://www.linkedin.com/in/jdx-code/"
    },
];

export default teamMembers;

