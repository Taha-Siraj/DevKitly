"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic Import Map for 40 tools (client side only)
const ToolComponentMap: Record<string, React.ComponentType<any>> = {
  "json-formatter": dynamic(() => import("./tools/JsonFormatter"), { ssr: false }),
  "json-validator": dynamic(() => import("./tools/JsonValidator"), { ssr: false }),
  "json-minifier": dynamic(() => import("./tools/JsonMinifier"), { ssr: false }),
  "json-prettifier": dynamic(() => import("./tools/JsonPrettifier"), { ssr: false }),
  "json-to-csv": dynamic(() => import("./tools/JsonToCsv"), { ssr: false }),
  "csv-to-json": dynamic(() => import("./tools/CsvToJson"), { ssr: false }),
  "json-to-xml": dynamic(() => import("./tools/JsonToXml"), { ssr: false }),
  "xml-to-json": dynamic(() => import("./tools/XmlToJson"), { ssr: false }),
  "sql-formatter": dynamic(() => import("./tools/SqlFormatterTool"), { ssr: false }),
  "html-formatter": dynamic(() => import("./tools/HtmlFormatterTool"), { ssr: false }),
  "css-beautifier": dynamic(() => import("./tools/CssBeautifierTool"), { ssr: false }),
  "javascript-beautifier": dynamic(() => import("./tools/JsBeautifierTool"), { ssr: false }),
  "xml-formatter": dynamic(() => import("./tools/XmlFormatterTool"), { ssr: false }),
  "yaml-formatter": dynamic(() => import("./tools/YamlFormatterTool"), { ssr: false }),
  "yaml-to-json": dynamic(() => import("./tools/YamlToJson"), { ssr: false }),
  "json-to-yaml": dynamic(() => import("./tools/JsonToYaml"), { ssr: false }),
  "html-to-jsx": dynamic(() => import("./tools/HtmlToJsx"), { ssr: false }),
  "jsx-to-html": dynamic(() => import("./tools/JsxToHtml"), { ssr: false }),
  "base64-encoder": dynamic(() => import("./tools/Base64Encoder"), { ssr: false }),
  "base64-decoder": dynamic(() => import("./tools/Base64Decoder"), { ssr: false }),
  "url-encoder": dynamic(() => import("./tools/UrlEncoder"), { ssr: false }),
  "url-decoder": dynamic(() => import("./tools/UrlDecoder"), { ssr: false }),
  "jwt-decoder": dynamic(() => import("./tools/JwtDecoderTool"), { ssr: false }),
  "uuid-generator": dynamic(() => import("./tools/UuidGeneratorTool"), { ssr: false }),
  "hash-generator": dynamic(() => import("./tools/HashGeneratorTool"), { ssr: false }),
  "md5-generator": dynamic(() => import("./tools/Md5GeneratorTool"), { ssr: false }),
  "sha1-generator": dynamic(() => import("./tools/Sha1GeneratorTool"), { ssr: false }),
  "sha256-generator": dynamic(() => import("./tools/Sha256GeneratorTool"), { ssr: false }),
  "regex-tester": dynamic(() => import("./tools/RegexTesterTool"), { ssr: false }),
  "cron-generator": dynamic(() => import("./tools/CronGeneratorTool"), { ssr: false }),
  "timestamp-converter": dynamic(() => import("./tools/TimestampConverterTool"), { ssr: false }),
  "color-converter": dynamic(() => import("./tools/ColorConverterTool"), { ssr: false }),
  "hex-to-rgb": dynamic(() => import("./tools/HexToRgb"), { ssr: false }),
  "rgb-to-hex": dynamic(() => import("./tools/RgbToHex"), { ssr: false }),
  "rgb-to-hsl": dynamic(() => import("./tools/RgbToHsl"), { ssr: false }),
  "hsl-to-rgb": dynamic(() => import("./tools/HslToRgb"), { ssr: false }),
  "lorem-ipsum": dynamic(() => import("./tools/LoremIpsumGeneratorTool"), { ssr: false }),
  "password-generator": dynamic(() => import("./tools/PasswordGeneratorTool"), { ssr: false }),
  "qr-code": dynamic(() => import("./tools/QrCodeGeneratorTool"), { ssr: false }),
  "barcode-generator": dynamic(() => import("./tools/BarcodeGeneratorTool"), { ssr: false }),
};

interface ToolRendererProps {
  slug: string;
}

export default function ToolRenderer({ slug }: ToolRendererProps) {
  const ActiveComponent = ToolComponentMap[slug];

  if (!ActiveComponent) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-secondary/5 text-xs text-muted-foreground">
        Tool "{slug}" could not be loaded.
      </div>
    );
  }

  return <ActiveComponent />;
}
