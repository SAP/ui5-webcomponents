import { generateTypes } from "./types.mjs";
import { generateComponents } from "./components.mjs";
import { loadManifests } from "./manifest.mjs";
import { generateAutocompleteHints } from "./autocomplete-hints.mjs";

loadManifests();

generateTypes();

generateComponents();

generateAutocompleteHints();