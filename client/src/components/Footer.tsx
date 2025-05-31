import { Link } from "wouter";
import { Code, Linkedin, Twitter, Github, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "Backend Development",
    "DevOps Consulting",
    "Cloud Architecture",
    "API Development",
    "CI/CD Pipelines",
    "Monitoring & Support",
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold">Innovixus</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Innovating reliable backend and DevOps solutions for startups and enterprises. 
              Transform your infrastructure with our expert team based in Surat, Gujarat.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-gray-300">Surat, Gujarat, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-gray-300">hello@innovixus.co</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-gray-300">+91 XXX XXX XXXX</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/innovixus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/innovixus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/innovixus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-300"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <button className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link.name}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © {currentYear} Innovixus IT Services and Consultancy. All rights reserved. |{" "}
            <button className="hover:text-white transition-colors duration-200">Privacy Policy</button> |{" "}
            <button className="hover:text-white transition-colors duration-200">Terms of Service</button>
          </p>
        </div>
      </div>
    </footer>
  );
}
