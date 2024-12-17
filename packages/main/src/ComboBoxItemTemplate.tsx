import ListItemBaseTemplate from "./ListItemBaseTemplate.js";
import type ComboBoxItem from "./ComboBoxItem.js";

export default function ComboBoxItemTemplate(this: ComboBoxItem) {
	return ListItemBaseTemplate.call(this, { listItemContent }, { role: "option" });
}

function listItemContent(this: ComboBoxItem) {
	return (
		<div part="content" id="content" class="ui5-li-content">
			<div class="ui5-li-text-wrapper">
				{ this.text && <span part="title" className="ui5-li-title">{this.text}</span> }
				{ this.additionalText && <span part="additional-text" class="ui5-li-additional-text">{this.additionalText}</span> }
			</div>
		</div>
	);
}
