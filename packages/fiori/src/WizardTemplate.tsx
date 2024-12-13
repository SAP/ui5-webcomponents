import type Wizard from "./Wizard.js";
import WizardTab from "./WizardTab.js";
import WizardPopoverTemplate from "./WizardPopoverTemplate.js";

export default function WizardTemplate(this: Wizard) {
	return (<>
		<div class="ui5-wiz-root"
			 aria-label={this.ariaLabelText}
			 role="region"
		>
			<nav class="ui5-wiz-nav"
				 part="navigator"
				 aria-label={this.navAriaLabelText}
				 tabIndex={-1}
			>
				<div class="ui5-wiz-nav-list"
					 role="list"
					 aria-label={this.listAriaLabelText}
					 aria-describedby="wiz-nav-descr"
					 aria-controls={`${this._id}-wiz-content`}
				>
					{this._stepsInHeader.map(step =>
						<WizardTab
							titleText={step.titleText}
							subtitleText={step.subtitleText}
							icon={step.icon}
							number={String(step.number)}
							disabled={step.disabled}
							selected={step.selected}
							hideSeparator={step.hideSeparator}
							activeSeparator={step.activeSeparator}
							branchingSeparator={step.branchingSeparator}
							_wizardTabAccInfo={step.accInfo}
							data-ui5-content-ref-id={step.refStepId}
							data-ui5-index={step.pos}
							onSelectionChangeRequested={this.onSelectionChangeRequested}
							onFocused={this.onStepInHeaderFocused}
							onClick={this._onGroupedTabClick}
							style={step.styles}
						/>
					)}
				</div>
			</nav>

			<span id="wiz-nav-descr"
				  class="ui5-hidden-text"
				  aria-hidden="true"
			>{this.navAriaDescribedbyText}</span>

			<div id={`${this._id}-wiz-content`}
				 class="ui5-wiz-content"
				 onScroll={this.onScroll}
			>
				{this._steps.map(step =>
					<div class={{
						"ui5-wiz-content-item": true,
						"ui5-wiz-content-item-stretch": step.stretch,
						"ui5-wiz-content-item-selected": step.selected,
					}}
					hidden={step.disabled}
					part="step-content"
					aria-label={step.stepContentAriaLabel}
					role="region"
					data-ui5-content-item-ref-id={step._id}
					>
						<div class="ui5-wiz-content-item-wrapper">
							<slot name={step._individualSlot}></slot>
						</div>
					</div>
				)}
			</div>
		</div>
		{WizardPopoverTemplate.call(this)}
	</>);
}
