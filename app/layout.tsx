import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ToastProvider } from "../components/ToastProvider";
import LayoutShell from "../components/LayoutShell";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DevKitly — Free Offline Developer Tools",
    template: "%s | DevKitly"
  },
  description: "DevKitly provides fast, free, privacy-first offline developer tools that work directly in your browser. No signup. No API. No tracking.",
  metadataBase: new URL("https://devkitly.vercel.app"),
  keywords: ["developer tools", "JSON formatter", "offline tools", "base64 encoder", "jwt decoder", "cron generator", "regex tester", "color converter"],
  authors: [{ name: "DevKitly" }],
  creator: "DevKitly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devkitly.vercel.app",
    title: "DevKitly — Free Offline Developer Tools",
    description: "DevKitly provides fast, free, privacy-first offline developer tools that work directly in your browser. No signup. No API. No tracking.",
    siteName: "DevKitly"
  },
  twitter: {
    card: "summary_large_image",
    title: "DevKitly — Free Offline Developer Tools",
    description: "DevKitly provides fast, free, privacy-first offline developer tools that work directly in your browser. No signup. No API. No tracking.",
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DevKitly",
  "url": "https://devkitly.vercel.app/",
  "logo": "https://devkitly.vercel.app/icon.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "tahasiraj610@gmail.com",
    "contactType": "customer support"
  },
  "sameAs": [
    "https://github.com/Taha-Siraj"
  ],
  "founder": {
    "@type": "Person",
    "name": "Taha Siraj"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DevKitly"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DevKitly",
  "url": "https://devkitly.vercel.app/",
  "publisher": {
    "@type": "Organization",
    "name": "DevKitly"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://devkitly.vercel.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <ThemeProvider>
          <ToastProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
