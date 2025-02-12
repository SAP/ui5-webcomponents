import ListItemGroupTemplate from "./ListItemGroupTemplate.js";
import type SuggestionItemGroup from "./SuggestionItemGroup.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";

export default function SuggestionItemGroupTemplate(this: SuggestionItemGroup) {
	return ListItemGroupTemplate.call(this, undefined, {
		groupHeaderRole: ListItemAccessibleRole.Group,
		groupRole: "none",
	 });
}
