import MainButton from "@ui5/webcomponents/dist/Button.js";
import type Button from "./Button.js";

export default function (this: Button) {
	return (<>
		<MainButton
			class="ui5-ai-button-inner"
			design={this.design}
			icon={this._stateIcon}
			endIcon={this._stateEndIcon}
			disabled={this.disabled}
			onClick={this._onclick}
		>
			{this._hasText && (
				<div class="ui5-ai-button-text">{this._stateText}</div>
			)}
		</MainButton>

		<MainButton
			class="ui5-ai-button-hidden"
			design={this.design}
		></MainButton>
	</>);
}
