"use client";

import React, { useState } from "react";
import { Copy, Trash2, Download, RefreshCw } from "lucide-react";
import { useToast } from "../ToastProvider";
import { copyToClipboard, downloadAsFile } from "../../lib/utils";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
  "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "ut",
  "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
  "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "dolor",
  "in", "reprehenderit", "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat",
  "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
  "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum"
];

export default function LoremIpsumGeneratorTool() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const generateSentence = () => {
    const wordCount = Math.floor(Math.random() * 8) + 6; // 6 to 13 words
    const sentenceWords = [];
    for (let i = 0; i < wordCount; i++) {
      const idx = Math.floor(Math.random() * LOREM_WORDS.length);
      sentenceWords.push(LOREM_WORDS[idx]);
    }
    const sentence = sentenceWords.join(" ");
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  };

  const generateParagraph = () => {
    const sentenceCount = Math.floor(Math.random() * 3) + 4; // 4 to 6 sentences
    const paragraphSentences = [];
    for (let i = 0; i < sentenceCount; i++) {
      paragraphSentences.push(generateSentence());
    }
    return paragraphSentences.join(" ");
  };

  const handleGenerate = () => {
    const amount = Math.min(100, Math.max(1, count));
    let text = "";

    if (type === "paragraphs") {
      const paragraphs = [];
      for (let i = 0; i < amount; i++) {
        paragraphs.push(generateParagraph());
      }
      text = paragraphs.join("\n\n");
      if (startWithLorem && text.length > 0) {
        text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + text.charAt(0).toLowerCase() + text.slice(1);
      }
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < amount; i++) {
        sentences.push(generateSentence());
      }
      text = sentences.join(" ");
      if (startWithLorem && text.length > 0) {
        text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + text.charAt(0).toLowerCase() + text.slice(1);
      }
    } else {
      const words = [];
      if (startWithLorem) {
        words.push("lorem", "ipsum", "dolor", "sit", "amet");
      }
      const remaining = amount - words.length;
      for (let i = 0; i < remaining; i++) {
        const idx = Math.floor(Math.random() * LOREM_WORDS.length);
        words.push(LOREM_WORDS[idx]);
      }
      text = words.slice(0, amount).join(" ");
    }

    setOutput(text);
    toast(`Generated placeholder text!`);
  };

  const handleCopy = async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      toast("Copied text!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadAsFile("placeholder.txt", output, "text/plain");
    toast("Downloaded placeholder text!");
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="space-y-6">
      {/* Settings toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Type:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold text-foreground"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-muted-foreground">Amount:</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="bg-secondary/50 border border-border rounded-lg text-xs px-2.5 py-1.5 outline-none focus:border-indigo-500 font-semibold text-foreground max-w-[65px]"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="rounded bg-secondary/50 border-border text-indigo-600 focus:ring-indigo-500"
            />
            <span>Start with "Lorem ipsum..."</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold px-4 py-2 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate Text</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 bg-secondary border border-border rounded-lg text-xs font-semibold px-3 py-2 hover:bg-secondary/80 text-muted-foreground hover:text-destructive transition-all"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Output Panel */}
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center h-5">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Placeholder Output</span>
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
          placeholder="Click Generate Text to create dummy Latin strings..."
          className="w-full min-h-[300px] font-sans text-xs p-5 bg-secondary/10 border border-border rounded-xl outline-none resize-y cursor-text select-text leading-relaxed"
        />
      </div>
    </div>
  );
}
