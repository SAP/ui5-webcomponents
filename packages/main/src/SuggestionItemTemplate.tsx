import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type SuggestionItem from "./SuggestionItem.js";

export default function SuggestionItemTemplate(this: SuggestionItem) {
	return [ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" })];
}

function listItemContent(this: SuggestionItem) {
	return <div part="content" id="content" class="ui5-li-content">
		<div class="ui5-li-text-wrapper">
			<span part="title" className="ui5-li-title" dangerouslySetInnerHTML={{ __html: this.markupText }}></span>
			{this.additionalText &&
				<span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span>
			}
		</div>
	</div>;
}
