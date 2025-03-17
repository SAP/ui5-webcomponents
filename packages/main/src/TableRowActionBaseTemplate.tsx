import Button from "./Button.js";
import Icon from "./Icon.js";
import type TableRowActionBase from "./TableRowActionBase.js";

export default function TableRowActionBaseTemplate(this: TableRowActionBase) {
	return (
		<>
			{ this.invisible ?
				<div></div>
				:
				this._isInteractive ?
					<Button
						icon={this._icon}
						tooltip={this._text}
						onClick={this._onActionClick}
						design="Transparent"
					></Button>
					:
					<Icon
						name={this._icon}
						accessibleName={this._text}
						showTooltip={true}
						design="NonInteractive"
					></Icon>
			}
		</>
	);
}
