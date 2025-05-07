import Icon from "@ui5/webcomponents/dist/Icon.js";
import type WizardTab from "./WizardTab.js";

export default function WizardTabTemplate(this: WizardTab) {
	return (
		<div class="ui5-wiz-step-root"
			role="listitem"
			tabIndex={this.effectiveTabIndex}
			aria-current={this.accInfo.ariaCurrent}
			aria-setsize={this.accInfo.ariaSetsize}
			aria-posinset={this.accInfo.ariaPosinset}
			aria-label={this.accInfo.ariaLabel}
			onClick={this._onclick}
			onKeyUp={this._onkeyup}
			onFocusIn={this._onfocusin}
		>
			<div class="ui5-wiz-step-main">
				<div class="ui5-wiz-step-icon-circle">
					{this.icon ? (
						<Icon class="ui5-wiz-step-icon" mode="Decorative" name={this.icon}/>
					) : (
						<span class="ui5-wiz-step-number">{this.number}</span>
					)}
				</div>
				{this.hasTexts && (
					<div class="ui5-wiz-step-texts">
						<div class="ui5-wiz-step-title-text">{this.titleText}</div>
						{ this.subtitleText &&
							<div class="ui5-wiz-step-subtitle-text">{this.subtitleText}</div>
						}
					</div>
				)}
			</div>
			{!this.hideSeparator && (
				<div class="ui5-wiz-step-hr"></div>
			)}
		</div>
	);
}
