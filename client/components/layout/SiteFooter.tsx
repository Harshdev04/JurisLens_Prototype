export default function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>
            © {new Date().getFullYear()} JurisLens. Demystifying legal documents with AI.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="hover:text-foreground/80"
              aria-label="Home"
            >
              Home
            </a>
            <a
              href="/playground"
              className="hover:text-foreground/80"
              aria-label="Playground"
            >
              Playground
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
