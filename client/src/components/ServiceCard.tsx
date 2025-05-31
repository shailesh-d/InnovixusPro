import { ReactNode } from "react";
import { CheckCircle } from "lucide-react";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  gradient: string;
}

export default function ServiceCard({ icon, title, description, features, gradient }: ServiceCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-8 rounded-2xl hover:shadow-xl transition-all duration-300 group hover-lift`}>
      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
