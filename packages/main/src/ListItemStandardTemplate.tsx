import Icon from "./Icon.js";
import type ListItemStandard from "./ListItemStandard.js";
import ListItemTemplate from "./ListItemTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	imageBegin,
	iconBegin,
	iconEnd,
	listItemContent
};

export default function ListItemStandardTemplate(this: ListItemStandard, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return ListItemTemplate.call(this, currentHooks);
}

function listItemContent(this: ListItemStandard) {
	return <>
		<div class="ui5-li-text-wrapper">
			<span part="title" class="ui5-li-title">
				<slot></slot>
			</span>
			{this.description && (
				<div class="ui5-li-description-info-wrapper">
					<span part="description" class="ui5-li-desc">{this.description}</span>
					{
						this.additionalText && (
							<span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>
						)
					}
				</div>
			)}

			{!this.typeActive && <span class="ui5-hidden-text">{this.type}</span>}
		</div>

		{!this.description && this.additionalText && (
			<span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>
		)}
	</>;
}

function imageBegin(this: ListItemStandard) {
	if (this.hasImage) {
		return <div class="ui5-li-image">
			<slot name="image"></slot>
		</div>;
	}
}

function iconBegin(this: ListItemStandard) {
	if (this.displayIconBegin) {
		return <Icon
			part="icon"
			name={this.icon}
			class="ui5-li-icon"
			mode="Decorative" />;
	}
}

function iconEnd(this: ListItemStandard) {
	if (this.displayIconEnd) {
		return <Icon
			part="icon"
			name={this.icon}
			class="ui5-li-icon"
			mode="Decorative" />;
	}
}
