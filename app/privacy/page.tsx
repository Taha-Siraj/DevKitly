import React from "react";
import { Metadata } from "next";
import { ShieldAlert, CheckCircle, Info } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - DevKitly",
  description: "Read our Privacy Policy to understand how we keep your developer inputs and data 100% private and sandboxed inside your local browser environment.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold">
          Your data never leaves your computer. Period.
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Main Content */}
      <article className="space-y-8 text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
        
        {/* Core Policy Highlight */}
        <div className="flex items-start gap-4 border border-indigo-500/20 bg-indigo-500/5 rounded-2xl p-5 text-indigo-700 dark:text-indigo-400">
          <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5 text-indigo-500" />
          <div className="space-y-2">
            <h3 className="font-bold text-foreground text-xs sm:text-sm">Zero Transmission Policy</h3>
            <p className="text-xs font-semibold leading-relaxed">
              No user data is uploaded. No personal data is stored. Most tools work entirely in the browser. All processing runs 100% locally in your browser sandbox.
            </p>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">1. Data Collection & Processing</h2>
          <p>
            Unlike typical online tools, DevKitly does not maintain application servers to process your inputs. Because of this, it is technically impossible for us to collect, view, or record any data you type, paste, or upload.
          </p>
          <p>
            The moment you close your browser tab or reload, all input and output states are instantly wiped from your machine's volatile memory.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">2. Cookies & LocalStorage</h2>
          <p>
            We use a minimal set of local cookies and LocalStorage configurations purely to enhance user experience. These include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Theme Preference:</strong> To remember whether you selected Light or Dark mode.</li>
            <li><strong>Recently Used Tools (Future Expansion):</strong> Stored locally on your machine to help you navigate between utilities.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">3. External Links</h2>
          <p>
            Our website may contain links to external developer reference sites, documentation pages, or official specification bodies. We are not responsible for the privacy practices of external web assets.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">4. Policy Modifications</h2>
          <p>
            We reserve the right to modify this policy at any time. However, our core philosophy of **100% local client-side computations** will always remain unchanged.
          </p>
        </section>

      </article>

    </div>
  );
}
