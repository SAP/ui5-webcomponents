import type SuggestionListItem from "./SuggestionListItem.js";
import ListItemStandardTemplate from "./ListItemStandardTemplate.js";
import type { ListItemHooks } from "./ListItemTemplate.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function SuggestionListItemTemplate(this: SuggestionListItem, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return ListItemStandardTemplate.call(this, currentHooks);
}

function listItemContent(this: SuggestionListItem) {
	return <>
		<div class="ui5-li-text-wrapper">
			{this.hasTitle && (
				<span part="title" class="ui5-li-title">
					<slot></slot>
				</span>
			)}

			{this.hasDescription && (
				<div class="ui5-li-description-info-wrapper">
					<span part="description" class="ui5-li-desc">
						{
							this.richDescription.length ? (
								<slot name="richDescription"></slot>
							) : (
								this.description
							)}
					</span>

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
