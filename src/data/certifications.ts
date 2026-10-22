export interface Certification {
  name: string
  issuer: string
  url: string
  issued?: string
}

// Add only credentials and verification links supplied by Arnav.
export const certifications: Certification[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    url: 'https://www.dropbox.com/scl/fi/caisa6l4zgn5w7ljqm9gm/AWS-Certified-Cloud-Practitioner-certificate.pdf?rlkey=gvt66gd5huoivpbbrv87mrwhw&st=bulrj8mr&dl=0',
  },
  {
    name: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services',
    url: 'https://www.dropbox.com/scl/fi/abxqvo58ox1kwxd08hdoh/AWS-Certified-AI-Practitioner-certificate.pdf?rlkey=qn42yyad7e45ubhb7b7cnlhrj&st=ijlkdhb3&dl=0',
  },
]
