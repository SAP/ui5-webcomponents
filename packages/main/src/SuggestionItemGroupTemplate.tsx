import ListItemGroupTemplate from "./ListItemGroupTemplate.js";
import type SuggestionItemGroup from "./SuggestionItemGroup.js";

export default function (this: SuggestionItemGroup) {
	return ListItemGroupTemplate.call(this);
};