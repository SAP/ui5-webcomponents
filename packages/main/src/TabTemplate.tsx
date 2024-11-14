import type Tab from "./Tab.ts";

export default function (this: Tab) {
	return (
		<div
			id={this._id}
			class="ui5-tab-root"
			data-ui5-stable={this.stableDomRef}
		>
			<slot name={this._defaultSlotName}></slot>
			{this.tabs.map(tab =>
				<slot name={tab._effectiveSlotName as string}></slot>
			)}
		</div>
	);
}