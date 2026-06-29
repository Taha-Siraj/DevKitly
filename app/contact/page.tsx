import React from "react";
import { Metadata } from "next";
import { Mail, HelpCircle, Bug, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - DevKitly",
  description: "Get in touch with DevKitly to request new developer tools, report formatting bugs, or share feedback.",
};

export default function ContactPage() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground font-semibold">
          Have feedback or suggestions? We'd love to hear from you.
        </p>
      </div>

      <hr className="border-border/60" />

      {/* Main Content */}
      <article className="space-y-8 text-xs sm:text-sm text-muted-foreground leading-relaxed font-semibold">
        <p>
          Since **DevKitly** runs 100% offline in your browser, we do not store contact logs or email forms on our platform. To maintain our strict zero-transmission policies, you can reach out to us directly through standard developer communication channels.
        </p>

        {/* Contact cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          
          <div className="border border-border bg-secondary/5 rounded-2xl p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-xs sm:text-sm">Email Communication</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              For security reports, business queries, or direct inquiries, email us at:<br />
              <a href="mailto:pikachugaming899@gmail.com" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">pikachugaming899@gmail.com</a>
            </p>
          </div>

          <div className="border border-border bg-secondary/5 rounded-2xl p-5 space-y-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <Bug className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-xs sm:text-sm">Issue Tracking</h3>
            <p className="text-xs text-muted-foreground font-semibold leading-relaxed">
              If you found a bug in a formatter or have a new utility request, send us an email at:<br />
              <a href="mailto:pikachugaming899@gmail.com" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">pikachugaming899@gmail.com</a>
            </p>
          </div>

        </section>

        <section className="space-y-4 pt-4 border-t border-border/50">
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-indigo-500" />
            <span>Looking for custom integrations?</span>
          </h2>
          <p>
            If you need a localized, branded version of DevKitly for your company's internal intranet deployments (running fully isolated under corporate firewall restrictions), contact our enterprise integration team.
          </p>
        </section>
      </article>

    </div>
  );
}
