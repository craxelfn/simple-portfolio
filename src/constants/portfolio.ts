export const siteConfig = {
  name: "Oussama Lakrafi",
  title: "Software Engineer | Data Engineer | Cloud & DevOps",
  tagline: "",
  email: "oussamaa1lakrafi@gmail.com",
  phoneDisplay: "0605363212",
  phoneTel: "+212605363212",
  location: "Casablanca, Morocco",
  contactLinks: [
    { href: "mailto:oussamaa1lakrafi@gmail.com", label: "Email" },
    { href: "https://www.linkedin.com/in/oussama-lakrafi-118805295/", label: "LinkedIn", target: "_blank" },
    { href: "https://github.com/craxelfn/", label: "GitHub", target: "_blank" },
    { href: "/oussama-lakrafi-cv.pdf", label: "Download CV" },
  ] as const,
} as const;

export const aboutContent = {
  summary:
    "I’m a Software Engineer specializing in designing high-performance applications and AI-driven solutions. With a strong foundation in modern software development, I bridge the gap between Data, AI, and DevOps to build, optimize, and deploy complex distributed architectures. I thrive on solving challenging technical problems and delivering scalable, impactful projects.",
  languages: "English, French, Arabic.",
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
      "Architected a scalable microservices healthcare platform enabling real-time video consultations and AI-driven chatbot support. Implemented secure doctor verification, automated prescription generation with QR codes, and centralized authentication via Keycloak. Integrated Apache Kafka for event-driven notifications and RNN models to automate toxic feedback detection and content moderation.",
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
    description: "Provisioned a production-ready AWS EKS cluster using Terraform for Infrastructure as Code. Automated a full CI/CD pipeline featuring Jenkins for CI, SonarQube for static code analysis, and ArgoCD for GitOps-based CD. Integrated a complete monitoring stack using Prometheus and Grafana to ensure high observability and scalability of the three-tier application.",
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
    description: "Designed a stateless microservices architecture using Kafka as a central event bus for real-time inter-service communication. Implemented specialized services for ML inference, batching, and alerting to process live patient vitals with sub-second latency. Optimized the stack using Redis for alert deduplication and built an analytics lakehouse with S3, Glue, and Athena, surfaced through a Next.js WebSocket dashboard.",
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
  {
    id: "p7",
    title: "PiBot Vision-Control System",
    description:
      "Developed a real-time IoT platform to remotely operate a smart car via a Next.js dashboard and AWS. Integrated WebRTC and Kinesis for low-latency video streaming, while managing car movement through IoT Core and MQTT. Implemented an EC2-hosted TensorFlow model for real-time object detection with live visualization and DynamoDB logging.",
    technologies: [
      "Next.js & React",
      "Vercel",
      "AWS (Kinesis, IoT Core, STS, DynamoDB, EC2)",
      "Python",
      "FastAPI",
      "TensorFlow",
      "WebRTC",
      "MQTT",
    ],
  },

  {
    id: "p8",
    title: "MasterProject - AWS Observability Infrastructure",
    description:
      "Built a fully observable AWS infrastructure using CloudFormation with public/private subnets, NAT Gateway, and security groups. Deployed a FastAPI application behind an ALB with ASG. Configured CloudWatch logs/metrics, AWS X-Ray distributed tracing, and performed load testing with k6.",
    technologies: [
      "AWS (CloudFormation, CloudWatch, X-Ray, EC2, ASG, ALB, VPC)",
      "FastAPI",
      "PostgreSQL",
      "k6",
    ],
  },
  {
    id: "p9",
    title: "dbt + Airflow + Snowflake — Data Pipeline",
    description:
      "End-to-end ELT data pipeline orchestrated with Airflow. Leveraged Astronomer Cosmos to render dbt models dynamically as Airflow DAG tasks. Snowflake serves as the cloud data warehouse with staging, intermediate, and marts layers. Monitored data quality via dbt tests inside Docker constraints.",
    technologies: [
      "Apache Airflow",
      "dbt",
      "Snowflake",
      "Docker",
      "Python",
      "SQL",
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
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6596D1CCED9102A946E02C1894BAAB437DA8EC14B92474E14E2AC075B6BF4BB9",
  },
  {
    id: "cert-2",
    name: "Oracle Java SE 17 Developer",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=85290B8332B2FCA98107230740EEA86956806E3DDE741A27A2C04C107B2D19DF",
  },
  {
    id: "cert-3",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    href: "https://www.credly.com/badges/b4f9aeb6-1adf-45a8-92fe-8c9e220103e6/linked_in_profile",
  },
  {
    id: "cert-4",
    name: "Oracle Database SQL Associate",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8C1E8787E40E9B5F55616382CEA154748C89A1F23BDBE4B1342844FE43FE024A",
  },
  {
    id: "cert-5",
    name: "OCI Generative AI Professional",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6596D1CCED9102A946E02C1894BAAB43BBE58B8A4B39A350B762C1510F4785A5",
  },
  {
    id: "cert-6",
    name: "365 Data Science Python Programmer Bootcamp",
    issuer: "365 Data Science",
    href: "https://learn.365datascience.com/certificates/CC-3B1C9406D2/",
  },
];
