import { Link } from "react-router-dom";
import { Logo } from "./Logo.jsx";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 mt-auto">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Logo className="h-6 w-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Raktam Connect. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
} 