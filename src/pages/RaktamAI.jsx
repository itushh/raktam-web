import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { ArrowRight, BrainCircuit, Stethoscope, Target } from "lucide-react";

const aiTools = [
    {
        icon: <BrainCircuit className="h-10 w-10 text-primary" />,
        title: "Blood Report Analysis",
        description: "Upload your blood test report and get AI-powered insights, analysis, and personalized recommendations.",
        link: "/ai/blood-report-analysis",
        badge: "New",
    },
    {
        icon: <Stethoscope className="h-10 w-10 text-primary" />,
        title: "Blood Disease Awareness",
        description: "Get AI-powered informational recommendations and lifestyle adjustments for managing blood diseases.",
        link: "/ai/cure-disease-awareness",
        badge: "Education",
    },
    {
        icon: <Target className="h-10 w-10 text-primary" />,
        title: "Blood Health Booster",
        description: "Receive tailored diet, exercise, and lifestyle tips based on your unique health profile to improve blood health.",
        link: "/ai/health-booster",
        badge: "Health",
    },
];

export function RaktamAI() {
    return (
        <div className="container mx-auto max-w-5xl p-4 md:p-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">Welcome to Raktam AI</h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">Your personal AI health assistant. Use our cutting-edge tools to gain insights and improve your well-being.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTools.map((tool) => (
                    <Card key={tool.title} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="flex-grow">
                            <div className="mb-4 flex justify-between items-start">
                                {tool.icon}
                                <span className="text-xs font-semibold bg-primary/10 text-primary py-1 px-2 rounded-full">{tool.badge}</span>
                            </div>
                            <CardTitle className="font-headline text-xl">{tool.title}</CardTitle>
                            <CardDescription className="pt-2">{tool.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to={tool.link} className="font-semibold text-primary inline-flex items-center group">
                                Use Tool
                                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
} 