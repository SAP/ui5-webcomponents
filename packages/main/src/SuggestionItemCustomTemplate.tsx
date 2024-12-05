import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type SuggestionItemCustom from "./SuggestionItemCustom.js";

export default function (this: SuggestionItemCustom) {
	return ListItemBaseTemplate.call(this, { listItemContent });
}

function listItemContent(this: SuggestionItemCustom) {
	return <slot></slot>;
}
