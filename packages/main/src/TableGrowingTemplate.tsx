import type TableGrowing from "./TableGrowing.js";

export default function TableGrowingTemplate(this: TableGrowing) {
	return (
		<div
			id="growing-button"
			tabindex={-1}
			ui5-growing-active={this._activeState}
			onClick={this.loadMore}
			onKeyDown={this._onKeydown}
			onKeyUp={this._onKeyup}
			onFocusOut={this._onFocusout}
			role="button"
			aria-labelledby="growing-text growing-subtext"
			aria-describedby="growing-description">
			<span id="growing-text">{this._growingButtonText}</span>
			{ this.growingSubText &&
				<span id="growing-subtext">{this.growingSubText}</span>
			}
			<span id="growing-description" style="display: none;" aria-hidden="true">{this._growingButtonDescription}</span>
		</div>
	);
}
