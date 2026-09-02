export interface Certification {
  name: string;
  issuer: string;
  status: "earned" | "in-progress";
  date?: string;
  url?: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified AI Practitioner",
    issuer: "AWS",
    status: "in-progress",
  },
  {
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "AWS",
    status: "in-progress",
  },
];
