import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
    import { Wrench, ArrowLeft, Construction, Settings } from 'lucide-react';

export const UnderConstruction = () => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center">
          <CardHeader className="pb-6">
            <div className="mx-auto bg-primary/10 rounded-full h-24 w-24 flex items-center justify-center mb-6">
              <Construction className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">
              Engineering Under Progress...
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              We're working hard to bring you something amazing. This feature is currently under development.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="text-sm">Our team is building something special</span>
            </div>
            
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};