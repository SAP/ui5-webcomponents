import { generateTypes } from "./types.mjs";
import { generateComponents } from "./components.mjs";

await generateTypes();

await generateComponents();