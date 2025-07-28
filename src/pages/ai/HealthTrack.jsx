import { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select.jsx";
import { Loader2, Target, Activity, Utensils, Moon, Eye } from "lucide-react";

export function HealthTrack() {
  const [age, setAge] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [tips, setTips] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const lifestyleOptions = ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!age || !bloodType) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);
    setTips(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTips = {
        dailyRoutine: [
          "Start your day with a glass of water",
          "Include 30 minutes of moderate exercise",
          "Practice stress-reduction techniques",
          "Take regular breaks from sitting"
        ],
        nutrition: [
          "Eat a balanced diet with plenty of fruits and vegetables",
          "Stay hydrated throughout the day",
          "Limit processed foods and added sugars",
          "Include lean proteins in your meals"
        ],
        sleep: [
          "Aim for 7-9 hours of quality sleep",
          "Maintain a consistent sleep schedule",
          "Create a relaxing bedtime routine",
          "Avoid screens 1 hour before bed"
        ],
        monitoring: [
          "Regular blood pressure checks",
          "Monitor your energy levels",
          "Keep track of any unusual symptoms",
          "Schedule regular health check-ups"
        ],
        bloodTypeSpecific: {
          "A+": "Focus on plant-based proteins and avoid red meat",
          "B+": "Include dairy and lean meats in moderation",
          "O+": "High-protein diet with lean meats and fish",
          "AB+": "Balanced diet with moderate portions"
        }
      };

      setTips(mockTips);
    } catch (error) {
      console.error("Health Tips error:", error);
      alert("Failed to get health tips. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Personalized Health Track
        </h1>
        <p className="text-muted-foreground mt-2">
          Receive tailored diet, exercise, and lifestyle tips based on your unique health profile to improve blood health.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Health Profile
          </CardTitle>
          <CardDescription>
            Provide your health information to receive personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="blood-type">Blood Type *</Label>
                <Select value={bloodType} onValueChange={setBloodType}>
                  <SelectTrigger id="blood-type">
                    <SelectValue placeholder="Select your blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="health-conditions">Health Conditions (Optional)</Label>
              <Input
                id="health-conditions"
                placeholder="e.g., Diabetes, Hypertension..."
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="lifestyle">Activity Level</Label>
              <Select value={lifestyle} onValueChange={setLifestyle}>
                <SelectTrigger id="lifestyle">
                  <SelectValue placeholder="Select your activity level" />
                </SelectTrigger>
                <SelectContent>
                  {lifestyleOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Tips...
                </>
              ) : (
                <>
                  <Target className="mr-2 h-4 w-4" />
                  Get Personalized Tips
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-muted-foreground">Our AI is creating your personalized health recommendations...</p>
        </div>
      )}

      {tips && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold font-headline text-center text-primary">
            Your Personalized Health Tips
          </h2>
          
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Daily Routine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.dailyRoutine.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Nutrition Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.nutrition.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="h-5 w-5" />
                Sleep & Recovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.sleep.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Health Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tips.monitoring.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {bloodType && tips.bloodTypeSpecific[bloodType] && (
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">
                  Blood Type {bloodType} Specific Advice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{tips.bloodTypeSpecific[bloodType]}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 