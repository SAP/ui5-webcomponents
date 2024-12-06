import type TreeItemCustom from "./TreeItemCustom.js";
import TreeItemBaseTemplate from "./TreeItemBaseTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function TreeItemCustomTemplate(this: TreeItemCustom, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return TreeItemBaseTemplate.call(this, currentHooks);
}

function listItemContent(this: TreeItemCustom) {
	return (
		<div class="ui5-li-tree-text-wrapper">
			<slot name="content" slot="content"></slot>
		</div>
	);
}
