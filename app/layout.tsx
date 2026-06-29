import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ToastProvider } from "../components/ToastProvider";
import LayoutShell from "../components/LayoutShell";
import Script from "next/script";

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
  },
  verification: {
    google: "", // PLACEHOLDER: Add Google Search Console verification token here
    // other: {
    //   "msvalidate.01": "", // PLACEHOLDER: Add Bing Webmaster Tools verification token here
    // }
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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold focus:shadow-lg focus:outline-none">
          Skip to main content
        </a>
        {/* 
          PLACEHOLDER: Google Analytics 4 (GA4) Script
          To enable tracking, uncomment the tags below and replace G-XXXXXXXXXX with your measurement ID.
          
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
          <script
            id="ga4-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `
            }}
          />
        */}
        {/* 
          PLACEHOLDER: Microsoft Clarity Script
          To enable Clarity tracking, uncomment the script below and replace CLARITY_PROJECT_ID with your Clarity token.
          
          <script
            id="clarity-init"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
              `
            }}
          />
        */}
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QPZ3HJGR2Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QPZ3HJGR2Y');
          `}
        </Script>
        {/* Adsterra Social Bar */}
        <Script
          src="https://pl30128618.effectivecpmnetwork.com/bf/07/fe/bf07fe92e06b64ed5cd393db0ea9161e.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
