import {
  Github,
  Linkedin,
  Mail,
  Send,
  Twitter,
  Globe,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  mail: Mail,
  telegram: Send,
  twitter: Twitter,
  globe: Globe,
};

export function getSocialIcon(name: string): LucideIcon {
  return iconMap[name.toLowerCase()] || Globe;
}
