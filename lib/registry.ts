export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  icon: string; // Lucide icon name
  howToUse: string[];
  faqs: FAQItem[];
  relatedTools: string[]; // Slugs of related tools
  keywords: string[];
}

export const CATEGORIES = {
  json: "JSON Utilities",
  formatter: "Formatters & Beautifiers",
  conversion: "Data Conversions",
  encoding: "Encoding & Encryption",
  generator: "Generators & Utilities",
};

export const toolsRegistry: ToolEntry[] = [
  // 1. JSON Formatter
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    category: "JSON Utilities",
    description: "Format, beautify, and clean up messy JSON data with customizable indentation.",
    icon: "Braces",
    keywords: ["json", "format", "beautify", "json parser", "json tools"],
    howToUse: [
      "Paste your raw JSON code into the editor.",
      "Select your preferred indentation size (2 spaces, 4 spaces, or tabs).",
      "Click 'Format' to clean up the JSON.",
      "Copy or download the formatted JSON using the toolbar buttons."
    ],
    faqs: [
      { question: "Does this tool save my JSON?", answer: "No, all formatting runs entirely in your browser using local JavaScript. Your data never leaves your device." },
      { question: "Can it handle invalid JSON?", answer: "The Formatter will flag syntax errors and direct you to the exact line of the problem so you can fix it." }
    ],
    relatedTools: ["json-validator", "json-minifier", "json-prettifier"]
  },
  // 2. JSON Validator
  {
    slug: "json-validator",
    name: "JSON Validator",
    category: "JSON Utilities",
    description: "Validate JSON code against strict specifications and debug syntax errors.",
    icon: "FileCheck",
    keywords: ["json", "validate", "syntax error", "json linter", "debug json"],
    howToUse: [
      "Enter the JSON text you want to validate.",
      "The tool checks syntax in real time.",
      "If invalid, it displays the specific line and column of the syntax error."
    ],
    faqs: [
      { question: "What specification does this validate?", answer: "It checks compatibility with RFC 8259 JSON guidelines." }
    ],
    relatedTools: ["json-formatter", "json-minifier", "json-prettifier"]
  },
  // 3. JSON Minifier
  {
    slug: "json-minifier",
    name: "JSON Minifier",
    category: "JSON Utilities",
    description: "Compress JSON code by removing unnecessary spaces, newlines, and indentation.",
    icon: "Minimize2",
    keywords: ["minify json", "compress json", "json size reducer", "json compact"],
    howToUse: [
      "Input your formatted JSON data.",
      "Click the 'Minify' button.",
      "Copy the compressed output to save bandwidth in your application."
    ],
    faqs: [
      { question: "Does minification alter JSON values?", answer: "No, it only removes formatting whitespace, keeping values intact." }
    ],
    relatedTools: ["json-formatter", "json-validator", "json-prettifier"]
  },
  // 4. JSON Prettifier
  {
    slug: "json-prettifier",
    name: "JSON Prettifier",
    category: "JSON Utilities",
    description: "Enhance JSON readability with clean colors, collapsible nodes, and tree views.",
    icon: "Sparkles",
    keywords: ["prettify json", "json tree view", "colorized json", "read json"],
    howToUse: [
      "Paste your JSON into the input box.",
      "View the pretty-printed colored output with collapsible brackets.",
      "Search or copy specific key-value sets."
    ],
    faqs: [
      { question: "Can I fold/unfold objects?", answer: "Yes, you can click on the toggle icons next to brackets to expand or collapse nodes." }
    ],
    relatedTools: ["json-formatter", "json-validator", "yaml-to-json"]
  },
  // 5. JSON to CSV
  {
    slug: "json-to-csv",
    name: "JSON to CSV",
    category: "Data Conversions",
    description: "Convert nested or flat JSON objects and arrays into structured CSV format.",
    icon: "FileSpreadsheet",
    keywords: ["json to csv", "convert json", "excel csv export", "json table"],
    howToUse: [
      "Enter a JSON array of flat objects.",
      "Click 'Convert to CSV' to transform into comma-separated values.",
      "Download the result as a `.csv` file."
    ],
    faqs: [
      { question: "Can it convert nested structures?", answer: "Yes, nested properties will be flattened using dot notation (e.g., parent.child)." }
    ],
    relatedTools: ["csv-to-json", "json-to-xml", "json-to-yaml"]
  },
  // 6. CSV to JSON
  {
    slug: "csv-to-json",
    name: "CSV to JSON",
    category: "Data Conversions",
    description: "Convert CSV spreadsheets or lists into clean JSON array formats.",
    icon: "FileJson",
    keywords: ["csv to json", "convert csv", "csv import", "tsv to json"],
    howToUse: [
      "Paste CSV rows with headers on the first line.",
      "Choose to output as a flat list or nested object.",
      "Click 'Convert' to parse columns into JSON properties."
    ],
    faqs: [
      { question: "Does it support custom delimiters?", answer: "Yes, you can specify commas, tabs, or semicolons as delimiters." }
    ],
    relatedTools: ["json-to-csv", "xml-to-json", "yaml-to-json"]
  },
  // 7. JSON to XML
  {
    slug: "json-to-xml",
    name: "JSON to XML",
    category: "Data Conversions",
    description: "Translate structured JSON schemas into descriptive XML syntax tree nodes.",
    icon: "CodeXml",
    keywords: ["json to xml", "xml converter", "json parse xml"],
    howToUse: [
      "Enter valid JSON content.",
      "Specify a root node name (default: 'root').",
      "Click 'Convert' to output formatted XML structures."
    ],
    faqs: [
      { question: "Why is a root tag needed?", answer: "XML requires a single root element enclosing all other nested elements." }
    ],
    relatedTools: ["xml-to-json", "json-to-csv", "json-to-yaml"]
  },
  // 8. XML to JSON
  {
    slug: "xml-to-json",
    name: "XML to JSON",
    category: "Data Conversions",
    description: "Convert XML data structures into readable JSON trees.",
    icon: "FileCode",
    keywords: ["xml to json", "convert xml", "xml parser", "parse attributes"],
    howToUse: [
      "Paste your XML code into the input field.",
      "Select whether to parse attributes as separate JSON properties.",
      "Click 'Convert' to generate the JSON equivalent."
    ],
    faqs: [
      { question: "How are XML namespaces handled?", answer: "They are translated to prefixed JSON object keys." }
    ],
    relatedTools: ["json-to-xml", "csv-to-json", "yaml-to-json"]
  },
  // 9. SQL Formatter
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    category: "Formatters & Beautifiers",
    description: "Format database SQL queries with uppercase keywords, indentation, and alignment.",
    icon: "Database",
    keywords: ["sql formatter", "beautify sql", "mysql format", "postgres sql query"],
    howToUse: [
      "Input a messy or minified SQL statement.",
      "Choose SQL Dialect (MySQL, PostgreSQL, standard SQL).",
      "Click 'Format SQL' to clean up syntax structures."
    ],
    faqs: [
      { question: "What dialects are supported?", answer: "MySQL, PostgreSQL, SQLite, Oracle, and PL/SQL syntaxes." }
    ],
    relatedTools: ["html-formatter", "css-beautifier", "javascript-beautifier"]
  },
  // 10. HTML Formatter
  {
    slug: "html-formatter",
    name: "HTML Formatter",
    category: "Formatters & Beautifiers",
    description: "Indent HTML code, clean up attributes, and beautify web layouts.",
    icon: "Html5",
    keywords: ["html formatter", "beautify html", "clean html", "xml format"],
    howToUse: [
      "Paste your HTML markup.",
      "Click 'Format' to align matching tags and nesting.",
      "Copy the cleaned HTML."
    ],
    faqs: [
      { question: "Does it repair unclosed tags?", answer: "It will attempt to balance tags and auto-correct minor HTML hierarchy issues." }
    ],
    relatedTools: ["html-to-jsx", "css-beautifier", "javascript-beautifier"]
  },
  // 11. CSS Beautifier
  {
    slug: "css-beautifier",
    name: "CSS Beautifier",
    category: "Formatters & Beautifiers",
    description: "Beautify stylesheets, format selectors, rules, and property values with clean indents.",
    icon: "Palette",
    keywords: ["css beautifier", "format css", "clean stylesheet", "css formatter"],
    howToUse: [
      "Paste raw CSS rules.",
      "Choose property grouping or formatting presets.",
      "Click 'Beautify' to inspect layout improvements."
    ],
    faqs: [
      { question: "Does it validate syntax?", answer: "It flags missing braces and unclosed property values." }
    ],
    relatedTools: ["html-formatter", "javascript-beautifier", "color-converter"]
  },
  // 12. JavaScript Beautifier
  {
    slug: "javascript-beautifier",
    name: "JavaScript Beautifier",
    category: "Formatters & Beautifiers",
    description: "Beautify Javascript/ES6 and Typescript code lines for standard readability.",
    icon: "FileCode2",
    keywords: ["js beautifier", "javascript formatter", "beautify script", "es6 format"],
    howToUse: [
      "Paste JavaScript, TypeScript, or JSON-like scripts.",
      "Click 'Beautify' to format blocks, variables, and indents.",
      "Copy formatted scripts."
    ],
    faqs: [
      { question: "Will it run my JS script?", answer: "No, it only parses and beautifies code layout in-browser." }
    ],
    relatedTools: ["html-formatter", "css-beautifier", "jwt-decoder"]
  },
  // 13. XML Formatter
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    category: "Formatters & Beautifiers",
    description: "Prettify XML documents with proper nesting, tag alignment, and attribute wraps.",
    icon: "FileSymlink",
    keywords: ["xml formatter", "beautify xml", "prettify xml", "clean tags"],
    howToUse: [
      "Paste your XML string.",
      "Click 'Format XML'.",
      "Copy the cleaned tags."
    ],
    faqs: [
      { question: "Does it support custom XML schema namespaces?", answer: "Yes, standard namespaces are fully supported and styled." }
    ],
    relatedTools: ["xml-to-json", "html-formatter", "yaml-formatter"]
  },
  // 14. YAML Formatter
  {
    slug: "yaml-formatter",
    name: "YAML Formatter",
    category: "Formatters & Beautifiers",
    description: "Check indentation syntax and format YAML files for configuration tasks.",
    icon: "FileText",
    keywords: ["yaml formatter", "beautify yaml", "format yaml", "yml lint"],
    howToUse: [
      "Input your YAML data structure.",
      "Click 'Format' to align levels and spacing.",
      "Copy the formatted output."
    ],
    faqs: [
      { question: "Why is indentation critical in YAML?", answer: "YAML uses white-space indentation instead of braces to identify hierarchies." }
    ],
    relatedTools: ["yaml-to-json", "json-to-yaml", "xml-formatter"]
  },
  // 15. YAML to JSON
  {
    slug: "yaml-to-json",
    name: "YAML to JSON",
    category: "Data Conversions",
    description: "Convert YAML configurations into standard JSON structures.",
    icon: "ArrowLeftRight",
    keywords: ["yaml to json", "yml to json", "convert config"],
    howToUse: [
      "Paste your YAML configuration text.",
      "The tool validates formatting and parses parameters.",
      "Download or copy the generated JSON script."
    ],
    faqs: [
      { question: "Does it support complex anchors or aliases?", answer: "Yes, standard YAML aliases are automatically resolved into JSON structures." }
    ],
    relatedTools: ["json-to-yaml", "yaml-formatter", "csv-to-json"]
  },
  // 16. JSON to YAML
  {
    slug: "json-to-yaml",
    name: "JSON to YAML",
    category: "Data Conversions",
    description: "Convert structured JSON files into readable YAML configurations.",
    icon: "RefreshCw",
    keywords: ["json to yaml", "json to yml", "convert json yaml"],
    howToUse: [
      "Paste standard JSON arrays or key-value structures.",
      "Convert to clean, whitespace-based YAML outputs.",
      "Save the result as a `.yml` file."
    ],
    faqs: [
      { question: "Is nesting supported?", answer: "Yes, multi-level nested JSON nodes translate to properly indented YAML branches." }
    ],
    relatedTools: ["yaml-to-json", "yaml-formatter", "json-to-csv"]
  },
  // 17. HTML to JSX
  {
    slug: "html-to-jsx",
    name: "HTML to JSX",
    category: "Data Conversions",
    description: "Convert standard HTML pages or divs into clean React JSX format.",
    icon: "Component",
    keywords: ["html to jsx", "react jsx converter", "html class to className"],
    howToUse: [
      "Paste standard HTML elements.",
      "Choose React-specific settings (e.g., self-closing tags, class to className mapping).",
      "Copy the prepared JSX code."
    ],
    faqs: [
      { question: "What changes are made during conversion?", answer: "Elements like 'class' become 'className', inline styles convert to JS objects, and self-closing tags are closed." }
    ],
    relatedTools: ["jsx-to-html", "html-formatter", "javascript-beautifier"]
  },
  // 18. JSX to HTML
  {
    slug: "jsx-to-html",
    name: "JSX to HTML",
    category: "Data Conversions",
    description: "Convert React JSX elements and className tags back to standard HTML markup.",
    icon: "Blocks",
    keywords: ["jsx to html", "jsx compile", "convert react to html"],
    howToUse: [
      "Input a JSX code snippet.",
      "Convert into static raw HTML elements.",
      "Copy standard markup tags."
    ],
    faqs: [
      { question: "Does it execute dynamic React components?", answer: "No, it static-parses JSX tags and replaces react properties with HTML tags." }
    ],
    relatedTools: ["html-to-jsx", "html-formatter", "css-beautifier"]
  },
  // 19. Base64 Encoder
  {
    slug: "base64-encoder",
    name: "Base64 Encoder",
    category: "Encoding & Encryption",
    description: "Encode text strings or files into secure, binary-safe Base64 notation.",
    icon: "Binary",
    keywords: ["base64 encode", "text to base64", "mime encoding"],
    howToUse: [
      "Type or paste standard text into the encoder.",
      "Choose string or URI safe outputs.",
      "Click 'Encode' to view the Base64 representation."
    ],
    faqs: [
      { question: "Is Base64 encryption?", answer: "No, Base64 is an encoding format for binary-to-text safety, not cryptographic encryption." }
    ],
    relatedTools: ["base64-decoder", "url-encoder", "hash-generator"]
  },
  // 20. Base64 Decoder
  {
    slug: "base64-decoder",
    name: "Base64 Decoder",
    category: "Encoding & Encryption",
    description: "Decode Base64 encoded strings back into clean, readable text.",
    icon: "ShieldAlert",
    keywords: ["base64 decode", "base64 to text", "un-base64"],
    howToUse: [
      "Paste your Base64 encoded string.",
      "Click 'Decode' to inspect original values.",
      "Download or copy strings."
    ],
    faqs: [
      { question: "What happens if decoding fails?", answer: "The tool warns you of invalid Base64 characters and padding issues." }
    ],
    relatedTools: ["base64-encoder", "url-decoder", "jwt-decoder"]
  },
  // 21. URL Encoder
  {
    slug: "url-encoder",
    name: "URL Encoder",
    category: "Encoding & Encryption",
    description: "Percent-encode URL components, query parameters, and special characters.",
    icon: "Link",
    keywords: ["url encode", "percent encoding", "escape url"],
    howToUse: [
      "Paste standard URL strings or queries.",
      "Choose to encode all special characters or only URL parameters.",
      "Click 'Encode'."
    ],
    faqs: [
      { question: "Why encode URLs?", answer: "URLs can only contain standard ASCII characters. Spaces and symbols must be safely escaped." }
    ],
    relatedTools: ["url-decoder", "base64-encoder", "jwt-decoder"]
  },
  // 22. URL Decoder
  {
    slug: "url-decoder",
    name: "URL Decoder",
    category: "Encoding & Encryption",
    description: "Unescape percent-encoded URLs to restore human-readable string values.",
    icon: "ExternalLink",
    keywords: ["url decode", "unescape url", "percent decoding"],
    howToUse: [
      "Paste percent-encoded URL parameters.",
      "Click 'Decode' to inspect parameters.",
      "Copy clean URL outputs."
    ],
    faqs: [
      { question: "Does it support UTF-8 decoding?", answer: "Yes, it decodes nested UTF-8 sequences correctly." }
    ],
    relatedTools: ["url-encoder", "base64-decoder", "jwt-decoder"]
  },
  // 23. JWT Decoder
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    category: "Encoding & Encryption",
    description: "Decode JSON Web Tokens (JWT) payload structures without sending them online.",
    icon: "Key",
    keywords: ["jwt decoder", "decode jwt", "token parser", "jwt payload"],
    howToUse: [
      "Paste an encoded JWT string.",
      "Review decoded Header parameters, Payload body, and expiry flags.",
      "Check expiration and signing structure."
    ],
    faqs: [
      { question: "Is this secure?", answer: "Absolutely. All decoding processes run in-browser. Your token keys are never transmitted." }
    ],
    relatedTools: ["base64-decoder", "hash-generator", "password-generator"]
  },
  // 24. UUID Generator
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    category: "Generators & Utilities",
    description: "Generate single or bulk RFC 4122 compliant UUID Version 4 codes.",
    icon: "FileCheck2",
    keywords: ["uuid generator", "guid generator", "v4 uuid", "generate ids"],
    howToUse: [
      "Choose formatting: uppercase, lowercase, or brackets.",
      "Specify quantity to generate in bulk (up to 100).",
      "Click 'Generate UUID' and copy list."
    ],
    faqs: [
      { question: "Are these UUIDs unique?", answer: "Yes, UUID v4 employs strong randomness, making collisions practically impossible." }
    ],
    relatedTools: ["password-generator", "hash-generator", "lorem-ipsum"]
  },
  // 25. Hash Generator
  {
    slug: "hash-generator",
    name: "Hash Generator",
    category: "Encoding & Encryption",
    description: "Generate MD5, SHA-1, and SHA-256 hashes of input text in real time.",
    icon: "Fingerprint",
    keywords: ["hash generator", "sha256", "sha1", "md5 maker", "text hash"],
    howToUse: [
      "Type or paste input text.",
      "The tool calculates cryptographic hashes in real time.",
      "Copy desired hex formats."
    ],
    faqs: [
      { question: "Can I reverse hashes?", answer: "No, cryptographic hashes are designed as one-way functions and cannot be easily reversed." }
    ],
    relatedTools: ["md5-generator", "sha1-generator", "sha256-generator"]
  },
  // 26. MD5 Generator
  {
    slug: "md5-generator",
    name: "MD5 Generator",
    category: "Encoding & Encryption",
    description: "Quickly generate standard 128-bit MD5 checksum hashes of string values.",
    icon: "Lock",
    keywords: ["md5 generator", "md5 hash", "checksum"],
    howToUse: [
      "Enter a text string.",
      "Get the immediate 32-character hexadecimal MD5 hash.",
      "Copy output."
    ],
    faqs: [
      { question: "Is MD5 secure?", answer: "MD5 is susceptible to collisions and is no longer recommended for secure passwords, but remains widely used for checksum validation." }
    ],
    relatedTools: ["hash-generator", "sha1-generator", "sha256-generator"]
  },
  // 27. SHA1 Generator
  {
    slug: "sha1-generator",
    name: "SHA-1 Generator",
    category: "Encoding & Encryption",
    description: "Generate secure 160-bit SHA-1 hashes of custom text entries.",
    icon: "Activity",
    keywords: ["sha1 generator", "sha1 hash", "digest"],
    howToUse: [
      "Paste target text string.",
      "View the 40-character hex output.",
      "Copy text hash."
    ],
    faqs: [
      { question: "What is SHA-1 used for?", answer: "SHA-1 is commonly used in legacy digital signatures and git repository commit addressing." }
    ],
    relatedTools: ["hash-generator", "md5-generator", "sha256-generator"]
  },
  // 28. SHA256 Generator
  {
    slug: "sha256-generator",
    name: "SHA-256 Generator",
    category: "Encoding & Encryption",
    description: "Generate highly secure 256-bit SHA-256 hashes for data validation.",
    icon: "ShieldCheck",
    keywords: ["sha256 generator", "sha-256 hash", "cryptographic signature"],
    howToUse: [
      "Type or paste your text values.",
      "Receive the secure 64-character SHA-256 output instantly.",
      "Copy hash signature."
    ],
    faqs: [
      { question: "Is SHA-256 secure?", answer: "Yes, SHA-256 is currently standard in security protocols like SSL/TLS and block chain signatures." }
    ],
    relatedTools: ["hash-generator", "md5-generator", "sha1-generator"]
  },
  // 29. Regex Tester
  {
    slug: "regex-tester",
    name: "Regex Tester",
    category: "Generators & Utilities",
    description: "Test regular expressions against test text and inspect highlighted matches.",
    icon: "SearchCode",
    keywords: ["regex tester", "regular expression", "regex match", "regexp"],
    howToUse: [
      "Enter a regular expression pattern (e.g. `[a-zA-Z]+`).",
      "Specify flags (global `g`, case-insensitive `i`, multiline `m`).",
      "Type test sentences to see matching regions highlighted dynamically."
    ],
    faqs: [
      { question: "Are my expressions validated?", answer: "Yes, syntax errors in your regex pattern will be displayed immediately to prevent crashes." }
    ],
    relatedTools: ["cron-generator", "uuid-generator", "javascript-beautifier"]
  },
  // 30. Cron Expression Generator
  {
    slug: "cron-generator",
    name: "Cron Expression Generator",
    category: "Generators & Utilities",
    description: "Build crontab expressions with simple interactive selection elements.",
    icon: "CalendarClock",
    keywords: ["cron generator", "crontab maker", "schedule task", "cron translator"],
    howToUse: [
      "Select frequencies for minute, hour, day, month, and weekday.",
      "Inspect the generated 5-field cron statement.",
      "Read the translated, human-friendly explanation of your cron script."
    ],
    faqs: [
      { question: "Is standard UNIX crontab supported?", answer: "Yes, it creates standard crontab formats supported by Linux/Unix schedules." }
    ],
    relatedTools: ["timestamp-converter", "regex-tester", "uuid-generator"]
  },
  // 31. Unix Timestamp Converter
  {
    slug: "timestamp-converter",
    name: "Unix Timestamp Converter",
    category: "Generators & Utilities",
    description: "Convert epoch Unix timestamps back to standard dates and vice versa.",
    icon: "Clock",
    keywords: ["unix timestamp", "epoch converter", "date to timestamp", "seconds since 1970"],
    howToUse: [
      "Enter a Unix timestamp (seconds or milliseconds) to convert to local date strings.",
      "Or, select a date and time to see the corresponding Unix epoch stamp.",
      "View relative times (e.g. '5 minutes ago')."
    ],
    faqs: [
      { question: "What is Unix epoch time?", answer: "It is the total number of seconds elapsed since January 1st, 1970 UTC." }
    ],
    relatedTools: ["cron-generator", "uuid-generator", "lorem-ipsum"]
  },
  // 32. Color Converter
  {
    slug: "color-converter",
    name: "Color Converter",
    category: "Generators & Utilities",
    description: "Convert color formats between HEX, RGB, HSL, and view color swatches.",
    icon: "Pipette",
    keywords: ["color converter", "hex to rgb", "rgb to hsl", "css color picker"],
    howToUse: [
      "Use the color picker or input a color string in any format (HEX, RGB, HSL).",
      "Inspect all equivalent CSS declarations.",
      "View the live preview and copy codes with one click."
    ],
    faqs: [
      { question: "Does it support transparency?", answer: "Yes, it supports alpha values (RGBA, HSLA, HEX with opacity)." }
    ],
    relatedTools: ["hex-to-rgb", "rgb-to-hex", "rgb-to-hsl", "hsl-to-rgb"]
  },
  // 33. HEX to RGB
  {
    slug: "hex-to-rgb",
    name: "HEX to RGB Converter",
    category: "Generators & Utilities",
    description: "Convert hex color codes into RGB values.",
    icon: "Layers",
    keywords: ["hex to rgb", "hex to rgba", "css hex", "color transform"],
    howToUse: [
      "Enter a hex color code (e.g., `#3b82f6` or `3b82f6`).",
      "Copy the corresponding RGB style values: `rgb(59, 130, 246)`."
    ],
    faqs: [
      { question: "Can I enter short hex codes?", answer: "Yes, short formats like `#fff` are expanded to full values automatically." }
    ],
    relatedTools: ["color-converter", "rgb-to-hex", "rgb-to-hsl"]
  },
  // 34. RGB to HEX
  {
    slug: "rgb-to-hex",
    name: "RGB to HEX Converter",
    category: "Generators & Utilities",
    description: "Convert RGB color values into hex code format.",
    icon: "Layers",
    keywords: ["rgb to hex", "rgba to hex", "hex color finder"],
    howToUse: [
      "Enter Red, Green, and Blue numbers between 0 and 255.",
      "Instantly retrieve the resulting hexadecimal code."
    ],
    faqs: [
      { question: "What if values exceed 255?", answer: "The inputs are clamped to the valid 0-255 bounds." }
    ],
    relatedTools: ["color-converter", "hex-to-rgb", "rgb-to-hsl"]
  },
  // 35. RGB to HSL
  {
    slug: "rgb-to-hsl",
    name: "RGB to HSL Converter",
    category: "Generators & Utilities",
    description: "Convert Red-Green-Blue (RGB) codes into Hue-Saturation-Lightness (HSL).",
    icon: "Layers",
    keywords: ["rgb to hsl", "rgb to hsla", "hsl color conversion"],
    howToUse: [
      "Enter RGB numbers.",
      "Obtain the HSL degrees and percentage values."
    ],
    faqs: [
      { question: "Why HSL?", answer: "HSL is often more intuitive for designers as it isolates brightness and saturation from hue." }
    ],
    relatedTools: ["color-converter", "hsl-to-rgb", "rgb-to-hex"]
  },
  // 36. HSL to RGB
  {
    slug: "hsl-to-rgb",
    name: "HSL to RGB Converter",
    category: "Generators & Utilities",
    description: "Convert Hue-Saturation-Lightness color formats into RGB values.",
    icon: "Layers",
    keywords: ["hsl to rgb", "hsla to rgb", "hsl conversion"],
    howToUse: [
      "Input Hue (0-360), Saturation (0-100%), and Lightness (0-100%).",
      "Copy the matching RGB CSS declaration."
    ],
    faqs: [
      { question: "Is Hue in degrees?", answer: "Yes, Hue represents degrees on the color wheel from 0 to 360." }
    ],
    relatedTools: ["color-converter", "rgb-to-hsl", "hex-to-rgb"]
  },
  // 37. Lorem Ipsum Generator
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    category: "Generators & Utilities",
    description: "Generate placeholder text, sentences, or paragraphs for design templates.",
    icon: "Type",
    keywords: ["lorem ipsum", "dummy text", "placeholder content", "text generator"],
    howToUse: [
      "Choose text blocks: words, sentences, or paragraphs.",
      "Specify quantity count.",
      "Generate dummy placeholder structures."
    ],
    faqs: [
      { question: "Where does the text come from?", answer: "It is randomized standard Cicero Latin text structures widely used in printing layouts." }
    ],
    relatedTools: ["password-generator", "uuid-generator", "timestamp-converter"]
  },
  // 38. Password Generator
  {
    slug: "password-generator",
    name: "Password Generator",
    category: "Generators & Utilities",
    description: "Generate highly secure, randomized passwords with customizable strength options.",
    icon: "KeyRound",
    keywords: ["password generator", "strong password", "secure key", "random string"],
    howToUse: [
      "Select password length (8-64 characters).",
      "Toggle inclusions: uppercase, lowercase, numbers, and symbols.",
      "Click 'Generate' and check visual password-strength meter."
    ],
    faqs: [
      { question: "Are generated passwords saved?", answer: "No, passwords are generated client-side using Web Crypto API randomness and never saved." }
    ],
    relatedTools: ["uuid-generator", "hash-generator", "jwt-decoder"]
  },
  // 39. QR Code Generator
  {
    slug: "qr-code",
    name: "QR Code Generator",
    category: "Generators & Utilities",
    description: "Create customizable QR codes for text, links, or contacts and download as images.",
    icon: "QrCode",
    keywords: ["qr generator", "make qr code", "link qr scanner", "qrcode maker"],
    howToUse: [
      "Input a text or web URL link.",
      "Customize colors (foreground and background).",
      "Download the QR code image as PNG or SVG."
    ],
    faqs: [
      { question: "Can this QR be scanned by phones?", answer: "Yes, it creates high-density standard QR codes compatible with all mobile cameras." }
    ],
    relatedTools: ["barcode-generator", "color-converter", "uuid-generator"]
  },
  // 40. Barcode Generator
  {
    slug: "barcode-generator",
    name: "Barcode Generator",
    category: "Generators & Utilities",
    description: "Generate standard industrial barcodes like CODE128, EAN, or UPC and download them.",
    icon: "Barcode",
    keywords: ["barcode generator", "code128", "upc maker", "ean scanner code"],
    howToUse: [
      "Input numerical or alphanumeric values.",
      "Select barcode format: CODE128, EAN-13, EAN-8, UPC, or CODE39.",
      "Download code image instantly."
    ],
    faqs: [
      { question: "What is CODE128 used for?", answer: "CODE128 is a high-density, versatile barcode format capable of encoding alphanumeric characters, widely used in logistics." }
    ],
    relatedTools: ["qr-code", "uuid-generator", "color-converter"]
  }
];

export function getToolBySlug(slug: string): ToolEntry | undefined {
  return toolsRegistry.find((t) => t.slug === slug);
}

export function getRelatedTools(tool: ToolEntry): ToolEntry[] {
  return tool.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolEntry => t !== undefined);
}
