import type { IconType } from "react-icons/lib";
import { FaAws } from "react-icons/fa6";
import {
  SiAnsible,
  SiApachekafka,
  SiArgo,
  SiBootstrap,
  SiC,
  SiCss,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGrafana,
  SiHelm,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiOpenjdk,
  SiPhp,
  SiPostgresql,
  SiPrometheus,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTensorflow,
  SiTerraform,
  SiTypescript,
  SiWebrtc,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

import { cn } from "@/lib/utils";

export const TECH_ICONS: Record<string, IconType> = {
  Java: SiOpenjdk,
  JavaScript: SiJavascript,
  Python: SiPython,
  C: SiC,
  PHP: SiPhp,
  "Next.js": SiNextdotjs,
  React: SiReact,
  "React Native": TbBrandReactNative,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss,
  Bootstrap: SiBootstrap,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Spring Boot": SiSpringboot,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  ArgoCD: SiArgo,
  "GitLab CI/CD": SiGitlab,
  Jenkins: SiJenkins,
  Terraform: SiTerraform,
  AWS: FaAws,
  Helm: SiHelm,
  Kafka: SiApachekafka,
  Ansible: SiAnsible,
  Git: SiGit,
  GitHub: SiGithub,
  "Machine Learning": SiTensorflow,
  "Generative AI": SiOpenai,
  WebRTC: SiWebrtc,
  RNN: SiTensorflow,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Redis: SiRedis,
  "AWS (S3, Glue, Athena)": FaAws,
};

export function TechLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = TECH_ICONS[name];
  if (!Icon) {
    return (
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-xs font-medium text-muted-foreground",
          className,
        )}
        aria-hidden
      >
        {name.slice(0, 2)}
      </span>
    );
  }
  return <Icon className={className} aria-hidden />;
}
