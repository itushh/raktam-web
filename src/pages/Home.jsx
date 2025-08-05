import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { ArrowRight, Heart, Users, BrainCircuit, BotMessageSquare, Stethoscope, Target, HandHelping, Bot, HeartHandshake, Droplet } from "lucide-react";

export function Home() {
  const features = [
    {
      icon: <img src="/donate-blood.svg" />,
      title: "Become a Donor",
      description: "Join our community of heroes and save lives with your donation.",
      link: "/register",
    },
    {
      icon: <img className="p-2.5" src="raktam-ai.svg" />,
      title: "Raktam AI",
      description: "Get personalized AI insights for your blood health and well-being.",
      link: "/raktam-ai",
    },
    {
      icon: <img src="/blood-cells.svg" />,
      title: "Request Blood",
      description: "Quickly connect with voluntary blood donors in your area.",
      link: "/request-blood",
    },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      title: "Register or Request",
      description: "Sign up as a life-saving donor or create a request for blood in minutes.",
    },
    {
      step: 2,
      title: "Get Matched",
      description: "Our system privately matches requesters with nearby, compatible donors.",
    },
    {
      step: 3,
      title: "Coordinate & Donate",
      description: "Connect securely to coordinate the donation and save a life.",
    },
  ];

  const aiFeatures = [
    {
      icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
      title: "Blood Test Insights",
      description: "Get personalized insights and recommendations for your blood health."
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      title: "Blood Disease Awareness",
      description: "Receive informational recommendations for managing various blood conditions."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Blood Health Booster",
      description: "Get diet, exercise, and lifestyle tips tailored to your unique profile."
    }
  ]

  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold font-headline text-primary mb-4">Connect. Donate. Save Lives.</h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">Raktam Connect is a modern platform for blood donation, enhanced with AI to help you manage your blood health intelligently.</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" asChild><Link to="/request-blood">Request Blood <ArrowRight className="ml-2 h-5 w-5" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/register">Become a Donor</Link></Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center transform hover:scale-95 transition-transform duration-300 shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold font-headline text-primary">How It Works</h3>
            <p className="text-lg text-muted-foreground mt-2">A simple, three-step process to connect and save lives.</p>
          </div>
          <div className="relative grid md:grid-cols-3 gap-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 hidden md:block"></div>
            {howItWorksSteps.map((step) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                <div className="z-10 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">{step.step}</div>
                <h4 className="text-xl font-bold font-headline mb-2">{step.title}</h4>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Raktam AI */}
      <section id="raktam-ai" className="py-16 px-16 md:px-24 lg:px-40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Meet Raktam AI</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Go beyond donation. Raktam AI is your personal health companion, offering intelligent tools to help you understand and improve your blood health.
              </p>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 bg-primary/10 rounded-lg h-12 w-12 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{feature.title}</h4>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="mt-8">
                <Link to="/raktam-ai">Explore AI Tools <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </div>
            <div className="flex justify-center items-center">
              <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <img src="/raktam-bot.svg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section id="mission" className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center mb-4">
            <Target className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold font-headline text-primary">Our Mission</h3>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mt-4">
            To build a healthier future by fostering a strong community of blood donors and empowering individuals with accessible, AI-driven health knowledge.
          </p>
        </div>
      </section>
    </div>
  );
} 