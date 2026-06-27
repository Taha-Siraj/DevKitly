import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { toolsRegistry, CATEGORIES } from "../../../lib/registry";
import { ToolIcon } from "../../../components/Sidebar";
import FAQAccordion from "../../../components/FAQAccordion";
import { ArrowRight, Sparkles, HelpCircle, Layers } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Map slugs to category names
const CATEGORY_MAP: Record<string, string> = {
  "json-utilities": CATEGORIES.json,
  "formatters-beautifiers": CATEGORIES.formatter,
  "data-conversions": CATEGORIES.conversion,
  "encoding-encryption": CATEGORIES.encoding,
  "generators-utilities": CATEGORIES.generator,
};

// SEO Content for each Category
const CATEGORY_SEO_DATA: Record<
  string,
  {
    title: string;
    description: string;
    introduction: string;
    faqs: { question: string; answer: string }[];
  }
> = {
  "json-utilities": {
    title: "Offline JSON Utilities - Format, Validate & Minify JSON",
    description: "Access 100% free and client-side JSON formatters, syntax checkers, prettifiers, and validators to clean up your JSON files locally inside your browser.",
    introduction: "JSON (JavaScript Object Notation) is the standard format for API data transmission. Our suite of local JSON Utilities lets you format, validate, compress, and inspect complex data files without sending sensitive configurations, credentials, or client secrets to external servers.",
    faqs: [
      { question: "Is my JSON data sent to any server?", answer: "No. All JSON processing, validation, and beautification are computed in your browser using local Javascript. It is completely safe for corporate APIs and keys." },
      { question: "Why is it important to format JSON locally?", answer: "Many online tools log inputs. For security compliance (such as SOC2 or HIPAA), pasting database JSON variables into third-party servers is a critical risk. Local processing eliminates this." }
    ]
  },
  "formatters-beautifiers": {
    title: "Free Code Beautifiers & Formatters - SQL, HTML, CSS, JS",
    description: "Format and clean up raw SQL queries, HTML tags, CSS stylesheets, and JS/TS code with customizable indentation and nesting, entirely local.",
    introduction: "Legible code is maintainable code. Our Formatters & Beautifiers clean up messy, minified, or disorganized SQL, HTML, CSS, and JavaScript scripts. Get clean nesting and proper keyword capitalization instantly.",
    faqs: [
      { question: "Do you support SQL dialects?", answer: "Yes. The SQL Formatter supports MySQL, PostgreSQL, standard SQL, Oracle, and SQLite syntaxes." },
      { question: "Can I customize indentation?", answer: "Yes, you can toggle between 2 spaces, 4 spaces, or Tab styles depending on your style guides." }
    ]
  },
  "data-conversions": {
    title: "Developer Data Converters - JSON to CSV, YAML to JSON, XML",
    description: "Convert structural data formats locally. Convert between JSON, CSV, XML, and YAML file formats safely inside your browser memory.",
    introduction: "Translating data schemas between XML, JSON, CSV, and YAML can be tedious. These client-side Converters translate formats locally, flattening nested structures and matching schemas accurately.",
    faqs: [
      { question: "How are nested JSON keys converted to CSV columns?", answer: "Nested object pathways are flattened using clean dot notation (e.g. parent.child becomes parent.child header columns)." },
      { question: "Is schema structure validated during conversion?", answer: "Yes. The parsers check syntax integrity first, highlighting invalid structures before attempting to map to the new format." }
    ]
  },
  "encoding-encryption": {
    title: "Offline Encoder & Decoders - Base64, URL, JWT, Cryptographic Hashes",
    description: "Encode or decode Base64 data, URL queries, and JWT tokens, or generate MD5, SHA-1, and SHA-256 cryptographic signatures safely.",
    introduction: "Secure parameters require secure utilities. Decode JSON Web Tokens (JWT), unescape percent-encoded URLs, translate Base64 binary text, or generate cryptographic checksums without exposing private strings or API keys to external log systems.",
    faqs: [
      { question: "Is it safe to decode private JWT keys here?", answer: "Yes. JWT decoders run client-side. The token payload containing user IDs, signatures, and scopes is never sent to the network." },
      { question: "Are cryptographic hashes reversible?", answer: "Cryptographic hash functions (MD5, SHA-256) are designed as one-way algorithms and cannot be decoded back. They are used for checksum matching." }
    ]
  },
  "generators-utilities": {
    title: "Developer Utility Generators - UUID, QR, Barcode, Password, Lorem",
    description: "Generate UUIDs in bulk, build custom QR codes, generate secure passwords, or generate Lorem Ipsum layout placeholders locally.",
    introduction: "Streamline developer tasks with dynamic generators. Build unique UUID v4 codes, render EAN/CODE128 barcodes, customize QR code colors, create cryptographic passwords, and compile text placeholders instantly in your sandbox.",
    faqs: [
      { question: "Are the passwords and UUIDs truly random?", answer: "Yes. Our generators use the browser's Web Crypto API (crypto.getRandomValues), providing cryptographically secure pseudo-random values." },
      { question: "Can I generate UUIDs in bulk?", answer: "Yes, you can specify quantities up to 100 codes in a single click." }
    ]
  }
};

