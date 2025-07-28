import { Link } from "react-router-dom";
import { Button } from "../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.jsx";
import { Droplets, Heart, History, PlusCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext.jsx";

export function Dashboard() {
  const { user } = useAuth();
  
  const donationHistory = [
    { date: "2023-10-15", location: "City Hospital", status: "Completed" },
    { date: "2023-04-20", location: "Community Blood Drive", status: "Completed" },
  ];
  
  const activeRequests = [
     { date: "2024-07-20", bloodType: "O+", status: "Pending"},
  ];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">Welcome, {user?.name || 'User'}!</h1>
          <p className="text-muted-foreground">Here is an overview of your Raktam Connect activity.</p>
        </div>
        <div className="flex gap-2">
           <Button asChild>
            <Link to="/request-blood">
              <Droplets className="mr-2 h-4 w-4" /> Request Blood
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/raktam-ai">
              Explore Raktam AI
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              You've potentially saved up to 6 lives!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Next Donation Due</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">In 3 weeks</div>
            <p className="text-xs text-muted-foreground">
              Based on your last donation.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              Currently open requests for blood.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-8 mt-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>A record of your past donations.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donationHistory.map((donation, index) => (
                        <TableRow key={index}>
                            <TableCell>{donation.date}</TableCell>
                            <TableCell>{donation.location}</TableCell>
                            <TableCell className="text-green-600">{donation.status}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>My Active Requests</CardTitle>
                <CardDescription>Requests you have made for blood.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request Date</TableHead>
                            <TableHead>Blood Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activeRequests.length > 0 ? activeRequests.map((req, index) => (
                        <TableRow key={index}>
                            <TableCell>{req.date}</TableCell>
                            <TableCell>{req.bloodType}</TableCell>
                            <TableCell className="text-orange-500">{req.status}</TableCell>
                        </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">No active requests.</TableCell>
                          </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

    </div>
  );
} 