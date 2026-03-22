export const siteConfig = {
  name: "Oussama Lakrafi",
  title: "Software Engineer | Full Stack | Cloud & DevOps",
  tagline:
    "Computer Science engineering student at the National School of Applied Sciences in Berrechid, specializing in software development and cloud/DevOps. Seeking a final-year project internship (PFE) to apply skills in full-stack development, DevOps, and cloud engineering while contributing to innovative projects.",
  email: "oussamaa1lakrafi@gmail.com",
  phoneDisplay: "0605363212",
  phoneTel: "+212605363212",
  location: "Casablanca, Morocco",
  contactLinks: [
    { href: "mailto:oussamaa1lakrafi@gmail.com", label: "Email" },
    { href: "tel:+212605363212", label: "Phone" },
  ] as const,
} as const;

export const aboutContent = {
  summary:
    "Computer Science engineering student at the National School of Applied Sciences in Berrechid, specializing in software development and cloud/DevOps. Seeking a final-year project internship (PFE) to apply skills in full-stack development, DevOps, and cloud engineering while contributing to innovative projects.",
  languages: "English (Fluent), French (Fluent), Arabic (Native).",
  membership: "+300 LeetCode problems solved & +88 GitHub repository projects.",
};

export type SkillItem = {
  name: string;
  category:
    | "Programming Languages"
    | "Frontend"
    | "Backend"
    | "Databases"
    | "DevOps & Cloud"
    | "AI & Data";
};

export const skills: SkillItem[] = [
  { name: "Java", category: "Programming Languages" },
  { name: "JavaScript", category: "Programming Languages" },
  { name: "Python", category: "Programming Languages" },
  { name: "C", category: "Programming Languages" },
  { name: "PHP", category: "Programming Languages" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "React Native", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Bootstrap", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Spring Boot", category: "Backend" },
  { name: "MySQL", category: "Databases" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "Cassandra", category: "Databases" },
  { name: "Docker", category: "DevOps & Cloud" },
  { name: "Kubernetes", category: "DevOps & Cloud" },
  { name: "ArgoCD", category: "DevOps & Cloud" },
  { name: "GitLab CI/CD", category: "DevOps & Cloud" },
  { name: "Jenkins", category: "DevOps & Cloud" },
  { name: "Terraform", category: "DevOps & Cloud" },
  { name: "AWS", category: "DevOps & Cloud" },
  { name: "Helm", category: "DevOps & Cloud" },
  { name: "Ansible", category: "DevOps & Cloud" },
  { name: "Git", category: "DevOps & Cloud" },
  { name: "GitHub", category: "DevOps & Cloud" },
  { name: "Machine Learning", category: "AI & Data" },
  { name: "Generative AI", category: "AI & Data" },
  { name: "Spark", category: "AI & Data" },
  { name: "Snowflake", category: "AI & Data" },
  { name: "Microsoft Fabric", category: "AI & Data" },
  { name: "dbt", category: "AI & Data" },
  { name: "Airflow", category: "AI & Data" },
  { name: "Kafka", category: "AI & Data" },
];

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Software Engineer / DevOps Intern",
    company: "Marketing Confort",
    period: "Jun 2025 — Sept 2025 · Remote",
    summary: "",
    highlights: [
      "Developed AI homework assistant with React Native and Next.js",
      "Built backend using Spring Boot microservices and PostgreSQL",
      "Used AWS S3 for storage",
      "Implemented CI/CD with GitLab CI/CD, Docker, Kubernetes, ArgoCD, Nexus",
    ],
  },
  {
    id: "exp-2",
    role: "Full Stack Developer Intern",
    company: "2Peerfect",
    period: "Sept 2024 — Oct 2024 · Remote",
    summary: "",
    highlights: [
      "Built interactive 3D website using Next.js, Three.js, GSAP, Framer Motion, Tailwind",
      "Designed smooth animations and responsive UI",
    ],
  },
  {
    id: "exp-3",
    role: "Full Stack Developer Intern",
    company: "Wib Day",
    period: "Aug 2024 · Hybrid",
    summary: "",
    highlights: [
      "Developed blogging platform using Laravel, HTML, CSS, JavaScript, Bootstrap, MySQL",
    ],
  },
  {
    id: "exp-4",
    role: "Full Stack Developer Intern",
    company: "Royal Air Maroc",
    period: "Jul 2024 · On-site",
    summary: "",
    highlights: ["Built web application using React and Node.js"],
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  href?: string;
  repo?: string;
};

