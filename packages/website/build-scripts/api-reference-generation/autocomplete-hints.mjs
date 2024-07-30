import { getAutocompleteData } from "./manifest.mjs";
import { writeFile } from "fs/promises";

function generateAutocompleteHints() {
    writeFile("src/components/Editor/ui5-autocomplete.json", JSON.stringify(getAutocompleteData(), 2, 2));
}

export { generateAutocompleteHints };