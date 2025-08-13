import type TreeItem from "./TreeItem.js";
import TreeItemBaseTemplate from "./TreeItemBaseTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function TreeItemTemplate(this: TreeItem, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return TreeItemBaseTemplate.call(this, currentHooks);
}

function listItemContent(this: TreeItem) {
	return <>
		<div class="ui5-li-text-wrapper">
			{!!this._showTitle &&
				<div part="title" class="ui5-li-title"> {this.text}</div>
			}
		</div>
		{this.additionalText &&
			<span part="additional-text" class="ui5-li-additional-text">
				{this.additionalText}
			</span>
		}
	</>;
}
