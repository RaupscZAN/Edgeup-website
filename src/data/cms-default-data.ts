import { 
  Page, 
  MediaItem, 
  SiteSettings, 
  FormSubmission,
  ContentBlock
} from '../types';

const siteSettings: SiteSettings = {
  siteName: "EdgeUp",
  logo: "",
  favicon: "",
  contactInfo: {
    email: "info@edgeup.in",
    phone: "044 4500 2700",
    address: "No 14, Tank Bund Rd, Lake Area, Nungambakkam, Chennai, Tamil Nadu 600032",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/edgeup-zan/",
      twitter: "",
      facebook: "",
      instagram: "https://www.instagram.com/edgeup_zan/"
    }
  },
  seoDefaults: {
    title: "EdgeUp - AI-Powered Learning Platform for Institutions",
    description: "India's first AI-driven learning companion tailored for institutions preparing students for UPSC, state exams, and other competitive tests.",
    keywords: [
      "AI learning platform India",
      "adaptive learning for UPSC", 
      "psychometric EdTech", 
      "institutional learning intelligence"
    ]
  }
};

const defaultData = {
  pages: [] as Page[],
  media: [] as MediaItem[],
  siteSettings,
  formSubmissions: [] as FormSubmission[]
};

export default defaultData;