const GITHUB = "https://github.com/craxelfn";
const ORACLE_SAMPLES_PLUGINS =
  "https://github.com/oracle-samples/oracle-aidp-samples/tree/main/ai/claude-code-plugins";

export const siteConfig = {
  name: "Oussama Lakrafi",
  firstName: "Oussama",
  lastName: "Lakrafi",
  title: "Forward Deployed Engineer @ Oracle",
  tagline:
    "I work closely with customers to translate complex business needs into secure, scalable, and production-ready technology solutions.",
  roles: [
    "AI-powered applications",
    "data platforms",
    "agentic workflows",
    "distributed systems",
    "cloud architectures",
  ],
  email: "oussamaa1lakrafi@gmail.com",
  phoneDisplay: "+212 605 363 212",
  phoneTel: "tel:+212605363212",
  location: "Casablanca, Morocco",
  github: GITHUB,
  linkedin: "https://www.linkedin.com/in/oussama-lakrafi-118805295/",
  cv: "/oussama-lakrafi-cv.pdf",
} as const;

export const aboutContent = {
  summary:
    "Forward Deployed Engineer at Oracle with expertise in AI engineering, software development, and solutions architecture. I design and deliver AI-powered applications, data platforms, distributed systems, and cloud architectures, combining hands-on engineering with a strong understanding of customer environments. My focus is building practical, high-impact solutions that are reliable, maintainable, and aligned with real business outcomes.",
  languages: "Arabic (native), French and English (fluent).",
  education: "ENSA Berrechid · Engineer's Degree in Computer Science",
  stats: [
    { value: 300, suffix: "+", label: "LeetCode problems solved" },
    { value: 88, suffix: "+", label: "GitHub repositories" },
    { value: 6, suffix: "", label: "Certifications" },
    { value: 5, suffix: "", label: "Companies" },
  ],
  focus: [
    {
      id: "data",
      title: "Data Engineering",
      text: "Lakehouse pipelines on Oracle AI Data Platform: ingestion, bronze/silver/gold Delta layers, data quality, and governed analytics delivery.",
    },
    {
      id: "agents",
      title: "AI Agents & MLOps",
      text: "Agents and model workflows that connect data, models, and business systems to automate real work.",
    },
    {
      id: "harness",
      title: "Harness Engineering",
      text: "Tools, plugins, integrations, and workflows that let AI agents operate effectively across enterprise environments.",
    },
    {
      id: "cloud",
      title: "Cloud & Distributed Systems",
      text: "Microservices, event streaming, CI/CD, and infrastructure as code on OCI and AWS.",
    },
  ],
} as const;

export type FocusId = (typeof aboutContent.focus)[number]["id"];

export const SKILL_CATEGORIES = [
  "AI & Data",
  "Programming Languages",
  "Backend",
  "Frontend",
  "Databases",
  "DevOps & Cloud",
] as const;

export type SkillItem = {
  name: string;
  category: (typeof SKILL_CATEGORIES)[number];
};

