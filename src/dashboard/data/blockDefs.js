import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  Rocket,
  AlignLeft,
  Image,
  Award,
} from 'lucide-react';

export const BLOCK_DEFINITIONS = {
  header: {
    label: "Header",
    icon: User,
    color: "#2563eb",
    bg: "#eff6ff",
    description: "Contact info & professional title",
    defaultData: {
      name: "John Doe",
      title: "Senior Software Engineer",
      email: "john.doe@example.com",
      phone: "+1 (555) 000-0000",
      location: "San Francisco, CA",
      website: "https://johndoe.com",
      socials: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
        { platform: "GitHub", url: "https://github.com/johndoe" }
      ]
    }
  },
  summary: {
    label: "Summary",
    icon: FileText,
    color: "#0d9488",
    bg: "#f0fdfa",
    description: "Brief professional overview",
    defaultData: {
      title: "Professional Summary",
      content: "Dedicated software engineer with 5+ years of experience building scalable web applications. Passionate about clean code and user-centric design."
    }
  },
  experience: {
    label: "Experience",
    icon: Briefcase,
    color: "#4f46e5",
    bg: "#eef2ff",
    description: "Roles, responsibilities & achievements",
    defaultData: {
      title: "Experience",
      items: [
        {
          company: "Tech Solutions Inc.",
          position: "Full Stack Developer",
          location: "Remote",
          from: "Jan 2021",
          to: "Present",
          current: true,
          description: "Led the development of the core dashboard, improving performance by 40%."
        }
      ]
    }
  },
  education: {
    label: "Education",
    icon: GraduationCap,
    color: "#9333ea",
    bg: "#faf5ff",
    description: "Academic background & certifications",
    defaultData: {
      title: "Education",
      items: [
        {
          institution: "University of Technology",
          degree: "B.S. in Computer Science",
          location: "Austin, TX",
          from: "2016",
          to: "2020",
          description: "GPA: 3.8/4.0. Focused on Distributed Systems."
        }
      ]
    }
  },
  skills: {
    label: "Skills",
    icon: Wrench,
    color: "#ea580c",
    bg: "#fff7ed",
    description: "Technical proficiencies & soft skills",
    defaultData: {
      title: "Skills",
      items: [
        { name: "Languages", keywords: ["JavaScript", "TypeScript", "Python"] },
        { name: "Frameworks", keywords: ["React", "Node.js", "Tailwind CSS"] }
      ]
    }
  },
  project: {
    label: "Projects",
    icon: Rocket,
    color: "#e11d48",
    bg: "#fff1f2",
    description: "Personal or professional showcase work",
    defaultData: {
      title: "Key Projects",
      items: [
        {
          name: "Open-Source Resume Builder",
          description: "A drag-and-drop tool for creating professional resumes.",
          url: "https://github.com/example/resume-builder",
          highlights: ["1.2k Stars on GitHub", "Used by 10k+ users"]
        }
      ]
    }
  },
  richtext: {
    label: "Rich Text",
    icon: AlignLeft,
    color: "#4b5563",
    bg: "#f9fafb",
    description: "General-purpose formatted text block",
    defaultData: {
      title: "Additional Information",
      content: "Feel free to add any other relevant details here using simple Markdown-like structure."
    }
  },
  image: {
    label: "Image",
    icon: Image,
    color: "#16a34a",
    bg: "#f0fdf4",
    description: "Profile picture or supporting visual",
    defaultData: {
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
      alt: "Profile Portrait",
      caption: "Profile Photo"
    }
  },
  certification: {
    label: "Certifications",
    icon: Award,
    color: "#ca8a04",
    bg: "#fefce8",
    description: "Professional credentials & awards",
    defaultData: {
      title: "Certifications",
      items: [
        {
          name: "AWS Certified Solutions Architect",
          issuer: "Amazon Web Services",
          date: "2023",
          description: "Validation of expertise in designing distributed systems on AWS."
        }
      ]
    }
  }
};

export const PALETTE_ORDER = [
  'header',
  'summary',
  'experience',
  'education',
  'certification',
  'skills',
  'project',
  'richtext',
  'image'
];
