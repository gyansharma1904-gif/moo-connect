import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Stethoscope } from "lucide-react";

interface FeatureCardData {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: FeatureCardData[] = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "🛒 Market / Shop",
    description: "Buy and sell cattle, fodder, medicines, and dairy products. Connect with local markets and mandis.",
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "⚕️ Common Diseases & Cure",
    description: "Learn about cattle diseases like Foot-and-Mouth, Mastitis, and more. Get prevention tips and treatment guides.",
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "❤️ Finding Mate",
    description: "Find ideal breeding partners for your cattle based on breed and region. Improve your herd genetics.",
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  }
];

export const FeatureCards = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything Farmers Need
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete toolkit for modern cattle farming
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-[var(--card-shadow)] hover:shadow-[var(--hover-shadow)] transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2 hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6">
                  {feature.description}
                </CardDescription>
                <Button variant="outline" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard value="50+" label="Cattle Breeds" />
          <StatCard value="100+" label="Disease Guides" />
          <StatCard value="1000+" label="Active Farmers" />
          <StatCard value="24/7" label="Support" />
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
  return (
    <div className="text-center p-6 bg-card rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">
        {label}
      </div>
    </div>
  );
};
