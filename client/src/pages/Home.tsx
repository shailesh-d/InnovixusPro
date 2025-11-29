import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import BlogCard from "@/components/BlogCard";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Server, 
  Settings, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle,
  Users,
  Award,
  Zap
} from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Home() {
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"]
  });

  const services = [
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Backend Development",
      description: "Robust, scalable backend solutions using Node.js, Python, and Golang for high-performance applications.",
      features: [
        "RESTful & GraphQL APIs",
        "Database Architecture", 
        "Microservices Design"
      ],
      gradient: "from-blue-50 to-white"
    },
    {
      icon: <Settings className="h-8 w-8 text-accent" />,
      title: "DevOps & CI/CD",
      description: "Streamlined deployment pipelines, infrastructure automation, and continuous monitoring solutions.",
      features: [
        "CI/CD Pipeline Setup",
        "Infrastructure as Code",
        "Monitoring & Analytics"
      ],
      gradient: "from-green-50 to-white"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
      title: "Architecture Consulting",
      description: "Strategic technology consulting and scalable cloud architecture planning for sustainable growth.",
      features: [
        "Cloud Strategy",
        "System Architecture",
        "Performance Optimization"
      ],
      gradient: "from-purple-50 to-white"
    }
  ];

  return (
    <>
      <SEO 
        keywords="backend development, devops, nodejs, python, golang, cloud architecture, IT services, surat, startup solutions"
      />
      
      {/* Hero Section */}
      <Hero />

      {/* Services Preview */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Our Core Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT solutions designed to accelerate your business growth with modern technology stack
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern tech office workspace with multiple monitors and development setup"
                className="rounded-2xl shadow-xl w-full hover-lift"
              />
            </div>
            <div className="mt-12 lg:mt-0">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">About Innovixus</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2019 in Surat, Gujarat, Innovixus emerged from a vision to bridge the gap between 
                innovative technology and practical business solutions. We're a passionate team of developers, 
                DevOps engineers, and consultants dedicated to empowering businesses with robust, scalable technology.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our mission is to transform complex technical challenges into simple, efficient solutions that 
                drive business growth and innovation.
              </p>

              {/* Company Values */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: <Zap className="h-4 w-4 text-primary" />, title: "Innovation First", desc: "Cutting-edge solutions for modern challenges" },
                  { icon: <CheckCircle className="h-4 w-4 text-accent" />, title: "Quality Assured", desc: "Rigorous testing and best practices" },
                  { icon: <Users className="h-4 w-4 text-purple-600" />, title: "Client Focused", desc: "Your success is our primary goal" },
                  { icon: <Award className="h-4 w-4 text-orange-600" />, title: "Agile Delivery", desc: "Fast, iterative development cycles" }
                ].map((value, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about">
                <Button className="btn-primary">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {blogPosts.length > 0 && (
        <section className="section-padding bg-white dark:bg-gray-900">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Latest Insights</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Stay updated with the latest trends in backend development, DevOps practices, and technology insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/blog">
                <Button className="btn-primary">
                  View All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent">
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Transform Your Infrastructure?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Let's discuss how we can help you build scalable, reliable systems that drive your business forward.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
