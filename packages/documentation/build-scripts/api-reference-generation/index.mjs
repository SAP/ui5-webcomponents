import fs from "fs/promises"
import path from "path"
import { generateTypes } from "./types.mjs";
import { generateComponents } from "./components.mjs";

// const packages = ["main", "fiori"];
// const manifests = {};

// await fs.writeFile(path.join(`./docs/components/Components.md`), `---
// displayed_sidebar: componentsSidebar
// ---
// `)

// await generateTypes();

await generateComponents();