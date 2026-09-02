export interface Project {
  title: string;
  description: string;
  stack: string[];
  github: string;
}

export const projects: Project[] = [
  {
    title: "net-sentry-backend",
    description:
      "Network monitoring tool — agents collect telemetry (latency, traces, probes) and stream it to a backend server.",
    stack: ["Go", "Gin", "Goroutines", "Channels"],
    github: "https://github.com/arnavsx3/net-sentry-backend",
  },
  {
    title: "Cassian",
    description:
      "Risk-aware cost optimizer for EC2 Spot instances — picks placement strategy balancing cost vs interruption risk.",
    stack: ["Python", "FastAPI", "boto3", "AWS"],
    github: "https://github.com/arnavsx3/cassian",
  },
];
