import { getAutocompleteData } from "./manifest.mjs";
import { writeFile } from "fs/promises";

function generateAutocompleteHints() {
    // console.log(JSON.stringify(getAutocompleteData(), 2, 2));
    writeFile("src/components/Editor/ui5-autocomplete.json", JSON.stringify(getAutocompleteData(), 2, 2));
}

export { generateAutocompleteHints };