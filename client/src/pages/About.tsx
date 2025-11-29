import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  ArrowRight, 
  CheckCircle, 
  Users, 
  Award, 
  Zap, 
  Target,
  Heart,
  Shield,
  Clock
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Innovation First",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions that give our clients a competitive advantage."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-accent" />,
      title: "Quality Assured",
      description: "Rigorous testing, code reviews, and best practices ensure every solution we deliver meets the highest standards."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-600" />,
      title: "Client Partnership",
      description: "We work as an extension of your team, understanding your business goals and growing together with you."
    },
    {
      icon: <Clock className="h-6 w-6 text-orange-600" />,
      title: "Agile Delivery",
      description: "Fast, iterative development cycles with regular feedback loops to ensure we're always aligned with your vision."
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Security First",
      description: "Security is built into every layer of our solutions, from code to infrastructure to deployment."
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "Passionate Team",
      description: "Our team is passionate about technology and committed to solving complex challenges with creative solutions."
    }
  ];

  return (
    <>
      <SEO 
        title="About Innovixus | Expert Backend & DevOps Team in Surat, Gujarat"
        description="Learn about Innovixus IT Services - a passionate team of backend developers and DevOps engineers in Surat, Gujarat, dedicated to delivering innovative technology solutions."
        url="https://innovixus.co/about"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                About <span className="gradient-text">Innovixus</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We're a passionate team of technologists based in Surat, Gujarat, dedicated to transforming 
                complex backend challenges into simple, scalable solutions.
              </p>
              <Link href="/contact">
                <Button className="btn-primary" data-testid="button-work-with-us">
                  Work With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Team collaboration meeting with laptops and planning documents"
                className="rounded-2xl shadow-xl w-full hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern tech office workspace with multiple monitors and development setup"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  Founded in the vibrant tech hub of Surat, Gujarat, Innovixus was born from a simple belief: 
                  every startup and enterprise deserves world-class backend infrastructure and DevOps excellence.
                </p>
                <p>
                  Our journey began when our founders recognized the growing gap between ambitious business ideas 
                  and the technical expertise needed to scale them effectively. We bridge that gap with cutting-edge 
                  solutions and personalized consulting.
                </p>
                <p>
                  Today, we've helped over 50 companies transform their technology infrastructure, from early-stage 
                  startups to established enterprises, enabling them to scale confidently and efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Mission & Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're driven by a mission to empower businesses with reliable, scalable technology infrastructure 
              that grows with their ambitions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower businesses with reliable, scalable technology infrastructure that grows with their 
                ambitions, enabling them to focus on what they do best while we handle the complex technical challenges.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the trusted technology partner for innovative companies worldwide, known for our technical 
                excellence, reliability, and commitment to client success.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Work Together?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's discuss how we can help transform your technology infrastructure and accelerate your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300" data-testid="button-start-project">
                  Start a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300" data-testid="button-view-services">
                  View Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