export const projects: ProjectItem[] = [
  {
    id: "p1",
    title: "Healthcare Application",
    description:
      "Microservices healthcare platform with video consultation and AI chatbot.",
    technologies: [
      "Next.js",
      "Spring Boot",
      "Node.js",
      "WebRTC",
      "PostgreSQL",
      "MongoDB",
      "Kafka",
      "Docker",
      "RNN",
    ],
  },
  {
    id: "p2",
    title: "Three-Tier Web App Deployment with CI/CD and GitOps",
    description: "",
    technologies: [
      "Jenkins",
      "Terraform",
      "AWS",
      "Kubernetes",
      "Helm",
      "ArgoCD",
      "Prometheus",
      "Grafana",
    ],
  },
  {
    id: "p3",
    title: "Real-Time Health Monitoring Platform",
    description: "Microservices real-time health monitoring with analytics and alerts.",
    technologies: [
      "Kafka",
      "Python",
      "Next.js",
      "AWS (S3, Glue, Athena)",
      "Redis",
      "PostgreSQL",
    ],
  },
  {
    id: "p4",
    title: "Real-Time Auction Platform",
    description:
      "Developed a full-stack auction platform for real-time bidding. Implemented JWT authentication, WebSocket communication with STOMP.js, live notifications, and interactive charts for bid trend analysis.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "STOMP.js",
      "JWT",
      "Material UI",
      "Tailwind CSS",
    ],
  },
  {
    id: "p5",
    title: "Employee Management System",
    description:
      "Built a full-stack system with role-based JWT authentication. Features include employee/task management, department assignment, WebRTC for video calls, and Socket.IO for instant messaging.",
    technologies: [
      "React",
      "WebRTC",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB",
      "JWT",
      "Bootstrap",
    ],
  },
  {
    id: "p6",
    title: "Python Object Detection Backend",
    description:
      "FastAPI backend server running TensorFlow object detection in a separate process. Processes video frames received via HTTP POST and returns bounding boxes, ensuring smooth main thread UI performance.",
    technologies: [
      "Python",
      "FastAPI",
      "TensorFlow",
      "Computer Vision",
    ],
  },
  {
    id: "p7",
    title: "Real-Time Data Streaming Pipeline",
    description:
      "End-to-end containerized data streaming pipeline using Airflow for data ingestion to Kafka, Spark Structured Streaming for processing, and Cassandra for storage. Monitored via custom dashboards.",
    technologies: [
      "Apache Airflow",
      "Apache Kafka",
      "Apache Spark",
      "Apache Cassandra",
      "PostgreSQL",
      "Docker Compose",
      "Python",
    ],
  },
];

export const education = [
  {
    id: "edu-1",
    degree: "Engineering Degree in Computer Science",
    school: "National School of Applied Sciences Berrechid",
    period: "2021 — Present",
    detail: "",
  },
  {
    id: "edu-2",
    degree: "Baccalaureate in Mathematical Sciences A",
    school: "High School Oulad Hriz",
    period: "2020 — 2021",
    detail: "",
  },
];

export const certifications = [
  {
    id: "cert-1",
    name: "Oracle Cloud Infrastructure DevOps Professional",
    issuer: "Oracle",
  },
  {
    id: "cert-2",
    name: "Oracle Java SE 17 Developer",
    issuer: "Oracle",
  },
  {
    id: "cert-3",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
  },
  {
    id: "cert-4",
    name: "Oracle Database SQL Associate",
    issuer: "Oracle",
  },
  {
    id: "cert-5",
    name: "OCI Generative AI Professional",
    issuer: "Oracle",
  },
  {
    id: "cert-6",
    name: "365 Data Science Python Programmer Bootcamp",
    issuer: "365 Data Science",
  },
];
