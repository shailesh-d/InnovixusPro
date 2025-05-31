import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SuccessStory } from "@shared/schema";

interface SuccessStoryCardProps {
  story: SuccessStory;
}

export default function SuccessStoryCard({ story }: SuccessStoryCardProps) {
  const getGradientClass = (index: number) => {
    const gradients = [
      "from-blue-50 to-white",
      "from-green-50 to-white",
      "from-purple-50 to-white",
      "from-orange-50 to-white"
    ];
    return gradients[index % gradients.length];
  };

  const getIconColorClass = (index: number) => {
    const colors = [
      "text-primary",
      "text-accent",
      "text-purple-600",
      "text-orange-600"
    ];
    return colors[index % colors.length];
  };

  return (
    <div className={`bg-gradient-to-br ${getGradientClass(story.id)} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover-lift`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{story.title}</h3>
          <p className="text-primary font-semibold">{story.client}</p>
        </div>
        <div className={`bg-white/50 p-3 rounded-xl ${getIconColorClass(story.id)}`}>
          <ExternalLink className="w-8 h-8" />
        </div>
      </div>

      <p className="text-muted-foreground mb-6 leading-relaxed">
        {story.description}
      </p>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-accent mb-1">{story.metric1Value}</div>
          <div className="text-sm text-muted-foreground">{story.metric1Label}</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">{story.metric2Value}</div>
          <div className="text-sm text-muted-foreground">{story.metric2Label}</div>
        </div>
      </div>

      {story.technologies && (
        <div className="flex flex-wrap gap-2 mb-6">
          {story.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <Button variant="outline" className="w-full">
        Read Full Case Study
        <ExternalLink className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}
