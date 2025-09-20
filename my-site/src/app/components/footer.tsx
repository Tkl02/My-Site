import { Icon } from "@iconify/react";
import React from "react";
import { Link } from "@heroui/react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "GitHub", icon: "lucide:github", url: "https://github.com/Tkl02" },
    {
      name: "Linkedin",
      icon: "lucide:linkedin",
      url: "https://www.linkedin.com/in/Leonardo-Faustino/",
    },
    {
      name: "Instagram",
      icon: "lucide:instagram",
      url: "https://www.instagram.com/leonardo.faustin0/",
    },
  ];

  return (
    <footer className="bg-content1 py-8 border-t border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Icon
              icon="lucide:code"
              width={20}
              height={20}
              className="text-primary"
            />
            <span className="font-semibold text-foreground">Portifolio</span>
          </div>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                isExternal
                className="text-default-600 hover:text-primary transition-colors"
                aria-label={link.name}
              >
                <Icon icon={link.icon} width={20} height={20} />
              </Link>
            ))}
          </div>
          <div className="text-default-500 text-sm">
            &copy; {currentYear} Leonardo Faustino. All rights reserved.

          </div>
        </div>
      </div>
    </footer>
  );
};
