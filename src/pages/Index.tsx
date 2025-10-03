import { BreedDetector } from "@/components/BreedDetector";
import { FeatureCards } from "@/components/FeatureCards";

const Index = () => {
  return (
    <div className="min-h-screen">
      <BreedDetector />
      <FeatureCards />
      
      {/* Daily Tip Banner */}
      <section className="py-8 px-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-2xl p-6 shadow-lg border-2 border-primary/20">
            <div className="flex items-start gap-4">
              <span className="text-4xl">💡</span>
              <div>
                <h3 className="text-xl font-bold mb-2">Daily Farming Tip</h3>
                <p className="text-muted-foreground">
                  Did you know? Gir cows produce A2 milk which is highly nutritious and easier to digest than regular milk. 
                  This makes them one of the most valuable indigenous breeds in India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-muted-foreground mb-4">
            Built with ❤️ for Indian Farmers
          </p>
          <p className="text-sm text-muted-foreground">
            Empowering farmers with AI-powered cattle management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
