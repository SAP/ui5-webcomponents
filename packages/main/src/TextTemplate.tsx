import type Text from "./Text.js";

export default function TextTemplate(this: Text) {
	return <>
		<span>
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
