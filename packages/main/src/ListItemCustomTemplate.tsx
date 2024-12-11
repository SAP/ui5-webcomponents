import type ListItemCustom from "./ListItemCustom.js";
import ListItemTemplate from "./ListItemTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function ListItemCustomTemplate(this: ListItemCustom, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return ListItemTemplate.call(this, currentHooks);
}

function listItemContent(this: ListItemCustom) {
	return <slot></slot>;
}
