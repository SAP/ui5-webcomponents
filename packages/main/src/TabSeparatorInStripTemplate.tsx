import type TabSeparator from "./TabSeparator.js";

export default function TabSeparatorInStripTemplate(this: TabSeparator) {
	return (
		<div
			id={this._id}
			role="separator"
			class="ui5-tc__separator"
			ref={this.captureRef.bind(this)}
		></div>
	);
}
