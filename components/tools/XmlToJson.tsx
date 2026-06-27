"use client";

import React, { useState } from "react";
import { Copy, Trash2, RotateCcw, Download, AlertCircle } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  <items>
    <item>Milk</item>
    <item>Bread</item>
    <item>Eggs</item>
  </items>
</note>`;

export default function XmlToJson() {
  const [input, setInput] = useState(SAMPLE_XML);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const xmlNodeToJson = (node: Node): any => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue?.trim();
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const obj: any = {};

      // Parse attributes
      if (element.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          obj["@attributes"][attr.nodeName] = attr.nodeValue;
        }
      }

      const children = Array.from(element.childNodes);
      const elementChildren = children.filter((c) => c.nodeType === Node.ELEMENT_NODE);
      const textChildren = children.filter((c) => c.nodeType === Node.TEXT_NODE && c.nodeValue?.trim());

      if (elementChildren.length === 0) {
        const textVal = textChildren.map((c) => c.nodeValue?.trim()).join("");
        if (element.attributes.length > 0) {
          obj["#text"] = textVal;
          return obj;
        }
        
        // Parse primitive types if it's a leaf node text
        if (textVal.toLowerCase() === "true") return true;
        if (textVal.toLowerCase() === "false") return false;
        if (textVal.toLowerCase() === "null") return null;
        if (textVal !== "" && !isNaN(Number(textVal))) return Number(textVal);

        return textVal;
      }

      // Group children by nodeName
      const childGroups: Record<string, Node[]> = {};
      elementChildren.forEach((child) => {
        if (!childGroups[child.nodeName]) {
          childGroups[child.nodeName] = [];
        }
        childGroups[child.nodeName].push(child);
      });

      for (const name in childGroups) {
        const group = childGroups[name];
        if (group.length === 1) {
          obj[name] = xmlNodeToJson(group[0]);
        } else {
          obj[name] = group.map((child) => xmlNodeToJson(child));
        }
      }

      return obj;
    }
    return null;
  };

  const handleConvert = () => {
    if (!input.trim()) {
      setError("Please input some XML content.");
      return;
    }
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "application/xml");
      
      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        setError(parseError.textContent || "XML parsing syntax error.");
        setOutput("");
        return;
      }

      const rootElement = xmlDoc.documentElement;
      if (!rootElement) {
        setError("Could not find a valid XML root element.");
        return;
      }

      const jsonResult = {
        [rootElement.nodeName]: xmlNodeToJson(rootElement)
      };

      setOutput(JSON.stringify(jsonResult, null, 2));
      setError(null);
      toast("Successfully converted to JSON!");
    } catch (e: any) {
      setError(e.message || "Invalid XML layout.");
      setOutput("");
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied JSON output!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("data.json", output, "application/json");
    toast("Downloaded JSON file!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  const handleReset = () => {
    setInput(SAMPLE_XML);
    setOutput("");
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap justify-end gap-2 border-b border-border/60 pb-4">
        <button
          onClick={handleConvert}
          className="bg-indigo-600 text-white rounded-lg text-xs font-semibold px-4 py-2 hover:bg-indigo-500 transition-colors shadow-sm"
        >
          Convert to JSON
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset</span>
        </button>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-destructive transition-all"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Editor panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">XML Input</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste raw XML here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/20 border border-border rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/25 outline-none resize-y transition-all"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center h-5">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">JSON Output</span>
            {output && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
                  title="Download"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            placeholder="JSON output will appear here..."
            className="flex-1 min-h-[350px] w-full font-mono text-xs p-4 bg-secondary/10 border border-border rounded-xl outline-none resize-y cursor-text select-text"
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 border border-red-500/20 bg-red-500/10 rounded-xl p-4 text-red-500 text-xs">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p className="font-mono">{error}</p>
        </div>
      )}
    </div>
  );
}
