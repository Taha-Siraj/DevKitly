import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, HelpCircle, ArrowRight, BookOpen, Sparkles, RefreshCw, Cpu, ShieldCheck, Terminal, AlertTriangle, Layers } from "lucide-react";
import { toolsRegistry, getToolBySlug, getRelatedTools } from "../../lib/registry";
import { ToolIcon } from "../../components/Sidebar";
import FAQAccordion from "../../components/FAQAccordion";
import ToolRenderer from "../../components/ToolRenderer";
import { getSEODataForSlug } from "../../lib/seoContent";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes
export async function generateStaticParams() {
  return toolsRegistry.map((tool) => ({
    slug: tool.slug,
  }));
}

// Dynamic SEO tags
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);
  if (!tool) return {};

  const canonicalUrl = `https://devkitly.vercel.app/${tool.slug}`;

  return {
    title: `${tool.name} - 100% Free Offline Developer Tool`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: `${tool.name} | Offline Developer Tools`,
      description: tool.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.name} | Offline Developer Tools`,
      description: tool.description,
    },
    other: {
      "author": "DevKitly",
      "publisher": "DevKitly",
    }
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const resolvedParams = await params;
  const tool = getToolBySlug(resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);
  const seoData = getSEODataForSlug(tool.slug, tool.category);

  // Schema.org structured data definitions
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "DevKitly",
        "item": "https://devkitly.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": tool.category,
        "item": `https://devkitly.vercel.app#${tool.category.toLowerCase().replace(/\s+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.name,
        "item": `https://devkitly.vercel.app/${tool.slug}`,
      },
    ],
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "operatingSystem": "All",
    "applicationCategory": "DeveloperApplication",
    "browserRequirements": "HTML5, CSS3, ES6 compatible browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": seoData.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use ${tool.name}`,
    "description": `Step-by-step guide explaining how to format, convert, or generate values using ${tool.name} offline.`,
    "step": tool.howToUse.map((step, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "text": step,
    })),
  };

  return (
    <article className="space-y-12 max-w-5xl mx-auto">
      {/* Schema.org Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {seoData.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Page Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-secondary/85 border border-border text-muted-foreground">
          <span>{tool.category}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 border border-indigo-500/15 shadow-xs">
            <ToolIcon name={tool.icon} className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              {tool.name}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed max-w-3xl">
              {tool.description}
            </p>
          </div>
        </div>
      </header>

      {/* Tool Container (Wrapped in Card) */}
      <section className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Decorative corner indicator */}
        <div className="absolute top-0 right-0 flex items-center gap-1 px-3 py-1 rounded-bl-xl bg-indigo-500/5 text-[9px] font-bold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 border-l border-b border-border/30">
          <Sparkles className="h-2.5 w-2.5" />
          <span>Local Engine</span>
        </div>

        <div className="pt-2">
          <ToolRenderer slug={tool.slug} />
        </div>
      </section>

      {/* How to Use & FAQs Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
        
        {/* How to Use Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-border/60">
            <BookOpen className="h-4.5 w-4.5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">How to Use</h2>
          </div>
          
          <ol className="relative border-l border-border/70 ml-3.5 space-y-7">
            {tool.howToUse.map((step, idx) => (
              <li key={idx} className="relative pl-6">
                {/* Bullet circle */}
                <div className="absolute -left-3.5 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-secondary border border-border text-foreground text-xs font-bold font-mono">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQs Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-border/60">
            <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          
          <div>
            {seoData.faqs.length > 0 ? (
              <FAQAccordion faqs={seoData.faqs} />
            ) : (
              <p className="text-xs sm:text-sm text-muted-foreground font-medium bg-secondary/30 border border-dashed border-border rounded-2xl p-6 text-center">
                No frequently asked questions for this tool yet.
              </p>
            )}
          </div>
        </section>

      </div>

      {/* GEO (Generative Engine Optimization) Technical Content Section */}
      <hr className="border-border/60" />

      <section className="space-y-8 bg-secondary/10 border border-border/50 rounded-3xl p-6 sm:p-8">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <Cpu className="h-4.5 w-4.5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-foreground">Generative Answer & AI Documentation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
          
          {/* Left Column: Definitions & Why Use */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">What is the {tool.name}?</h3>
              <p>{seoData.definition}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Why use {tool.name} offline?</h3>
              <p>{seoData.whyUse}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground">When should you use this tool?</h3>
              <p>{seoData.whenUse}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Key Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                {seoData.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Use Cases, Limitations, Standards */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Common Use Cases</h3>
              <ul className="list-disc pl-5 space-y-1">
                {seoData.useCases.map((uc, i) => (
                  <li key={i}>{uc}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Developer Notes & Best Practices</h3>
              <p className="text-[11px] text-muted-foreground/80 font-mono mb-2">{seoData.devNotes}</p>
              <ul className="list-disc pl-5 space-y-1">
                {seoData.bestPractices.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Common Mistakes</span>
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                {seoData.commonMistakes.map((cm, i) => (
                  <li key={i}>{cm}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-foreground flex items-center gap-1.5 text-amber-600 dark:text-amber-500">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Limitations</span>
              </h3>
              <p>{seoData.limitations}</p>
            </div>
          </div>

        </div>

        {/* Input/Output code block examples for LLM scrapers */}
        <div className="border-t border-border/50 pt-6 space-y-4">
          <h3 className="font-bold text-foreground text-xs sm:text-sm">Structured Input/Output Example</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Input Example</span>
              <pre className="bg-card border border-border rounded-xl p-3.5 font-mono text-[10px] sm:text-xs overflow-x-auto text-foreground">
                {seoData.inputExample}
              </pre>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Output Example</span>
              <pre className="bg-card border border-border rounded-xl p-3.5 font-mono text-[10px] sm:text-xs overflow-x-auto text-foreground">
                {seoData.outputExample}
              </pre>
            </div>

          </div>
        </div>

      </section>

      {/* Related Tools Section */}
      {relatedTools.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4.5 w-4.5 text-indigo-500" />
            <h2 className="text-base sm:text-lg font-bold text-foreground">Related Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {relatedTools.map((relTool) => (
              <Link
                key={relTool.slug}
                href={`/${relTool.slug}`}
                className="group flex flex-col justify-between p-4 rounded-2xl border border-border bg-card hover:border-indigo-500/40 hover:shadow-xs transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-500 border border-indigo-500/10">
                      <ToolIcon name={relTool.icon} className="h-3.5 w-3.5" />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {relTool.name}
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-semibold line-clamp-2">
                    {relTool.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-4 pt-3 border-t border-border/20">
                  <span>Open Tool</span>
                  <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </article>
  );
}
