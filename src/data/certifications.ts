export interface Certification {
  name: string
  issuer: string
  url: string
  issued?: string
}

// Add only credentials and verification links supplied by Arnav.
export const certifications: Certification[] = []
