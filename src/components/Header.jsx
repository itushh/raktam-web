import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Droplets, BrainCircuit, LayoutDashboard, LogIn, UserPlus, LogOut } from "lucide-react";
import { Button } from "./ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet.jsx";
import { Logo } from "./Logo.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

const navItems = [
  { href: "/donate", label: "Donate Blood", icon: LayoutDashboard },
  { href: "/raktam-ai", label: "Raktam AI", icon: BrainCircuit },
  { href: "/request", label: "Need Blood ?", icon: Droplets },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-primary">Raktam</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated() ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              </Button>
              <Button asChild>
                <Link to="/register">
                  <UserPlus className="mr-2 h-4 w-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo className="h-6 w-6 text-primary" />
                      <span className="font-bold font-headline text-primary">Raktam</span>
                    </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-md p-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto p-4 border-t flex flex-col gap-2">
                  {isAuthenticated() ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Link>
                      </Button>
                      <Button variant="outline" onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}>
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                           <LogIn className="mr-2 h-4 w-4" /> Login
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                           <UserPlus className="mr-2 h-4 w-4" /> Register
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 