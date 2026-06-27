import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DevKitly — Free Offline Developer Tools",
    short_name: "DevKitly",
    description: "DevKitly provides fast, free, privacy-first offline developer tools that work directly in your browser. No signup. No API. No tracking.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon?size=192",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon?size=512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