export const skills: SkillItem[] = [
  { name: "Oracle AI Data Platform", category: "AI & Data" },
  { name: "Oracle Analytics Cloud", category: "AI & Data" },
  { name: "Spark", category: "AI & Data" },
  { name: "Delta Lake", category: "AI & Data" },
  { name: "Medallion Architecture", category: "AI & Data" },
  { name: "Data Quality", category: "AI & Data" },
  { name: "Agentic AI", category: "AI & Data" },
  { name: "Generative AI", category: "AI & Data" },
  { name: "MCP", category: "AI & Data" },
  { name: "Machine Learning", category: "AI & Data" },
  { name: "Airflow", category: "AI & Data" },
  { name: "dbt", category: "AI & Data" },
  { name: "Snowflake", category: "AI & Data" },
  { name: "Microsoft Fabric", category: "AI & Data" },
  { name: "Kafka", category: "AI & Data" },
  { name: "Python", category: "Programming Languages" },
  { name: "Java", category: "Programming Languages" },
  { name: "TypeScript", category: "Programming Languages" },
  { name: "JavaScript", category: "Programming Languages" },
  { name: "C", category: "Programming Languages" },
  { name: "PHP", category: "Programming Languages" },
  { name: "Spring Boot", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "React Native", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "Redis", category: "Databases" },
  { name: "Cassandra", category: "Databases" },
  { name: "OCI", category: "DevOps & Cloud" },
  { name: "AWS", category: "DevOps & Cloud" },
  { name: "Docker", category: "DevOps & Cloud" },
  { name: "Kubernetes", category: "DevOps & Cloud" },
  { name: "Helm", category: "DevOps & Cloud" },
  { name: "ArgoCD", category: "DevOps & Cloud" },
  { name: "Terraform", category: "DevOps & Cloud" },
  { name: "Ansible", category: "DevOps & Cloud" },
  { name: "Jenkins", category: "DevOps & Cloud" },
  { name: "GitLab CI/CD", category: "DevOps & Cloud" },
  { name: "Git", category: "DevOps & Cloud" },
  { name: "GitHub", category: "DevOps & Cloud" },
];

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
  isCurrent?: boolean;
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "exp-oracle",
    role: "Forward Deployed Engineer",
    company: "Oracle",
    period: "Apr 2026 — Present · Remote",
    summary: "Joined as an FDE intern in April 2026, now full-time.",
    isCurrent: true,
    tech: [
      "Oracle AI Data Platform",
      "Harness Engineering",
      "Python",
      "Spark",
      "Delta Lake",
      "OCI",
      "Oracle Analytics Cloud",
      "MCP",
    ],
    highlights: [
      "Partner directly with enterprise customers to design, deploy, and operationalize data and AI solutions on Oracle AI Data Platform.",
      "Built a production-grade Python package for Fusion → AIDP → OAC delivery: BICC ingestion into Bronze/Silver/Gold Delta layers with data-quality checks, schema/drift controls, incremental MERGE, resumable runs, and governed OAC dataset/workbook delivery.",
      "Developed a conversational plugin and skill suite that automates the package end to end through natural language, from environment setup and ingestion to issue triage, data-mart authoring, and OAC workbook creation.",
      "Accelerated Databricks-to-AIDP migrations by automating notebook, workflow, and metadata conversion, validated on live Spark clusters.",
      "Delivered secure provisioning automation across AIDP, OCI IAM, and Oracle Analytics Cloud, and contributed to an agentic data-engineering consultant for natural-language data exploration and pipeline generation.",
    ],
  },
  {
    id: "exp-1",
    role: "Software Engineer / DevOps Intern",
    company: "IZEMX",
    period: "Jun 2025 — Sept 2025 · Remote",
    summary: "",
    tech: [
      "Git",
      "Helm",
      "CI/CD",
      "Nexus",
      "JIRA",
      "GitOps",
      "Spring Cloud",
      "PostgreSQL",
      "Spring Boot",
      "TypeScript",
      "Docker",
      "Next.js",
      "Kubernetes",
      "React Native",
      "GitLab",
      "Terraform",
      "Microservices",
      "Amazon Web Services",
      "Ansible",
      "ArgoCD",
    ],
    highlights: [
      "Developed an AI homework assistant with a React Native mobile app and a Next.js web interface",
      "Built a scalable backend using Spring Boot microservices with PostgreSQL and AWS S3",
      "Implemented CI/CD pipelines using GitLab CI/CD, Docker, Kubernetes, ArgoCD, and Nexus",
    ],
  },
  {
    id: "exp-2",
    role: "Full Stack Developer Intern",
    company: "2Peerfect",
    period: "Sept 2024 — Oct 2024 · Remote",
    summary: "",
    tech: ["Git", "Node.js", "Express.js", "TypeScript", "Next.js", "MongoDB"],
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
    tech: ["Git", "MySQL", "Bootstrap", "JavaScript", "Laravel"],
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
    tech: ["Git", "Node.js", "React.js", "Express.js", "TypeScript", "MongoDB"],
    highlights: ["Built web application using React and Node.js"],
  },
];

export const PROJECT_CATEGORIES = ["AI & Data", "Cloud & DevOps", "Full Stack"] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectItem = {
  id: string;
  title: string;
  summary: string;
  description: string;
  highlights?: string[];
  category: ProjectCategory;
  technologies: string[];
  badge?: string;
  isFeatured?: boolean;
  href?: string;
  repo?: string;
};

