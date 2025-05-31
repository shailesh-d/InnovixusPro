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

  const additionalServices = [
    {
      title: "API Development & Integration",
      description: "Custom API development and third-party integrations",
      icon: <Code className="h-6 w-6 text-primary" />
    },
    {
      title: "Database Optimization",
      description: "Performance tuning and query optimization",
      icon: <Database className="h-6 w-6 text-accent" />
    },
    {
      title: "Security Audits",
      description: "Comprehensive security assessments and compliance",
      icon: <Shield className="h-6 w-6 text-red-500" />
    },
    {
      title: "Performance Monitoring",
      description: "Real-time monitoring and alerting systems",
      icon: <LineChart className="h-6 w-6 text-orange-500" />
    },
    {
      title: "Cloud Migration",
      description: "Seamless migration to cloud platforms",
      icon: <Cloud className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Technical Support",
      description: "Ongoing maintenance and technical support",
      icon: <Monitor className="h-6 w-6 text-purple-500" />
    }
  ];

  return (
    <>
      <SEO 
        title="Our Services | Backend Development & DevOps Solutions - Innovixus"
        description="Comprehensive backend development, DevOps consulting, and cloud architecture services. Expert Node.js, Python, Golang development with CI/CD pipeline setup in Surat, Gujarat."
        url="https://innovixus.co/services"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Comprehensive <span className="gradient-text">IT Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From backend development to DevOps automation, we provide end-to-end technology solutions 
              tailored to your business needs
            </p>
            <Link href="/contact">
              <Button className="btn-primary">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${service.gradient} rounded-full text-foreground font-semibold mb-4`}>
                    {service.icon}
                    <span className="ml-2">{service.title}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">{service.title} Excellence</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="bg-white p-4 rounded-lg shadow-sm border border-border">
                        <div className="flex items-center space-x-2 mb-2">
                          {feature.icon}
                          <h4 className="font-semibold text-foreground">{feature.text}</h4>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <h4 className="font-semibold text-foreground mb-3">Technologies We Use:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link href="/contact">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={service.image}
                    alt={`${service.title} illustration`}
                    className="rounded-2xl shadow-xl w-full hover-lift"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Additional Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support services to complement our core offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover-lift">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your requirements and technical challenges" },
              { step: "02", title: "Planning", description: "Designing the optimal solution architecture and timeline" },
              { step: "03", title: "Development", description: "Building and testing your solution with regular updates" },
              { step: "04", title: "Delivery", description: "Deployment, training, and ongoing support" }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{phase.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.description}</p>
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
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/success-stories">
                <Button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  View Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
