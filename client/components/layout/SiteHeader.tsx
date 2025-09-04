import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const location = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-violet-600 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M4 12c0-4.418 3.582-8 8-8 1.77 0 3.405.574 4.72 1.54l-2.04 2.04A5.97 5.97 0 0 0 12 6C8.686 6 6 8.686 6 12s2.686 6 6 6a5.97 5.97 0 0 0 5.58-3.68l2.04 2.04A7.963 7.963 0 0 1 12 20c-4.418 0-8-3.582-8-8Z" fill="currentColor" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight">JurisLens</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                isActive || location.pathname === "/"
                  ? "text-foreground"
                  : "text-foreground/60",
              )
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/playground"
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                isActive ? "text-foreground" : "text-foreground/60",
              )
            }
          >
            Playground
          </NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/#analyze">Try it now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
