import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-400">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
      </div>
      <blockquote className="text-muted-foreground mb-6 italic leading-relaxed">
        "{testimonial.content}"
      </blockquote>
      <div className="flex items-center">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={`Portrait of ${testimonial.name}`}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        )}
        <div>
          <div className="font-semibold text-foreground">{testimonial.name}</div>
          <div className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}
