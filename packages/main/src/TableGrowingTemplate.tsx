import type TableGrowing from "./TableGrowing.js";

export default function TableGrowingTemplate(this: TableGrowing) {
	return (
		<div
			id="growing-button"
			tabindex={-1}
			data-ui5-growing-active={this._activeState}
			onClick={this.loadMore}
			onKeyDown={this._onKeydown}
			onKeyUp={this._onKeyup}
			onFocusOut={this._onFocusout}
			role="button"
			aria-labelledby="text subtext"
			aria-describedby="growing-description">
			<span id="text">{this._growingButtonText}</span>
			{ this.subText &&
				<span id="subtext">{this.subText}</span>
			}
			<span id="growing-description" class="ui5-hidden-text" aria-hidden="true">{this._growingButtonDescription}</span>
		</div>
	);
}
