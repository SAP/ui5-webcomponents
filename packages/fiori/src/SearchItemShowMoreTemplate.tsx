import type SearchItemShowMore from "./SearchItemShowMore.js";

export default function SearchItemShowMoreTemplate(this: SearchItemShowMore) {
	return (
		<li
			part="native-li"
			class="ui5-li-root ui5-li--focusable ui5-search-item-show-more"
			role="option"
			tabindex={this._effectiveTabIndex}
			aria-selected={this.selected}
			onKeyDown={this._onkeydown}
			onClick={this._onclick}
		>
			<span class="ui5-search-item-show-more-text">{this.text}</span>
		</li>
	);
}