// Prerender all categories at build time
export async function generateStaticParams() {
  return Object.keys(CATEGORY_MAP).map((slug) => ({
    slug,
  }));
}

// Generate SEO Metadata for Category Pages
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const seoData = CATEGORY_SEO_DATA[slug];

  if (!seoData) return {};

  const canonicalUrl = `https://devkitly.vercel.app/category/${slug}`;

  return {
    title: seoData.title,
    description: seoData.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const catName = CATEGORY_MAP[slug];
  const seoData = CATEGORY_SEO_DATA[slug];

  if (!catName || !seoData) {
    notFound();
  }

  // Filter tools belonging to this category
  const tools = toolsRegistry.filter((t) => t.category === catName);

  // Filter other categories for cross-linking
  const otherCategories = Object.entries(CATEGORY_MAP).filter(([s]) => s !== slug);

  // Schema.org Category/Collection Page structured data
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": catName,
    "description": seoData.description,
    "url": `https://devkitly.vercel.app/category/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": tools.map((tool, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": tool.name,
        "url": `https://devkitly.vercel.app/${tool.slug}`,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://devkitly.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": catName,
        "item": `https://devkitly.vercel.app/category/${slug}`,
      },
    ],
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header and Intro */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-secondary/85 border border-border text-muted-foreground">
          <span>Category Hub</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {catName}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold max-w-3xl">
          {seoData.introduction}
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Tools List in Category */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Layers className="h-4.5 w-4.5 text-indigo-500" />
          <span>Available Utilities ({tools.length})</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs hover:border-indigo-500/40 hover:shadow-xs transition-all duration-300"
            >
              <div className="space-y-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/10">
                  <ToolIcon name={tool.icon} className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold line-clamp-2">
                  {tool.description}
                </p>
              </div>
              
              <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-4 pt-3 border-t border-border/20">
                <span>Launch Utility</span>
                <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Specific FAQs */}
      <section className="space-y-6 pt-6 border-t border-border/50">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4.5 w-4.5 text-indigo-500" />
          <h2 className="text-lg font-bold text-foreground">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion faqs={seoData.faqs} />
      </section>

      {/* Cross Linking Categories */}
      <section className="space-y-4 pt-6 border-t border-border/50">
        <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Other Tool Categories</h2>
        <div className="flex flex-wrap gap-2.5">
          {otherCategories.map(([otherSlug, otherName]) => (
            <Link
              key={otherSlug}
              href={`/category/${otherSlug}`}
              className="rounded-full bg-secondary hover:bg-indigo-500/10 hover:text-indigo-600 border border-border px-4 py-1.5 text-xs font-semibold transition-all"
            >
              {otherName}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
