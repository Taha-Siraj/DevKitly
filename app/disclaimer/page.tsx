import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimers - DevKitly",
  description: "Read the disclaimers and liabilities limitations regarding the usage, results, and outputs of DevKitly.",
};

export default function DisclaimerPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Disclaimers & Limitations
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold">
          Please read this liability shield before using our utilities.
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Main Content */}
      <article className="space-y-8 text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
        
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">1. "As Is" Warranty</h2>
          <p>
            The tools, utilities, formats, results, and recommendations hosted on **DevKitly** are provided on an \"AS IS\" and \"AS AVAILABLE\" basis without warranties of any kind, whether express or implied.
          </p>
          <p>
            We do not warrant that output formats generated (such as SQL formatting, XML conversion, color transformations, or encryption hashes) are 100% correct, bug-free, or fully compliant with specific deployment environments.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">2. Limitation of Liability</h2>
          <p>
            In no event shall DevKitly, its authors, or hosting provider be held liable for any damages whatsoever (including, without limitation, damages for loss of business profits, code integrity, data corruption, database system crashes, or security vulnerabilities) arising out of the use or inability to use these tools.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">3. Cryptographic & Security Warnings</h2>
          <p>
            Utilities like our Password Generator, Hash Generator, Base64 Encoder, and JWT Decoder are meant for development and testing. Do not use local, browser-computed values for secure cryptographic functions in production deployments unless you have verified the seed entropy parameters yourself.
          </p>
        </section>

      </article>

    </div>
  );
}
