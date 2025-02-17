import type { AriaRole } from "@ui5/webcomponents-base/";
import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";
import ListItemAccessibleRole from "./types/ListItemAccessibleRole.js";

export default function ListItemGroupTemplate(this: ListItemGroup, hooks?: { items: () => void }, injectedProps?: {
	groupHeaderRole?: `${ListItemAccessibleRole}`,
	groupRole?: AriaRole,
}) {
	const items = hooks?.items || defaultItems;
	const groupHeaderRole = injectedProps?.groupHeaderRole || ListItemAccessibleRole.ListItem;
	const groupRole = injectedProps?.groupRole || "list";

	return (
		<>
			{this.hasHeader &&
				<ListItemGroupHeader focused={this.focused} part="header" accessibleRole={groupHeaderRole}>
					{ this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText }
					<div
						role={groupRole}
						slot="subItems"
						aria-owns={`${this._id}-content`}
						aria-label={this.headerText}
					></div>
				</ListItemGroupHeader>
			}
			<div class="ui5-group-li-root"
				onDragEnter={this._ondragenter}
				onDragOver={this._ondragover}
				onDrop={this._ondrop}
				onDragLeave={this._ondragleave}
				id={`${this._id}-content`}>

				{ items.call(this) }

				<DropIndicator orientation="Horizontal" ownerReference={this}/>
			</div>
		</>

	);
}

function defaultItems(this: ListItemGroup) {
	return <slot></slot>;
}
