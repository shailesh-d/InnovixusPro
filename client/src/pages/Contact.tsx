import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock,
  Send,
  Linkedin,
  Twitter,
  Github,
  CheckCircle
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  return (
    <>
      <SEO 
        title="Contact Innovixus | Get in Touch - Backend & DevOps Solutions"
        description="Contact Innovixus IT Services for backend development, DevOps consulting, and cloud architecture solutions. Reach out to our team in Surat, Gujarat."
        url="https://innovixus.co/contact"
      />
      {renderContent(formData, setFormData, handleSubmit, contactMutation, toast)}
    </>
  );

  function renderContent(formData: ContactFormData, setFormData: any, handleSubmit: any, contactMutation: any, toast: any) {
    return (
      <>


  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEO 
        title="Contact Us | Get in Touch with Innovixus IT Services"
        description="Ready to transform your technology infrastructure? Contact Innovixus for expert backend development and DevOps consulting. Located in Surat, Gujarat."
        url="https://innovixus.co/contact"
      />

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-white to-blue-50">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Get In <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your technology infrastructure? Let's discuss your project and 
              explore how we can help your business scale.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name *
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="block text-sm font-semibold text-foreground mb-2">
                      Company (Optional)
                    </Label>
                    <Input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, challenges, and goals..."
                      className="w-full resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full btn-primary"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Location</h4>
                      <p className="text-muted-foreground">Surat, Gujarat, India</p>
                      <p className="text-sm text-muted-foreground">Available for remote and on-site consulting</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Email</h4>
                      <p className="text-muted-foreground">hello@innovixus.co</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                      <p className="text-muted-foreground">+91 XXX XXX XXXX</p>
                      <p className="text-sm text-muted-foreground">Available during business hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                      <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                      <p className="text-sm text-muted-foreground">Emergency support available 24/7</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://linkedin.com/company/innovixus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="https://twitter.com/innovixus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href="https://github.com/innovixus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Why Choose Innovixus?</h3>
                <div className="space-y-4">
                  {[
                    "Expert team with 5+ years experience",
                    "Proven track record with 50+ successful projects",
                    "24/7 support and maintenance",
                    "Competitive pricing with transparent billing",
                    "Agile methodology with regular updates",
                    "100% satisfaction guarantee"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Find Us</h2>
            <p className="text-muted-foreground">Located in the heart of Surat's tech district</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119066.54447931247!2d72.74109995307639!3d21.159340674622592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1639472234567!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Innovixus IT Services Location in Surat, Gujarat"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity, but most backend projects take 4-12 weeks, while DevOps setups typically take 2-6 weeks."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive maintenance and support packages with 24/7 monitoring and regular updates."
              },
              {
                question: "Can you work with our existing team?",
                answer: "Absolutely! We often collaborate with in-house development teams and can adapt to your existing workflows."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "We specialize in Node.js, Python, Golang, Docker, Kubernetes, AWS, and modern DevOps tools and practices."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground mb-3">{faq.question}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
