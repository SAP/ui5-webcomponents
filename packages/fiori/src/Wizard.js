import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import Float from "@ui5/webcomponents-base/dist/types/Float.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ResponsivePopover from "@ui5/webcomponents/dist/ResponsivePopover.js";

// Texts
import {
	WIZARD_NAV_STEP_DEFAULT_HEADING,
	WIZARD_NAV_ARIA_ROLE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";

// Step in header and content
import WizardTab from "./WizardTab.js";
import WizardStep from "./WizardStep.js";

// Template and Styles
import WizardTemplate from "./generated/templates/WizardTemplate.lit.js";
import WizardPopoverTemplate from "./generated/templates/WizardPopoverTemplate.lit.js";
import WizardCss from "./generated/themes/Wizard.css.js";
import WizardPopoverCss from "./generated/themes/WizardPopover.css.js";


const MIN_STEP_WIDTH_NO_TITLE = 64;
const MIN_STEP_WIDTH_WITH_TITLE = 200;

const EXPANDED_STEP = "data-ui5-wizard-expanded-tab";
const AFTER_EXPANDED_STEP = "data-ui5-wizard-expanded-tab-next";
const AFTER_CURRENT_STEP = "data-ui5-wizard-after-current-tab";
const BEFORE_EXPANDED_STEP = "data-ui5-wizard-expanded-tab-prev";

/**
 * @public
 */
const metadata = {
	tag: "ui5-wizard",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.Wizard.prototype */ {
		/**
		 * Defines the aria-label text of the <code>ui5-wizard</code>.
		 *
		 * @type {String}
		 * @defaultvalue undefined
		 * @private
		 */
		ariaLabel: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * Defines the width of the <code>ui5-wizard</code>.
		 * @private
		 */
		width: {
			type: Float,
		},

		/**
		 * Defines the height of the <code>ui5-wizard</code> content.
		 * @private
		 */
		contentHeight: {
			type: Float,
		},

		_groupedTabs: {
			type: String,
			multiple: true,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.Wizard.prototype */ {
		/**
		 * Defines the steps.
		 * <br><br>
		 * <b>Note:</b> Use the available <code>ui5-wizard-step</code> component.
		 *
		 * @type {HTMLElement[]}
		 * @public
		 * @slot steps
		 */
		"default": {
			propertyName: "steps",
			type: HTMLElement,
			"individualSlots": true,
			invalidateOnChildChange: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.Wizard.prototype */ {
		/**
		 * Fired when the step selection is changed by user interaction - either with scrolling,
		 * or by clicking on the steps within the component header.
		 *
		 * @event sap.ui.webcomponents.fiori.Wizard#selection-change
		 * @param {HTMLElement} selectedStep the newly selected step
		 * @param {HTMLElement} previouslySelectedStep the previously selected step
		 * @public
		 */
		"selection-change": {
			detail: {
				selectedStep: { type: HTMLElement },
				previouslySelectedStep: { type: HTMLElement },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-wizard</code> helps users complete a complex task by dividing it into sections and guiding the user through it.
 * It has two main areas - a navigation area at the top showing the step sequence and a content area below it.
 *
 * <h3>Structure</h3>
 * <h4>Navigation area</h4>
 * The top most area of the <code>ui5-wizard</code> is occupied by the navigation area.
 * It shows the sequence of steps, where the recommended number of steps is between 3 and 8 steps.
 * <ul>
 * <li> Steps can have different visual representations - numbers or icons.
 * <li> Steps might have labels for better readability - heading and subheding.</li>
 * <li> Steps are defined by using the <code>ui5-wizard-step</code> as slotted element within the <code>ui5-wizard</code></li>
 * </ul>
 *
 * <b>Note:</b> If no selected step is defined, the first step will be auto selected.
 * <br>
 * <b>Note:</b> If multiple selected steps are defined, the last step will be selected.
 *
 * <h4>Content</h4>
 * The content occupies the main part of the page. It can hold any type of HTML elements.
 * It's defined by using the <code>ui5-wizard-step</code> as slotted element within the <code>ui5-wizard</code>.
 *
 * <h3>Scrolling</h3>
 * The component handles user scrolling by selecting the closest step, based on the current scroll position
 * and scrolls to particular place, when the user clicks on the step within the navigation area.
 * <br><br>
 *
 * <b>Important:</b> In order the component's scrolling behaviour to work, it has to be limited from the outside parent element in terms of height.
 * The component or its parent has to be given percentage or absolute height. Otherwise, the component will be scrolled out with the entire page.
 * <br><br>
 * <b>For example:</b>
 * <br><br>
 * <code>&lt;ui5-dialog style="height: 80%"&gt;<br></code>
 * <code>&#9;&lt;ui5-wizard&gt;&lt;/ui5-wizard&gt;<br></code>
 * <code>&lt;/ui5-dialog&gt;</code>
 *
 * <h4>Moving to next step</h4>
 * The <code>ui5-wizard-step</code> provides the necessary API and it's up to the user of the component to use it to move to the next step.
 * You have to set its <code>selected</code> property (and remove the <code>disabled</code> one if set) to <code>true</code>.
 * And, the <code>ui5-wizard</code> will automatically scroll to the content of the newly selected step.
 * <br><br>
 *
 * The Fiori 3 guidelines recommends having a "nextStep" button in the content area.
 * You can place a button, or any other type of element to trigger step change, inside the <code>ui5-wizard-step</code>,
 * and show/hide it when certain fields are filled or user defined criteria is met.
 *
 * <h3>Usage</h3>
 * <h4>When to use:</h4>
 * When the user has to accomplish a long set of tasks.
 * <h4>When not to use:</h4>
 * When the task has less than 3 steps.
 *
 * <h3>Responsive Behavior</h3>
 * On small widths the step's heading, subheading and separators in the navigation area
 * will start truncate and shrink and from particular point they will hide to free as much space as possible.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import @ui5/webcomponents-fiori/dist/Wizard.js";</code> (includes <ui5-wizard-step>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.Wizard
 * @extends UI5Element
 * @tagname ui5-wizard
 * @since 1.0.0-rc.10
 * @appenddocs WizardStep
 * @public
 */
class Wizard extends UI5Element {
	constructor() {
		super();

		// Stores the scroll offsets of the steps,
		// e.g. the steps' starting point.
		this.stepScrollOffsets = [];

		// Stores references to the grouped steps.
		this._groupedTabs = [];

		// Keeps track of the selected step index.
		this.selectedStepIndex = 0;

		// Indicates that selection will be changed
		// due to user click.
		this.selectionRequestedByClick = false;

		// Indicates that selection will be changed
		// due to user scroll.
		this.selectionRequestedByScroll = false;

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			getItemsCallback: () => this.enabledStepsInHeaderDOM,
		});

		this._onStepResize = this.onStepResize.bind(this);

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	get classes() {
		return {
			popover: {
				"ui5-wizard-responsive-popover": true,
				"ui5-wizard-popover": !isPhone(),
				"ui5-wizard-dialog": isPhone(),
			},
		};
	}

	static get styles() {
		return WizardCss;
	}

	static get staticAreaStyles() {
		return WizardPopoverCss;
	}

	static get template() {
		return WizardTemplate;
	}

	static get dependencies() {
		return [
			WizardTab,
			WizardStep,
			ResponsivePopover,
			Button,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents-fiori");
	}

	static get PHONE_BREAKPOINT() {
		return 599;
	}

	static get SCROLL_DEBOUNCE_RATE() {
		return 25;
	}

	static get CONTENT_TOP_OFFSET() {
		return 32;
	}

	static get staticAreaTemplate() {
		return WizardPopoverTemplate;
	}

	onExitDOM() {
		this.detachStepsResizeObserver();
	}

	onBeforeRendering() {
		this.syncSelection();
	}

	onAfterRendering() {
		this.storeStepScrollOffsets();
		this.scrollToSelectedStep();
		this.attachStepsResizeObserver();
	}

	/**
	 * Normalizes the step selection as follows:
	 * (1) If there is no selected step - the first step is going to be selected.
	 * (2) If the selected steps are more than one - the last step is going to be selected.
	 * (3) If the selected step is also disabled - log a warning.
	 * @private
	 */
	syncSelection() {
		if (this.stepsCount === 0) {
			return;
		}

		// If no selected steps -> select the first step.
		if (this.selectedStepsCount === 0) {
			this.selectFirstStep();
			console.warn("Selecting the first step: no selected step is defined."); // eslint-disable-line
		}

		// If there are multiple selected steps -> keep the last selected one.
		if (this.selectedStepsCount > 1) {
			this.selectLastSelectedStep();
			console.warn(`Selecting the last step defined as selected: multiple selected steps are defined.`); // eslint-disable-line
		}

		// If the selected step is defined as disabled - log warning.
		if (this.selectedStep && this.selectedStep.disabled) {
			console.warn("The selected step is disabled: you need to enable it in order to interact with the step."); // eslint-disable-line
		}

		// Place for improvement: If the selected step is not the first, enable all the prior steps
		this.selectedStepIndex = this.getSelectedStepIndex();
	}

	/**
	 * Selects the first step.
	 * @private
	 */
	selectFirstStep() {
		this.deselectAll();
		this.slottedSteps[0].selected = true;
		this.slottedSteps[0].disabled = false;
	}

	/**
	 * Selects the last step from multiple selected ones.
	 * @private
	 */
	selectLastSelectedStep() {
		const lastSelectedStep = this.lastSelectedStep;

		if (lastSelectedStep) {
			this.deselectAll();
			lastSelectedStep.selected = true;
			lastSelectedStep.disabled = false;
		}
	}

	/**
	 * Deselects all steps.
	 * @private
	 */
	deselectAll() {
		this.slottedSteps.forEach(step => {
			step.selected = false;
		});
	}

	/**
	 * Stores the scroll offsets of the steps,
	 * e.g. the steps' starting point.
	 *
	 * <b>Note:</b> the disabled ones has negative offsets.
	 * @private
	 */
	storeStepScrollOffsets() {
		this.stepScrollOffsets = this.slottedSteps.map(step => {
			const contentItem = this.getStepWrapperByRefId(step._id);
			return contentItem.offsetTop + contentItem.offsetHeight - Wizard.CONTENT_TOP_OFFSET;
		});
	}

	/**
	 * Handles user click on steps' tabs within the header.
	 * <b>Note:</b> the handler is bound in the template.
	 * @param {Event} event
	 * @private
	 */
	onSelectionChangeRequested(event) {
		this.selectionRequestedByClick = true;
		this.changeSelectionByStepClick(event.target);
	}

	/**
	 * Handles user scrolling with debouncing.
	 * <b>Note:</b> the handler is bound in the template.
	 * @param {Event} event
	 * @private
	 */
	onScroll(event) {
		if (this.selectionRequestedByClick) {
			this.selectionRequestedByClick = false;
			return;
		}

		debounce(this.changeSelectionByScroll.bind(this, event.target.scrollTop), Wizard.SCROLL_DEBOUNCE_RATE);
	}

	/**
	 * Handles when a step in the header is focused in order to update the <code>ItemNavigation</code>.
	 * <b>Note:</b> the handler is bound in the template.
	 * @param {Event} event
	 * @private
	 */
	onStepInHeaderFocused(event) {
		this._itemNavigation.setCurrentItem(event.target);
	}

	/**
	 * Handles resize in order to:
	 * (1) sync steps' scroll offset and selection
	 * (2) adapt navition step header
	 * @private
	 */
	onStepResize() {
		this.width = this.getBoundingClientRect().width;
		this.contentHeight = this.getContentHeight();

		if (this.responsivePopover && this.responsivePopover.opened) {
			this._closeRespPopover();
		}
	}

	attachStepsResizeObserver() {
		this.stepsDOM.forEach(stepDOM => {
			ResizeHandler.deregister(stepDOM, this._onStepResize);
			ResizeHandler.register(stepDOM, this._onStepResize);
		});
	}

	detachStepsResizeObserver() {
		this.stepsDOM.forEach(stepDOM => {
			ResizeHandler.deregister(stepDOM, this._onStepResize);
		});
	}

	/**
	 * Updates the expanded attribute for each ui5-wizard-tab based on the ui5-wizard width
	 * @private
	 */
	_adjustHeaderOverflow() {
		let counter = 0;
		let isForward = true;
		const iWidth = this.width;
		const iCurrStep = this.getSelectedStepIndex();
		const iStepsToShow = this.steps.length ? Math.floor(iWidth / MIN_STEP_WIDTH_WITH_TITLE) : Math.floor(iWidth / MIN_STEP_WIDTH_NO_TITLE);

		const tabs = this.shadowRoot.querySelectorAll("ui5-wizard-tab");

		if (!tabs.length) {
			return;
		}

		[].forEach.call(tabs, (step, index) => {
			step.setAttribute(EXPANDED_STEP, false);
			step.setAttribute(BEFORE_EXPANDED_STEP, false);
			step.setAttribute(AFTER_EXPANDED_STEP, false);

			// Add "data-ui5-wizard-after-current-tab" to all tabs after the current one
			if (index > iCurrStep) {
				tabs[index].setAttribute(AFTER_CURRENT_STEP, true);
			} else {
				tabs[index].removeAttribute(AFTER_CURRENT_STEP);
			}
		});

		// Add "data-ui5-wizard-expanded-tab" to the current step
		if (tabs[iCurrStep]) {
			tabs[iCurrStep].setAttribute(EXPANDED_STEP, true);
		}

		// Set the "data-ui5-wizard-expanded-tab" to the steps that are expanded
		// The algorithm is as follows:
		// 1. A step towards the end is expanded
		// 	1.2. If there are no available steps towards the end a step towards the beginning is expanded
		// 2. A step towards the beginning is expanded
		// 	2.2. If there are no available steps towards the beginning a step towards the end is expanded
		for (let i = 1; i < iStepsToShow; i++) {
			if (isForward) {
				counter += 1;
			}

			if (isForward && tabs[iCurrStep + counter]) {
				tabs[iCurrStep + counter].setAttribute(EXPANDED_STEP, true);
				isForward = !isForward;
			} else if (!isForward && tabs[iCurrStep - counter]) {
				tabs[iCurrStep - counter].setAttribute(EXPANDED_STEP, true);
				isForward = !isForward;
			} else if (tabs[iCurrStep + counter + 1]) {
				counter += 1;
				tabs[iCurrStep + counter].setAttribute(EXPANDED_STEP, true);
				isForward = true;
			} else if (tabs[iCurrStep - counter]) {
				tabs[iCurrStep - counter].setAttribute(EXPANDED_STEP, true);
				counter += 1;
				isForward = false;
			}
		}

		// mark the topmost steps of both groups (in the beginning and the end),
		// using the "data-ui5-wizard-after-current-tab" and "data-ui5-wizard-expanded-tab-prev" attributes
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].getAttribute(EXPANDED_STEP) === "true" && tabs[i - 1] && tabs[i - 1].getAttribute(EXPANDED_STEP) === "false") {
				tabs[i - 1].setAttribute(BEFORE_EXPANDED_STEP, true);
			}

			if (tabs[i].getAttribute(EXPANDED_STEP) === "false" && tabs[i - 1] && tabs[i - 1].getAttribute(EXPANDED_STEP) === "true") {
				tabs[i].setAttribute(AFTER_EXPANDED_STEP, true);
				break;
			}
		}
	}

	_isGroupAtStart(selectedStep) {
		const iStepNumber = this.stepsInHeaderDOM.indexOf(selectedStep);

		return selectedStep.getAttribute(EXPANDED_STEP) === "false" && selectedStep.getAttribute(BEFORE_EXPANDED_STEP) === "true" && iStepNumber > 0;
	}

	_isGroupAtEnd(selectedStep) {
		const iStepNumber = this.stepsInHeaderDOM.indexOf(selectedStep);

		return selectedStep.getAttribute(EXPANDED_STEP) === "false" && selectedStep.getAttribute(AFTER_EXPANDED_STEP) === "true" && (iStepNumber + 1 < this.steps.length);
	}

	async _showPopover(oDomTarget, bAtStart) {
		const tabs = Array.from(this.shadowRoot.querySelectorAll("ui5-wizard-tab"));
		this._groupedTabs = [];

		const iFromStep = bAtStart ? 0 : this.stepsInHeaderDOM.indexOf(oDomTarget);
		const iToStep = bAtStart ? this.stepsInHeaderDOM.indexOf(oDomTarget) : tabs.length - 1;

		for (let i = iFromStep; i <= iToStep; i++) {
			this._groupedTabs.push(tabs[i]);
		}

		this.responsivePopover = await this._respPopover();
		this.responsivePopover.open(oDomTarget);
	}

	async _onGroupedTabClick(event) {
		if (this._isGroupAtStart(event.target)) {
			return this._showPopover(event.target, true);
		}

		if (this._isGroupAtEnd(event.target)) {
			return this._showPopover(event.target, false);
		}
	}

	_onOverflowStepButtonClick(event) {
		const tabs = Array.from(this.shadowRoot.querySelectorAll("ui5-wizard-tab"));
		const stepRefId = event.target.getAttribute("data-ui5-header-tab-ref-id");
		const stepToSelect = this.slottedSteps[stepRefId - 1];
		const selectedStep = this.selectedStep;
		const newlySelectedIndex = this.slottedSteps.indexOf(stepToSelect);

		this.switchSelectionFromOldToNewStep(selectedStep, stepToSelect, newlySelectedIndex);
		this._closeRespPopover();
		tabs[newlySelectedIndex].focus();
	}

	_closeRespPopover() {
		this.responsivePopover.close();
	}

	async _respPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(`.ui5-wizard-responsive-popover`);
	}

	/**
	 * Called upon <code>onScroll</code>.
	 * Selects the closest step, based on the user scroll position.
	 * @param {Integer} scrollPos the current scroll position
	 * @private
	 */
	changeSelectionByScroll(scrollPos) {
		const newlySelectedIndex = this.getClosestStepIndexByScrollPos(scrollPos);

		// Skip if already selected - stop.
		if (this.selectedStepIndex === newlySelectedIndex) {
			return;
		}

		// If the calculated index is in range,
		// change selection and fire "selection-change".
		if (newlySelectedIndex >= 0 && newlySelectedIndex <= this.stepsCount - 1) {
			const stepToSelect = this.slottedSteps[newlySelectedIndex];
			this.switchSelectionFromOldToNewStep(this.selectedStep, stepToSelect, newlySelectedIndex);
			this.selectionRequestedByScroll = true;
		}
	}

	/**
	 * Called upon <code>onSelectionChangeRequested</code>.
	 * Selects the external step (ui5-wizard-step),
	 * based on the clicked step in the header (ui5-wizard-tab).
	 * @param {HTMLElement} stepInHeader the step equivalent in the header
	 * @private
	 */
	changeSelectionByStepClick(stepInHeader) {
		const stepRefId = stepInHeader.getAttribute("data-ui5-content-ref-id");
		const selectedStep = this.selectedStep;
		const stepToSelect = this.getStepByRefId(stepRefId);
		const bExpanded = stepInHeader.getAttribute(EXPANDED_STEP) === "true";
		const newlySelectedIndex = this.slottedSteps.indexOf(stepToSelect);

		// If the currently selected (active) step is clicked,
		// just scroll to its starting point and stop.
		if (selectedStep === stepToSelect) {
			this.scrollToContentItem(this.selectedStepIndex);
			return;
		}

		if (bExpanded || (!bExpanded && (newlySelectedIndex === 0 || newlySelectedIndex === this.steps.length - 1))) {
			// Change selection and fire "selection-change".
			this.switchSelectionFromOldToNewStep(selectedStep, stepToSelect, newlySelectedIndex);
		}
	}

	getContentHeight() {
		let contentHeight = 0;

		this.stepsDOM.forEach(step => {
			contentHeight += step.getBoundingClientRect().height;
		});

		return contentHeight;
	}

	get stepsDOM() {
		return Array.from(this.shadowRoot.querySelectorAll(".ui5-wiz-content-item"));
	}

	get _stepsInHeader() {
		return this.getStepsInfo();
	}

	get _steps() {
		const lastEnabledStepIndex = this.getLastEnabledStepIndex();

		return this.steps.map((step, idx) => {
			step.stretch = idx === lastEnabledStepIndex;
			return step;
		});
	}

	get stepsCount() {
		return this.slottedSteps.length;
	}

	get selectedStep() {
		if (this.selectedStepsCount) {
			return this.selectedSteps[0];
		}

		return null;
	}

	get lastSelectedStep() {
		if (this.selectedStepsCount) {
			return this.selectedSteps[this.selectedStepsCount - 1];
		}

		return null;
	}

	get selectedSteps() {
		return this.slottedSteps.filter(step => step.selected);
	}

	get enabledSteps() {
		return this.slottedSteps.filter(step => !step.disabled);
	}

	get selectedStepsCount() {
		return this.selectedSteps.length;
	}

	get slottedSteps() {
		return this.getSlottedNodes("steps");
	}

	get contentDOM() {
		return this.shadowRoot.querySelector(`.ui5-wiz-content`);
	}

	get stepsInHeaderDOM() {
		return Array.from(this.shadowRoot.querySelectorAll("[ui5-wizard-tab]"));
	}

	get enabledStepsInHeaderDOM() {
		return this.stepsInHeaderDOM.filter(step => !step.disabled);
	}

	get phoneMode() {
		if (isPhone()) {
			return true;
		}

		return this.width <= Wizard.PHONE_BREAKPOINT;
	}

	get navAriaRoleDescription() {
		return this.i18nBundle.getText(WIZARD_NAV_ARIA_ROLE_DESCRIPTION);
	}

	get navStepDefaultHeading() {
		return this.i18nBundle.getText(WIZARD_NAV_STEP_DEFAULT_HEADING);
	}

	get ariaLabelText() {
		return this.ariaLabel || this.i18nBundle.getText(WIZARD_NAV_ARIA_ROLE_DESCRIPTION);
	}

	/**
	 * Returns an array of data objects, based on the user defined steps
	 * to later build the steps (tabs) within the header.
	 * @returns {Array<Object>}
	 * @private
	 */
	getStepsInfo() {
		const lastEnabledStepIndex = this.getLastEnabledStepIndex();
		const stepsCount = this.stepsCount;
		const selectedStepIndex = this.getSelectedStepIndex();
		let inintialZIndex = this.steps.length + 10;

		this._adjustHeaderOverflow();

		return this.steps.map((step, idx) => {
			const pos = idx + 1;

			// Hide separator if it's the last step and it's not a branching one
			const hideSeparator = (idx === stepsCount - 1) && !step.branching;

			// Calculate the step's aria-roledectioption: "1. heading" or "Step 1".
			const roleDescription = step.heading ? `${pos}. ${step.heading}` : `${this.navStepDefaultHeading} ${pos}`;
			const isAfterCurrent = (idx > selectedStepIndex);

			return {
				icon: step.icon,
				heading: step.heading,
				subheading: step.subheading,
				number: pos,
				selected: step.selected,
				disabled: step.disabled,
				hideSeparator,
				activeSeparator: (idx < lastEnabledStepIndex) && !step.disabled,
				branchingSeparator: step.branching,
				pos,
				size: stepsCount,
				roleDescription,
				ariaLabel: getEffectiveAriaLabelText(step),
				refStepId: step._id,
				tabIndex: this.selectedStepIndex === idx ? "0" : "-1",
				styles: `z-index: ${isAfterCurrent ? --inintialZIndex : 1}`,
			};
		});
	}

	/**
	 * Returns the index of the selected step.
	 * @returns {Integer}
	 * @private
	 */
	getSelectedStepIndex() {
		if (this.selectedStep) {
			return this.slottedSteps.indexOf(this.selectedStep);
		}
		return 0;
	}

	/**
	 * Returns the index of the last enabled step.
	 * @returns {Integer}
	 * @private
	 */
	getLastEnabledStepIndex() {
		let lastEnabledStepIndex = 0;

		this.slottedSteps.forEach((step, idx) => {
			if (!step.disabled) {
				lastEnabledStepIndex = idx;
			}
		});

		return lastEnabledStepIndex;
	}

	getStepByRefId(refId) {
		return this.slottedSteps.find(step => step._id === refId);
	}

	getStepWrapperByRefId(refId) {
		return this.shadowRoot.querySelector(`[data-ui5-content-item-ref-id=${refId}]`);
	}

	/**
	 * Scrolls to the content of the selected step
	 * and it is used in <code>onAfteRendering</cod>.
	 * @private
	 */
	scrollToSelectedStep() {
		if (!this.selectionRequestedByScroll) {
			this.scrollToContentItem(this.selectedStepIndex);
		}
		this.selectionRequestedByScroll = false;
	}

	/**
	 * Scrolls to the content item within the <code>ui5-wizard</code> shadowDOM
	 * by given step index.
	 *
	 * @private
	 * @param {Integer} stepIndex the index of a step
	 */
	scrollToContentItem(stepIndex) {
		this.contentDOM.scrollTop = this.getClosestScrollPosByStepIndex(stepIndex);
	}

	/**
	 * Returns to closest scroll position for the given step index.
	 * by given step index.
	 *
	 * @private
	 * @param {Integer} stepIndex the index of a step
	 */
	getClosestScrollPosByStepIndex(stepIndex) {
		if (stepIndex === 0) {
			return 0;
		}

		// It's possible to have [enabled - 0, disabled - 1, enabled - 2, disabled - 3] step definition and similar.
		// Consider selection of the third step at index 2, the wizard should scroll where the previous step ends,
		// but in this case the 2nd step is disabled, so we have to fallback to the first possible step.
		for (let closestStepIndex = stepIndex - 1; closestStepIndex >= 0; closestStepIndex--) {
			if (this.stepScrollOffsets[closestStepIndex] > 0) {
				return this.stepScrollOffsets[closestStepIndex];
			}
		}

		return 0;
	}

	/**
	 * Returns the closest step index by given scroll position.
	 *
	 * @param {Integer} scrollPos scroll position
	 * @returns {Integer} closestStepIndex the closest step index
	 * @private
	 */
	getClosestStepIndexByScrollPos(scrollPos) {
		for (let closestStepIndex = 0; closestStepIndex <= this.stepScrollOffsets.length - 1; closestStepIndex++) {
			const stepOffset = this.stepScrollOffsets[closestStepIndex];

			if (stepOffset > 0 && scrollPos < stepOffset) {
				return closestStepIndex;
			}
		}

		return this.selectedStepIndex;
	}

	/**
	 * Switches the selection from the old step to the newly selected step.
	 *
	 * @param {HTMLElement} selectedStep the old step
	 * @param {HTMLElement} stepToSelect the step to be selected
	 * @param {Integer} stepToSelectIndex the index of the newly selected step
	 * @private
	 */
	switchSelectionFromOldToNewStep(selectedStep, stepToSelect, stepToSelectIndex) {
		if (selectedStep && stepToSelect) {
			selectedStep.selected = false;
			stepToSelect.selected = true;

			this.fireEvent("selection-change", {
				selectedStep: stepToSelect,
				previouslySelectedStep: selectedStep,
			});

			this.selectedStepIndex = stepToSelectIndex;
		}
	}

	/**
	 * Sorter method for sorting an array in ascending order.
	 * @private
	 */
	sortAscending(a, b) {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	}
}

Wizard.define();

export default Wizard;
