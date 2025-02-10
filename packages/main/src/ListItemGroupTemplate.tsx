import type ListItemGroup from "./ListItemGroup.js";
import ListItemGroupHeader from "./ListItemGroupHeader.js";
import DropIndicator from "./DropIndicator.js";

export default function ListItemGroupTemplate(this: ListItemGroup, hooks?: { items: () => void }) {
	const items = hooks?.items || defaultItems;

	return (
		<>
			{this.hasHeader &&
				<ListItemGroupHeader focused={this.focused} part="header">
					{ this.hasFormattedHeader ? <slot name="header"></slot> : this.headerText }
					<div
						slot="subItems"
						aria-owns={`${this._id}-content`}
					></div>
				</ListItemGroupHeader>
			}
			<ul class="ui5-group-li-root"
				onDragEnter={this._ondragenter}
				onDragOver={this._ondragover}
				onDrop={this._ondrop}
				onDragLeave={this._ondragleave}
				id={`${this._id}-content`}>

				{ items.call(this) }

				<DropIndicator orientation="Horizontal" ownerReference={this}/>
			</ul>
		</>

	);
}

function defaultItems(this: ListItemGroup) {
	return <slot></slot>;
}
