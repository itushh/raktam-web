import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Label } from "../components/ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert.jsx";
import { Lightbulb } from "lucide-react";

export function RequestBlood() {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    return (
        <div className="container mx-auto max-w-4xl p-4 md:p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold font-headline text-primary">Request Blood</h1>
                <p className="text-muted-foreground mt-2">Fill out the form below to find a donor. Your request will be shared privately with potential matches.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patient Information</CardTitle>
                            <CardDescription>Please provide accurate details for the patient in need.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="patient-name">Patient Full Name</Label>
                                        <Input id="patient-name" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="blood-type">Required Blood Type</Label>
                                        <Select>
                                            <SelectTrigger id="blood-type">
                                                <SelectValue placeholder="Select blood type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bloodTypes.map(type => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Hospital/Location</Label>
                                    <Input id="location" placeholder="City General Hospital, 123 Main St" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-person">Contact Person</Label>
                                        <Input id="contact-person" placeholder="Jane Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-number">Contact Number</Label>
                                        <Input id="contact-number" type="tel" placeholder="+1 (555) 123-4567" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="urgency">Urgency</Label>
                                    <Select>
                                        <SelectTrigger id="urgency">
                                            <SelectValue placeholder="Select urgency level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="critical">Critical (within 24 hours)</SelectItem>
                                            <SelectItem value="urgent">Urgent (within 2-3 days)</SelectItem>
                                            <SelectItem value="standard">Standard (within a week)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notes">Additional Notes</Label>
                                    <Textarea id="notes" placeholder="Any additional information or context." />
                                </div>
                                <Button type="submit" className="w-full md:w-auto">Submit Request</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-6">
                    <Card className="bg-secondary">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Lightbulb className="text-primary h-5 w-5" />
                                AI Suggestions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground space-y-3">
                            <p>Based on your location and blood type, we suggest contacting:</p>
                            <ul className="list-disc list-inside">
                                <li>Regional Blood Bank (5 miles away)</li>
                                <li>Hope Medical Center (8 miles away)</li>
                            </ul>
                            <p>We've also identified <strong>5 potential donors</strong> in a 10-mile radius.</p>
                        </CardContent>
                    </Card>
                    <Alert>
                        <AlertTitle>Your Privacy Matters</AlertTitle>
                        <AlertDescription>
                            Your personal contact information will only be shared with confirmed and willing donors.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
        </div>
    );
} 