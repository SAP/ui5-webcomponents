import Icon from "./Icon.js";
import type ListItemCustom from "./ListItemCustom.js";
import ListItemTemplate from "./ListItemTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function ListItemCustomTemplate(this: ListItemCustom, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return (
		<>
			{ListItemTemplate.call(this, currentHooks)}

			{/* Custom red drag element for ListItemCustom - hidden by default */}
			<div
				class="ui5-li-custom-drag-element"
				style={{
					display: "none",
					position: "absolute",
					top: "-1000px",
					left: "-1000px",
					background: "#ff4444",
				}}
			>
				<Icon name="grid" style={{ color: "#ffffff" }} />
				<span class="ui5-drag-count">Custom Item</span>
			</div>
		</>
	);
}

function listItemContent(this: ListItemCustom) {
	return <slot></slot>;
}
