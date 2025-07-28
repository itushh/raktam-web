import { useState } from "react";
import { Button } from "../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Textarea } from "../../components/ui/textarea.jsx";
import { Label } from "../../components/ui/label.jsx";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

export function CBTAnalysis() {
  const [anxietyDescription, setAnxietyDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (anxietyDescription.length < 20) {
      alert("Please describe your anxiety in at least 20 characters.");
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = {
        techniques: `Based on your description, here are some CBT techniques that may help:

1. **Cognitive Restructuring**: Challenge negative thoughts about blood tests by asking yourself:
   - What evidence supports this thought?
   - What evidence contradicts it?
   - What would I tell a friend in this situation?

2. **Exposure Therapy**: Gradually expose yourself to blood-related situations:
   - Start by looking at pictures of medical equipment
   - Progress to watching videos of blood donations
   - Eventually visit a medical facility without getting a test

3. **Relaxation Techniques**: Practice deep breathing and progressive muscle relaxation before and during blood tests.`,
        
        copingStrategies: `Here are some actionable coping strategies:

**Immediate Techniques:**
- Take slow, deep breaths (4-7-8 breathing technique)
- Use grounding exercises (5-4-3-2-1 sensory technique)
- Practice positive self-talk

**Long-term Strategies:**
- Schedule blood tests at times when you're well-rested
- Bring a support person with you
- Reward yourself after successful blood tests
- Keep a journal to track your progress and triggers

**Professional Support:**
- Consider working with a therapist specializing in anxiety
- Join support groups for medical anxiety
- Learn more about the blood donation/testing process to reduce fear of the unknown`
      };

      setAnalysisResult(mockResult);
    } catch (error) {
      console.error("CBT Analysis failed:", error);
      alert("Failed to get analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          CBT for Anxiety Analysis
        </h1>
        <p className="text-muted-foreground mt-2">
          Describe your anxieties related to blood health, and our AI will provide
          <br />
          Cognitive Behavioral Therapy techniques to help you cope.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Thoughts & Feelings</CardTitle>
          <CardDescription>
            In the space below, please describe what makes you anxious about blood tests, donations, or your general blood health. The more detail you provide, the better the AI can assist you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="anxietyDescription">Anxiety Description</Label>
              <Textarea
                id="anxietyDescription"
                placeholder="e.g., I feel faint when I see needles, or I worry constantly about my iron levels..."
                rows={6}
                value={anxietyDescription}
                onChange={(e) => setAnxietyDescription(e.target.value)}
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
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get AI Analysis
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Our AI is preparing your personalized coping strategies...</p>
        </div>
      )}

      {analysisResult && (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold font-headline text-center text-primary">Your Personalized Analysis</h2>
            <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Wand2/> Recommended CBT Techniques</CardTitle>
                </CardHeader>
                <CardContent className="whitespace-pre-wrap font-body text-foreground">
                    {analysisResult.techniques}
                </CardContent>
            </Card>
            <Card className="bg-secondary">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sparkles/> Actionable Coping Strategies</CardTitle>
                </CardHeader>
                <CardContent className="whitespace-pre-wrap font-body text-foreground">
                    {analysisResult.copingStrategies}
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
} 