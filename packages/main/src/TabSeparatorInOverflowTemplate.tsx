import type TabSeparator from "./TabSeparator.js";
import ListItemCustom from "./ListItemCustom.js";

export default function (this: TabSeparator) {
	return (
		<ListItemCustom
			id={this._id}
			// role="separator"
			class="ui5-tc__separator"
			disabled={true}
			style={this._forcedStyleInOverflow}
			ref={this.captureRef}
		>
		</ListItemCustom>
	)
};
