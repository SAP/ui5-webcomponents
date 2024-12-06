import DropIndicator from "./DropIndicator.js";
import type Tree from "./Tree.js";
import TreeList from "./TreeList.js";

export default function TreeTemplate(this: Tree) {
	return (
		<TreeList
			class="ui5-tree-root"
			selectionMode={this.selectionMode}
			headerText={this.headerText}
			footerText={this.footerText}
			noDataText={this.noDataText}
			accessibleRole={this._role}
			accessibleName={this.accessibleName}
			accessibleNameRef={this.accessibleNameRef}
			accessibleDescription={this.accessibleDescription}
			accessibleDescriptionRef={this.accessibleDescriptionRef}
			onDragEnter={this._ondragenter}
			onDragOver={this._ondragover}
			onDrop={this._ondrop}
			onDragLeave={this._ondragleave}
			onItemClick={this._onListItemClick}
			onItemDelete={this._onListItemDelete}
			onItemFocused={this._onListItemFocus}
			onSelectionChange={this._onListSelectionChange}
			onMouseOver={this._onListItemMouseOver}
			onMouseOut={this._onListItemMouseOut}
			// events bubbling from slotted items
			onui5-toggle={this._onListItemToggle}
			onui5-step-in={this._onListItemStepIn}
			onui5-step-out={this._onListItemStepOut}
		>
			{this._hasHeader && <slot name="header" slot="header"></slot>}

			<slot></slot>

			<DropIndicator orientation="Horizontal" ownerReference={this} />
		</TreeList>
	);
}
