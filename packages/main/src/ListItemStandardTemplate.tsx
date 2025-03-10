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
	const shouldSetColumnLayout = this.hasExpandableDescription && this.hasExpandableAdditionalText;

	return <>
		<div class="ui5-li-text-wrapper">
			{renderTitle.call(this)}

			{shouldRenderDescriptionInfoWrapper.call(this) && (
				<div class={{
					"ui5-li-description-info-wrapper": true,
					"ui5-li-description-info-wrapper--column": shouldSetColumnLayout,
				}}>
					{renderDescription.call(this)}
					{renderAdditionalText.call(this)}
				</div>
			)}

			{renderHiddenText.call(this)}
		</div>

		{renderStandaloneAdditionalText.call(this)}
	</>;
}

function shouldRenderDescriptionInfoWrapper(this: ListItemStandard): boolean {
	return !!(this.description || this.hasExpandableDescription);
}

function renderTitle(this: ListItemStandard) {
	return (
		<span part="title" class="ui5-li-title">
			<slot></slot>
		</span>
	);
}

function renderDescription(this: ListItemStandard) {
	if (this.hasExpandableDescription) {
		return (
			<span part="description" class="ui5-li-desc">
				<slot name="expandableDescription"></slot>
			</span>
		);
	}

	if (this.description) {
		return (
			<span part="description" class="ui5-li-desc">
				{this.description}
			</span>
		);
	}

	return null;
}

function renderAdditionalText(this: ListItemStandard) {
	if (this.hasExpandableAdditionalText) {
		return (
			<span part="additional-text" class="ui5-li-additional-text">
				<slot name="expandableAdditionalText"></slot>
			</span>
		);
	}

	if (this.additionalText) {
		return (
			<span part="additional-text" class="ui5-li-additional-text">
				{this.additionalText}
			</span>
		);
	}

	return null;
}

function renderStandaloneAdditionalText(this: ListItemStandard) {
	const hasDescriptionWrapper = shouldRenderDescriptionInfoWrapper.call(this);
	const hasAdditionalText = this.hasExpandableAdditionalText || this.additionalText;

	if (!hasDescriptionWrapper && hasAdditionalText) {
		if (this.hasExpandableAdditionalText) {
			return (
				<span part="additional-text" class="ui5-li-additional-text">
					<slot name="expandableAdditionalText"></slot>
				</span>
			);
		}

		return (
			<span part="additional-text" class="ui5-li-additional-text">
				{this.additionalText}
			</span>
		);
	}

	return null;
}

function renderHiddenText(this: ListItemStandard) {
	if (!this.typeActive) {
		return <span class="ui5-hidden-text">{this.type}</span>;
	}

	return null;
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
