import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Analysis = ReturnType<typeof analyze>;

function analyze(text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  const sentences = clean.split(/(?<=[.!?])\s+/);
  const summary = sentences.slice(0, 3).join(" ");

  const lower = clean.toLowerCase();
  const risks = [
    { key: "perpetual", label: "Perpetual obligations" },
    { key: "irrevocable", label: "Irrevocable license or rights" },
    {
      key: "sole discretion",
      label: "Counterparty operates at sole discretion",
    },
    { key: "without notice", label: "Changes or termination without notice" },
    { key: "limitation of liability", label: "Limitation of liability" },
    { key: "liability is limited", label: "Liability limitation" },
    { key: "indemn", label: "Indemnification obligations" },
    { key: "non-exclusive", label: "Non-exclusive obligations/rights" },
  ]
    .filter((f) => lower.includes(f.key))
    .map((f) => f.label);

  const headings = [
    "Term",
    "Payment",
    "Fees",
    "Confidential",
    "Liability",
    "Indemnification",
    "Termination",
    "Governing Law",
    "Arbitration",
    "Assignment",
    "Warranty",
    "License",
  ];
  const keyTerms: string[] = [];
  for (const h of headings) {
    const re = new RegExp(`(^|\n|\r)\s*${h}([^A-Za-z]|$)`, "i");
    if (re.test(text)) keyTerms.push(h);
  }

  const actions = [
    "Validate that confidentiality obligations align with internal policy.",
    "Confirm termination notice period and cure rights.",
    "Ensure governing law and venue are acceptable.",
  ];

  return { summary, keyTerms, risks, actions };
}

function downloadJSON(filename: string, data: Analysis) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const SAMPLE_TEXT = `This Non-Disclosure Agreement ("Agreement") is entered into as of the Effective Date. Confidential Information shall mean any information disclosed by either party that is designated as confidential. Term and Termination: This Agreement commences on the Effective Date and continues for one (1) year, unless earlier terminated upon thirty (30) days' written notice. Parties agree that disclosure may be made on a non-exclusive basis. Limitation of Liability: In no event shall either party be liable for indirect or consequential damages; liability is limited to the fees paid in the twelve (12) months preceding the claim. Governing Law: This Agreement shall be governed by the laws of the State of California. Indemnification: Each party shall indemnify and hold the other harmless from third-party claims arising out of breach of this Agreement.`;

export default function Index() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<Analysis | null>(null);

  const disabled = useMemo(() => text.trim().length < 40, [text]);

  const onFile = async (file: File) => {
    setFileName(file.name);
    const asText = await file.text();
    setText(asText);
  };

  const onAnalyze = () => setResult(analyze(text));

  return (
    <div className="relative">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background:radial-gradient(600px_400px_at_20%_10%,theme(colors.violet.500/0.25),transparent_70%),radial-gradient(600px_400px_at_80%_0%,theme(colors.indigo.500/0.18),transparent_70%)]" />
        <div className="container mx-auto grid gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live demo
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Generative AI for Demystifying
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                {" "}
                Legal Documents
              </span>
            </h1>
            <p className="mt-4 max-w-prose text-lg text-muted-foreground">
              JurisLens explains complex contracts in plain language, surfaces
              risks, and highlights the clauses that matter.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("analyze")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Try it now
              </Button>
              <a
                href="/playground"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Open playground
              </a>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl md:mt-0">
            <div className="rounded-xl border bg-card p-6 shadow-xl ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-violet-600 text-primary-foreground">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                    <path
                      d="M4 12c0-4.418 3.582-8 8-8 1.77 0 3.405.574 4.72 1.54l-2.04 2.04A5.97 5.97 0 0 0 12 6C8.686 6 6 8.686 6 12s2.686 6 6 6a5.97 5.97 0 0 0 5.58-3.68l2.04 2.04A7.963 7.963 0 0 1 12 20c-4.418 0-8-3.582-8-8Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">
                    Instant contract insights
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Summary, key terms, risks & actions
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> PII
                  safe by default
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />{" "}
                  Exportable reports
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="analyze" className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Analyze any legal text
            </h2>
            <p className="mt-2 text-muted-foreground">
              Paste text or upload a document to generate a plain-language
              report.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Input</CardTitle>
                <CardDescription>
                  Supports pasted text and simple .txt uploads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">
                    Upload a .txt file
                  </span>
                  <Input
                    type="file"
                    accept=".txt"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) onFile(f);
                    }}
                  />
                </label>
                {fileName ? (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Loaded: {fileName}
                  </p>
                ) : null}
                <div className="mt-4">
                  <span className="mb-2 block text-sm font-medium">
                    Or paste text
                  </span>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[220px]"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    Minimum ~40 characters
                  </span>
                  <Button onClick={onAnalyze} disabled={disabled}>
                    Analyze
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report</CardTitle>
                <CardDescription>
                  Human-friendly explanation generated from your input
                </CardDescription>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div>
                    <Tabs defaultValue="summary">
                      <TabsList>
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="terms">Key Terms</TabsTrigger>
                        <TabsTrigger value="risks">Risks</TabsTrigger>
                        <TabsTrigger value="actions">Actions</TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary">
                        <p className="leading-relaxed">
                          {result.summary || "No summary detected."}
                        </p>
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
                            <li>No obvious red flags found.</li>
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
                    <div className="mt-6">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          downloadJSON("jurislens-report.json", result)
                        }
                      >
                        Download JSON report
                      </Button>
                    </div>
                    <p className="mt-4 text-xs text-muted-foreground">
                      This tool provides automated analysis to aid understanding
                      and does not constitute legal advice.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Run an analysis to see the summary, key terms, risks, and
                    action items.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/20">
        <div className="container mx-auto grid gap-6 px-4 py-12 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">Accuracy you can trust</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Deterministic parsing highlights headings and common risk phrases
              while preserving your data locally.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Secure by design</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Runs entirely in your browser for pasted text. Server APIs can be
              added for enterprise use cases.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Exportable insights</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Download structured results to integrate with your workflows and
              review processes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
