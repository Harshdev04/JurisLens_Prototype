import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function analyze(text: string) {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);
  const summary = sentences.slice(0, 3).join(" ");
  const lower = text.toLowerCase();
  const flags = [
    { key: "perpetual", label: "Perpetual obligations" },
    { key: "irrevocable", label: "Irrevocable rights" },
    { key: "sole discretion", label: "Counterparty sole discretion" },
    { key: "without notice", label: "Changes without notice" },
    { key: "limitation of liability", label: "Liability limitations" },
    { key: "indemn", label: "Indemnification" },
  ]
    .filter((f) => lower.includes(f.key))
    .map((f) => f.label);

  const keyTerms: string[] = [];
  const candidates = [
    "Term", "Payment", "Confidential", "Liability", "Indemnification", "Termination", "Governing Law", "Arbitration", "Assignment",
  ];
  for (const c of candidates) {
    const re = new RegExp(`\\b${c}\\b`, "i");
    if (re.test(text)) keyTerms.push(c);
  }

  const actions = [
    "Review indemnification scope with legal counsel.",
    "Confirm termination notice period is acceptable.",
    "Verify governing law and venue match your preference.",
  ];

  return { summary, keyTerms, risks: flags, actions };
}

export default function Playground() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ReturnType<typeof analyze> | null>(null);

  const disabled = useMemo(() => input.trim().length < 40, [input]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Playground
        </h1>
        <p className="mt-2 text-muted-foreground">
          Paste a clause or section to test the analyzer.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[260px]"
                placeholder="Paste legal text here..."
              />
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-muted-foreground">
                  Minimum ~40 characters
                </span>
                <Button disabled={disabled} onClick={() => setResult(analyze(input))}>
                  Analyze
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <Tabs defaultValue="summary">
                  <TabsList>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="terms">Key Terms</TabsTrigger>
                    <TabsTrigger value="risks">Risks</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="summary">
                    <p className="leading-relaxed">{result.summary || "No summary found."}</p>
                  </TabsContent>
                  <TabsContent value="terms">
                    <ul className="list-disc space-y-1 pl-5">
                      {result.keyTerms.length ? (
                        result.keyTerms.map((t) => <li key={t}>{t}</li>)
                      ) : (
                        <li>No explicit headings detected.</li>
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="risks">
                    <ul className="list-disc space-y-1 pl-5">
                      {result.risks.length ? (
                        result.risks.map((r) => <li key={r}>{r}</li>)
                      ) : (
                        <li>No red flags found.</li>
                      )}
                    </ul>
                  </TabsContent>
                  <TabsContent value="actions">
                    <ul className="list-disc space-y-1 pl-5">
                      {result.actions.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              ) : (
                <p className="text-muted-foreground">Run an analysis to see results.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
