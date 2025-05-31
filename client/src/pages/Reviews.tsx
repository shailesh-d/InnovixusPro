import { useQuery } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Users, ThumbsUp, MessageCircle } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Reviews() {
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"]
  });

  const overallRating = testimonials.length > 0 
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : "0.0";

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: testimonials.filter(t => t.rating === rating).length,
    percentage: testimonials.length > 0 
      ? (testimonials.filter(t => t.rating === rating).length / testimonials.length) * 100
      : 0
  }));

  return (
    <>
      <SEO 
        title="Client Reviews & Testimonials | What Our Clients Say - Innovixus"
        description="Read genuine reviews and testimonials from our satisfied clients. Discover why businesses choose Innovixus for their backend development and DevOps needs."
        url="https://innovixus.co/reviews"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Client <span className="gradient-text">Reviews</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Don't just take our word for it. Here's what our clients say about working with Innovixus 
              and the results we've delivered together.
            </p>
          </div>

          {/* Overall Rating */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mt-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground mb-2">{overallRating}</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${i < Math.floor(parseFloat(overallRating)) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="text-muted-foreground">Based on {testimonials.length} reviews</p>
              </div>
              
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground w-6">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="h-8 w-8 text-primary" />, value: "50+", label: "Happy Clients" },
              { icon: <ThumbsUp className="h-8 w-8 text-accent" />, value: "98%", label: "Satisfaction Rate" },
              { icon: <MessageCircle className="h-8 w-8 text-purple-600" />, value: "24/7", label: "Support Response" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-5 h-5 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-3 mb-6">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">No reviews yet</h3>
              <p className="text-muted-foreground mb-6">
                Be one of our first clients and help us build our testimonials!
              </p>
              <Link href="/contact">
                <Button className="btn-primary">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Testimonial */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center text-yellow-300 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-8 h-8 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed italic">
                  "{testimonials[0].content}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  {testimonials[0].avatar && (
                    <img
                      src={testimonials[0].avatar}
                      alt={testimonials[0].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <div className="font-semibold text-lg">{testimonials[0].name}</div>
                    <div className="opacity-90">{testimonials[0].position}, {testimonials[0].company}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Client Logos */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Leading Companies</h2>
            <p className="text-muted-foreground">Join the growing list of satisfied clients</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              "TechCart Solutions", "SecureBank API", "SmartCity Systems", 
              "MediConnect", "StartupFlow", "AnalyticsHub"
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-muted-foreground">
                    {company.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the same level of excellence our clients rave about. Let's start your project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/success-stories">
                <Button className="btn-secondary">
                  View Success Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
