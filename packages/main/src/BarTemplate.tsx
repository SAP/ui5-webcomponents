import type Bar from "./Bar.js"

export default function (this: Bar) {
	return (
	<div
		class="ui5-bar-root"
		aria-label={this.accInfo.label}
		role="toolbar"
		part="bar"
	>
		<div class="ui5-bar-content-container ui5-bar-startcontent-container">
				<slot name="startContent"></slot>
		</div>
		<div class="ui5-bar-content-container ui5-bar-midcontent-container">
			<slot></slot>
		</div>
		<div class="ui5-bar-content-container ui5-bar-endcontent-container">
			<slot name="endContent"></slot>
		</div>
	</div>);
};