export const projects: ProjectItem[] = [
  {
    id: "fusion-autopilot",
    title: "Fusion Autopilot for Oracle AI Data Platform",
    badge: "Oracle open source",
    isFeatured: true,
    category: "AI & Data",
    summary:
      "Productized pipeline moving Oracle Fusion ERP, HCM, and SCM data into Oracle AI Data Platform and on to Oracle Analytics Cloud.",
    description:
      "A productized Fusion → AIDP → OAC pipeline published in oracle-samples. Curated BICC extracts land in a bronze/silver/gold medallion in Delta, with conformed dimensions and ready-made AR, AP, GL, PO, and supplier-spend gold marts. Conversational skills drive the whole pipeline in natural language.",
    highlights: [
      "Fail-fast seed validation, a durable run manifest, and drift gates keep reruns safe and resumable",
      "Metadata-driven chart-of-accounts resolution and incremental onboarding of new charts",
      "Conversational skills author data marts and build OAC workbooks through the OAC MCP server",
      "Shipped the Codex edition of the plugin to oracle-samples",
    ],
    technologies: ["Python", "Spark", "Delta Lake", "Oracle Analytics Cloud", "MCP", "OCI"],
    href: `${ORACLE_SAMPLES_PLUGINS}/oracle-ai-data-platform-fusion-autopilot`,
  },
  {
    id: "ask-aidp",
    title: "Ask AIDP — Claude Code & Codex Plugin",
    badge: "Oracle open source",
    isFeatured: true,
    category: "AI & Data",
    summary:
      "Connects coding agents to Oracle AI Data Platform Workbench through aidp-cli, OCI-signed REST calls, and native workspace Git tools.",
    description:
      "An MCP plugin that lets Claude Code and Codex operate Oracle AI Data Platform Workbench end to end: every documented aidp-cli command, OCI-signed REST endpoints, and native SDK workspace and Git tools.",
    highlights: [
      "43 MCP tools covering notebooks, workflows, clusters, catalogs, Delta tables, bundles, and agent flows",
      "Multi-notebook workflow runs with log collection, run tracking, and auto-heal for failed jobs",
      "Added the Claude Code edition and kept it in step with Codex releases (0.9.1 → 0.10.0)",
    ],
    technologies: ["MCP", "OCI", "Oracle AI Data Platform", "Python", "Git"],
    href: `${ORACLE_SAMPLES_PLUGINS}/ask-aidp`,
  },
  {
    id: "healthcare",
    title: "Healthcare Platform",
    category: "Full Stack",
    summary:
      "Microservices platform with real-time video consultations, an AI chatbot, and appointment booking.",
    description:
      "Architected a scalable microservices healthcare platform enabling real-time video consultations and AI-driven chatbot support. Implemented secure doctor verification, automated prescription generation with QR codes, and centralized authentication via Keycloak. Integrated Apache Kafka for event-driven notifications and RNN models to automate toxic feedback detection and content moderation.",
    technologies: ["Next.js", "Spring Boot", "Node.js", "WebRTC", "PostgreSQL", "MongoDB", "Kafka", "Docker", "RNN"],
  },
  {
    id: "health-monitoring",
    title: "Real-Time Health Monitoring Platform",
    category: "AI & Data",
    summary:
      "Kafka event-driven pipeline with ML inference, anomaly detection, and live WebSocket dashboards.",
    description:
      "Designed a stateless microservices architecture using Kafka as a central event bus for real-time inter-service communication. Implemented specialized services for ML inference, batching, and alerting to process live patient vitals with sub-second latency. Optimized the stack using Redis for alert deduplication and built an analytics lakehouse with S3, Glue, and Athena, surfaced through a Next.js WebSocket dashboard.",
    technologies: ["Kafka", "Python", "Next.js", "AWS (S3, Glue, Athena)", "Redis", "PostgreSQL"],
  },
  {
    id: "three-tier",
    title: "Three-Tier App with CI/CD & GitOps",
    category: "Cloud & DevOps",
    summary:
      "AWS EKS provisioned with Terraform, Jenkins + SonarQube CI, ArgoCD GitOps, Prometheus and Grafana monitoring.",
    description:
      "Provisioned a production-ready AWS EKS cluster using Terraform for Infrastructure as Code. Automated a full CI/CD pipeline featuring Jenkins for CI, SonarQube for static code analysis, and ArgoCD for GitOps-based CD. Integrated a complete monitoring stack using Prometheus and Grafana to ensure high observability and scalability of the three-tier application.",
    technologies: ["Jenkins", "Terraform", "AWS", "Kubernetes", "Helm", "ArgoCD", "Prometheus", "Grafana"],
  },
  {
    id: "streaming",
    title: "Real-Time Data Streaming Pipeline",
    category: "AI & Data",
    summary:
      "Airflow → Kafka → Spark Structured Streaming → Cassandra, fully containerized.",
    description:
      "End-to-end containerized data streaming pipeline using Airflow for data ingestion to Kafka, Spark Structured Streaming for processing, and Cassandra for storage. Monitored via custom dashboards.",
    technologies: ["Apache Airflow", "Apache Kafka", "Apache Spark", "Apache Cassandra", "PostgreSQL", "Docker Compose", "Python"],
    repo: `${GITHUB}/airflow-kafka-spark-cassandra-project`,
  },
  {
    id: "dbt-snowflake",
    title: "dbt + Airflow + Snowflake ELT Pipeline",
    category: "AI & Data",
    summary:
      "ELT orchestrated by Airflow with dbt models rendered as tasks via Astronomer Cosmos.",
    description:
      "End-to-end ELT data pipeline orchestrated with Airflow. Leveraged Astronomer Cosmos to render dbt models dynamically as Airflow DAG tasks. Snowflake serves as the cloud data warehouse with staging, intermediate, and marts layers. Data quality is enforced with dbt tests.",
    technologies: ["Apache Airflow", "dbt", "Snowflake", "Docker", "Python", "SQL"],
    repo: `${GITHUB}/airflow-dbt-snowflake-project`,
  },
  {
    id: "pibot",
    title: "PiBot Vision-Control System",
    category: "Cloud & DevOps",
    summary:
      "IoT smart car driven from a Next.js dashboard with live video and real-time object detection on AWS.",
    description:
      "Developed a real-time IoT platform to remotely operate a smart car via a Next.js dashboard and AWS. Integrated WebRTC and Kinesis for low-latency video streaming, while managing car movement through IoT Core and MQTT. Implemented an EC2-hosted TensorFlow model for real-time object detection with live visualization and DynamoDB logging.",
    technologies: ["Next.js & React", "AWS (Kinesis, IoT Core, STS, DynamoDB, EC2)", "Python", "FastAPI", "TensorFlow", "WebRTC", "MQTT"],
    repo: `${GITHUB}/car`,
  },
  {
    id: "observability",
    title: "AWS Observability Infrastructure",
    category: "Cloud & DevOps",
    summary:
      "CloudFormation VPC, FastAPI behind ALB + ASG, CloudWatch, X-Ray tracing, and k6 load tests.",
    description:
      "Built a fully observable AWS infrastructure using CloudFormation with public/private subnets, NAT Gateway, and security groups. Deployed a FastAPI application behind an ALB with ASG. Configured CloudWatch logs/metrics, AWS X-Ray distributed tracing, and performed load testing with k6.",
    technologies: ["AWS (CloudFormation, CloudWatch, X-Ray, EC2, ASG, ALB, VPC)", "FastAPI", "PostgreSQL", "k6"],
    repo: `${GITHUB}/iac-observability-stack`,
  },
  {
    id: "auction",
    title: "Real-Time Auction Platform",
    category: "Full Stack",
    summary: "Live bidding with JWT auth, STOMP WebSockets, notifications, and bid-trend charts.",
    description:
      "Developed a full-stack auction platform for real-time bidding. Implemented JWT authentication, WebSocket communication with STOMP.js, live notifications, and interactive charts for bid trend analysis.",
    technologies: ["Spring Boot", "Next.js", "PostgreSQL", "STOMP.js", "JWT", "Material UI", "Tailwind CSS"],
    repo: `${GITHUB}/auction`,
  },
  {
    id: "employee-management",
    title: "Employee Management System",
    category: "Full Stack",
    summary: "Role-based management with WebRTC video calls and Socket.IO messaging.",
    description:
      "Built a full-stack system with role-based JWT authentication. Features include employee/task management, department assignment, WebRTC for video calls, and Socket.IO for instant messaging.",
    technologies: ["React", "WebRTC", "Node.js", "Express", "Socket.IO", "MongoDB", "JWT", "Bootstrap"],
    repo: `${GITHUB}/managmenet-sys`,
  },
];

export const education = [
  {
    id: "edu-1",
    degree: "Engineer's Degree in Computer Science (Master equivalent)",
    school: "National School of Applied Sciences Berrechid",
    period: "2021 — 2026",
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
    name: "OCI Generative AI Professional",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=6596D1CCED9102A946E02C1894BAAB43BBE58B8A4B39A350B762C1510F4785A5",
  },
  {
    id: "cert-3",
    name: "Oracle Java SE 17 Developer",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=85290B8332B2FCA98107230740EEA86956806E3DDE741A27A2C04C107B2D19DF",
  },
  {
    id: "cert-4",
    name: "Oracle Database SQL Associate",
    issuer: "Oracle",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=8C1E8787E40E9B5F55616382CEA154748C89A1F23BDBE4B1342844FE43FE024A",
  },
  {
    id: "cert-5",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    href: "https://www.credly.com/badges/b4f9aeb6-1adf-45a8-92fe-8c9e220103e6/linked_in_profile",
  },
  {
    id: "cert-6",
    name: "365 Data Science Python Programmer Bootcamp",
    issuer: "365 Data Science",
    href: "https://learn.365datascience.com/certificates/CC-3B1C9406D2/",
  },
];
