import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import SuccessStoryCard from "@/components/SuccessStoryCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Award } from "lucide-react";
import type { SuccessStory } from "@shared/schema";

export default function SuccessStories() {
  const { data: successStories = [], isLoading } = useQuery<SuccessStory[]>({
    queryKey: ["/api/success-stories"]
  });

  const stats = [
    { icon: <TrendingUp className="h-6 w-6" />, value: "50+", label: "Projects Completed" },
    { icon: <Users className="h-6 w-6" />, value: "100K+", label: "Users Served" },
    { icon: <Award className="h-6 w-6" />, value: "99.9%", label: "Average Uptime" }
  ];

  return (
    <>
      <SEO 
        title="Success Stories | Client Case Studies & Project Results - Innovixus"
        description="Explore our successful projects and client transformations. Real results from backend development, DevOps implementation, and cloud architecture solutions."
        url="https://innovixus.co/success-stories"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Client <span className="gradient-text">Success Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Real results from our partnerships with forward-thinking companies. See how we've helped 
              businesses transform their technology infrastructure and achieve their goals.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="h-20 bg-gray-200 rounded mb-6"></div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <div className="h-8 bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="text-center">
                      <div className="h-8 bg-gray-200 rounded mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-6 w-16 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : successStories.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {successStories.map((story) => (
                <SuccessStoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">No success stories available</h3>
              <p className="text-muted-foreground mb-6">
                We're working on showcasing our latest project successes. Check back soon!
              </p>
              <Link href="/contact">
                <Button className="btn-primary">
                  Start Your Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Our Success Formula</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every successful project follows our proven methodology
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Deep Discovery", 
                description: "We thoroughly understand your business challenges, technical requirements, and growth objectives.",
                icon: <Users className="h-6 w-6" />
              },
              { 
                step: "02", 
                title: "Strategic Planning", 
                description: "Custom architecture design and implementation roadmap tailored to your specific needs.",
                icon: <TrendingUp className="h-6 w-6" />
              },
              { 
                step: "03", 
                title: "Agile Execution", 
                description: "Iterative development with regular check-ins and continuous feedback integration.",
                icon: <Award className="h-6 w-6" />
              },
              { 
                step: "04", 
                title: "Ongoing Partnership", 
                description: "Post-launch support, monitoring, and continuous optimization for sustained success.",
                icon: <ArrowRight className="h-6 w-6" />
              }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">{phase.step}</span>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-accent">{phase.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{phase.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Industries We Serve</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our expertise spans across various industries and business models
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "E-commerce", icon: "🛒", description: "Scalable platforms for online retail" },
              { name: "FinTech", icon: "💳", description: "Secure financial applications" },
              { name: "HealthTech", icon: "🏥", description: "HIPAA-compliant healthcare systems" },
              { name: "EdTech", icon: "🎓", description: "Educational platforms and tools" },
              { name: "IoT & Smart Cities", icon: "🌆", description: "Connected device ecosystems" },
              { name: "SaaS", icon: "☁️", description: "Software-as-a-Service platforms" },
              { name: "Logistics", icon: "📦", description: "Supply chain management systems" },
              { name: "Media & Entertainment", icon: "🎬", description: "Content delivery platforms" }
            ].map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our growing list of successful clients. Let's discuss how we can help transform 
              your technology infrastructure and achieve exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
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
