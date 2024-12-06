import type ListItemGroupHeader from "./ListItemGroupHeader.js";

export default function ListItemGroupHeaderTemplate(this: ListItemGroupHeader) {
	return (
		<ul
			role="group"
			part="native-li"
			tabindex={this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined}
			class={{
				"ui5-ghli-root": true,
				...this.classes.main,
			}}
			aria-label={this.ariaLabelText}
			aria-roledescription={this.groupHeaderText}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
		>
			<div id={`${this._id}-content`} class="ui5-li-content">
				<span class="ui5-ghli-title"><slot></slot></span>
			</div>
		</ul>
	);
}
