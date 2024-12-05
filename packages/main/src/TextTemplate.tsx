import type Text from "./Text.js";

export default function (this: Text) {
	return <>
		<span>
			<span> { this.emptyIndicatorMode } </span>
			{ this._renderEmptyIndicator ?
				<>
					<span className="empty-indicator" aria-hidden="true">{ this._emptyIndicatorSymbol }</span>
					<span className="empty-indicator-aria-label">{ this._emptyIndicatorAriaLabel }</span>
				</>
				:
				<slot></slot>
			}
		</span>
	</>;
}
