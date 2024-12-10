import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type SuggestionItemCustom from "./SuggestionItemCustom.js";

export default function SuggestionItemCustomTemplate(this: SuggestionItemCustom) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: SuggestionItemCustom) {
	return <slot></slot>;
}
