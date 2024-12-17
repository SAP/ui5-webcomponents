import type MenuSeparator from "./MenuSeparator.js";
import ListItemCustom from "./ListItemCustom.js";

export default function MenuSeparatorTemplate(this: MenuSeparator) {
	return (
		<ListItemCustom
			class="ui5-menu-separator"
			_forcedAccessibleRole="separator"
			disabled={true}
		/>
	);
}
