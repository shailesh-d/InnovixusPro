import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-xl animate-bounce-subtle"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-xl animate-bounce-subtle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container-custom section-padding">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="gradient-text">Innovating</span> Reliable<br />
              <span className="gradient-text">Backend & DevOps</span><br />
              Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Empowering startups and enterprises with cutting-edge backend development, 
              DevOps automation, and scalable cloud architecture solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/contact">
                <Button className="btn-primary">
                  Start Your Project
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button className="btn-secondary">
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Modern tech dashboard showing backend services and DevOps monitoring"
                className="rounded-2xl shadow-2xl w-full hover-lift"
              />

              {/* Floating cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg glass-effect">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-sm font-semibold">Backend Active</span>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg glass-effect">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm font-semibold">DevOps Running</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
