import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - DevKitly",
  description: "Read our Terms of Service explaining the terms of using our free offline developer tools and sandboxed utilities.",
};

export default function TermsPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold">
          Terms of usage and guidelines for DevKitly.
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Main Content */}
      <article className="space-y-8 text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
        
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">1. Agreement to Terms</h2>
          <p>
            By accessing or using **DevKitly**, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from using the utilities.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">2. Description of Service</h2>
          <p>
            DevKitly provides a platform offering 40+ client-side developer utilities (including formatters, converters, encoders, generators, etc.). All features are provided completely free of charge and operate entirely inside the browser.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">3. User Conduct</h2>
          <p>
            Since all computations occur locally on your machine, you are solely responsible for ensuring your hardware supports the computations (e.g. formatting massive 100MB+ JSON datasets).
          </p>
          <p>
            You may not attempt to automate, scrape, or flood request payloads to our site in a way that degrades host server delivery of our static build assets to other users.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">4. Termination of Access</h2>
          <p>
            We reserve the right to suspend or block access to DevKitly (via hosting constraints or CDN configurations) for users who abuse the service or violate network guidelines.
          </p>
        </section>

      </article>

    </div>
  );
}
