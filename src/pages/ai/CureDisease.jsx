import { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select.jsx";
import { Loader2, Stethoscope, AlertTriangle, Heart } from "lucide-react";

export function CureDisease() {
  const [condition, setCondition] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [solutions, setSolutions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!condition.trim()) {
      alert("Please enter a condition.");
      return;
    }

    setIsLoading(true);
    setSolutions(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockSolutions = {
        condition: condition,
        generalAdvice: [
          "Consult with a healthcare professional for proper diagnosis",
          "Maintain a healthy diet rich in iron and vitamins",
          "Stay hydrated and get adequate rest",
          "Monitor your symptoms regularly"
        ],
        lifestyleChanges: [
          "Regular exercise to improve circulation",
          "Stress management techniques",
          "Avoid smoking and excessive alcohol consumption",
          "Maintain a regular sleep schedule"
        ],
        dietaryRecommendations: [
          "Iron-rich foods like spinach, red meat, and legumes",
          "Vitamin C to improve iron absorption",
          "Folate-rich foods for blood cell production",
          "Omega-3 fatty acids for cardiovascular health"
        ],
        warningSigns: [
          "Severe fatigue or weakness",
          "Shortness of breath",
          "Chest pain",
          "Rapid heartbeat",
          "Dizziness or fainting"
        ]
      };

      setSolutions(mockSolutions);
    } catch (error) {
      console.error("Disease Solutions error:", error);
      alert("Failed to get solutions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Blood Disease Solutions
        </h1>
        <p className="text-muted-foreground mt-2">
          Get AI-powered informational recommendations and lifestyle adjustments for managing blood diseases.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Condition Information
          </CardTitle>
          <CardDescription>
            Please provide details about the blood condition you're seeking information about.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="condition">Blood Condition</Label>
              <Input
                id="condition"
                placeholder="e.g., Anemia, Hemophilia, Leukemia..."
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="symptoms">Symptoms (Optional)</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe any symptoms you're experiencing..."
                rows={4}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Get Solutions
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-muted-foreground">Our AI is analyzing your condition and preparing recommendations...</p>
        </div>
      )}

      {solutions && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold font-headline text-center text-primary">
            Solutions for {solutions.condition}
          </h2>
          
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                General Advice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {solutions.generalAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Lifestyle Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {solutions.lifestyleChanges.map((change, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>Dietary Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {solutions.dietaryRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                Warning Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Seek immediate medical attention if you experience any of these symptoms:
              </p>
              <ul className="space-y-2">
                {solutions.warningSigns.map((sign, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-destructive">⚠</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 