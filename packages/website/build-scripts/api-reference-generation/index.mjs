import { generateTypes } from "./types.mjs";
import { generateComponents } from "./components.mjs";
import { loadManifests } from "./manifest.mjs";

loadManifests();

generateTypes();

generateComponents();