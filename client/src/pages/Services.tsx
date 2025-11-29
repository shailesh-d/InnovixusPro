import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Server, 
  Settings, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  Shield,
  Gauge,
  Rocket,
  Container,
  LineChart,
  Cloud,
  GitBranch,
  Monitor,
  Cpu
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Backend Development",
      description: "Build robust, scalable backend systems using modern technologies like Node.js, Python, and Golang. Our solutions handle everything from simple APIs to complex microservices architectures.",
      features: [
        { icon: <Code className="h-4 w-4" />, text: "RESTful & GraphQL APIs" },
        { icon: <Database className="h-4 w-4" />, text: "Database Design & Optimization" },
        { icon: <Shield className="h-4 w-4" />, text: "Security & Authentication" },
        { icon: <Gauge className="h-4 w-4" />, text: "Performance Optimization" }
      ],
      technologies: ["Node.js", "Python", "Golang", "PostgreSQL", "MongoDB", "Redis"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      gradient: "from-blue-50 to-white"
    },
    {
      icon: <Settings className="h-8 w-8 text-accent" />,
      title: "DevOps & Infrastructure",
      description: "Streamline your development workflow with automated CI/CD pipelines, container orchestration, and comprehensive monitoring solutions.",
      features: [
        { icon: <Rocket className="h-4 w-4" />, text: "CI/CD Pipeline Setup" },
        { icon: <Container className="h-4 w-4" />, text: "Container Orchestration" },
        { icon: <LineChart className="h-4 w-4" />, text: "Monitoring & Alerting" },
        { icon: <Cloud className="h-4 w-4" />, text: "Cloud Infrastructure" }
      ],
      technologies: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "Terraform", "Prometheus"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      gradient: "from-green-50 to-white"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
      title: "Architecture Consulting",
      description: "Get expert guidance on technology strategy, system architecture, and scalability planning to ensure your infrastructure grows with your business.",
      features: [
        { icon: <GitBranch className="h-4 w-4" />, text: "System Architecture Design" },
        { icon: <Monitor className="h-4 w-4" />, text: "Performance Auditing" },
        { icon: <Cpu className="h-4 w-4" />, text: "Scalability Planning" },
        { icon: <Shield className="h-4 w-4" />, text: "Security Assessment" }
      ],
      technologies: ["System Design", "AWS Architecture", "Microservices", "API Design", "Security Audits"],
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      gradient: "from-purple-50 to-white"
    }
  ];

  return (
    <>
      <SEO 
        title="Services | Backend Development & DevOps Solutions - Innovixus"
        description="Professional backend development, DevOps consulting, and cloud architecture solutions tailored for startups and enterprises. Get expert technical guidance."
        url="https://innovixus.co/services"
        keywords="backend development, devops, cloud architecture, nodejs, python, golang, kubernetes, aws"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Comprehensive <span className="gradient-text">IT Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From backend development to DevOps automation, we provide end-to-end technology solutions 
              tailored to your business needs
            </p>
            <Link href="/contact" data-testid="button-get-started">
              <Button className="btn-primary">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${service.gradient} rounded-full text-foreground font-semibold mb-4`}>
                    {service.icon}
                    <span className="ml-2">{service.title}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">{service.title}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center">
                          {feature.icon}
                        </div>
                        <span className="text-muted-foreground">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" data-testid={`button-contact-service-${index}`}>
                    <Button variant="outline" className="btn-secondary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={service.image}
                    alt={`${service.title} service illustration`}
                    className="rounded-2xl shadow-xl w-full hover-lift"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss your project and find the perfect solution for your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300" data-testid="button-start-project">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/blog">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300" data-testid="button-view-blog">
                  Read Our Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
