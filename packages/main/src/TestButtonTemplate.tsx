import type TestButton from "./TestButton.js";
import Icon from "./Icon.js";
// import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";

export default function TestButtonTemplate(this: TestButton) {
	// const startIcon = this.currentStateObject?.icon;
	// const text = this.currentStateObject?.text;
	// const endIcon = this.currentStateObject?.endIcon;
	// const arrowBtn = this.currentStateObject?.showArrowButton;

	return (
		<div
			class="test-button-root"
			tabindex={this.effectiveTabIndex}
			onClick={this.handleClick}
			onKeyDown={this.handleKeyDown}
			onKeyUp={this.handleKeyUp}
			onFocusIn={this.handleFocusIn}
			onFocusOut={this.handleFocusOut}
		>
			<button
				class="test-button-inner"
				id="main-btn"
				tabindex={-1}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				onKeyUp={this.handleKeyUp}
				data-main-btn-active={this.mainBtnActivated}
			>

				<Icon name={this._prevStateObject?.icon} id="start-icon" data-icon="true" />
				<div id="text" data-text="true">{this._prevStateObject?.text || ""}</div>
				{/* {endIcon ? <Icon name={endIcon} id="end-icon" /> : undefined} */}
			</button>

			{/* {arrowBtn ? arrowBtnTemplate.call(this) : undefined} */}
		</div>
	);
}

// function arrowBtnTemplate(this: TestButton) {
// 	return <button
// 		class="test-button-inner test-button-arrow"
// 		id="arrow-btn"
// 		tabindex={-1}
// 		data-arrow-btn-active={this.arrowBtnActivated}
// 		onClick={this.handleClick}
// 		onKeyDown={this.handleKeyDown}
// 		onKeyUp={this.handleKeyUp}
// 	>
// 		<Icon name={slimArrowDown} id="arrow-icon" />
// 	</button>;
// }
