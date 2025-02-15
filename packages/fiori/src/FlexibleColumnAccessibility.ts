import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import type { AriaLandmarkRole } from "@ui5/webcomponents-base/dist/types.js";
import {
	getAllAccessibleDescriptionRefTexts,
	getAllAccessibleNameRefTexts,
	getEffectiveAriaDescriptionText,
	getEffectiveAriaLabelText,
	registerUI5Element,
} from "@ui5/webcomponents-base/dist/util/AccessibilityTextsHelper.js";

type FCLAccessibilityRoles = Extract<AriaLandmarkRole, "none" | "complementary" | "contentinfo" | "main" | "region">

@customElement("ui5-flexible-column-accessibility")
class FlexibleColumnAccessibility extends UI5Element {
	@property()
	accessibleName?: string;

	@property()
	accessibleNameRef?: string;

	@property()
	accessibleDescription?: string;

	@property()
	accessibleDescriptionRef?: string;

	@property()
	accessibleRole: `${FCLAccessibilityRoles}` = "region";

	@property()
	_associatedLabelsRefTexts = "";

	@property()
	_associatedDescriptionRefTexts = "";

	_updateAssociatedLabelsTexts() {
		this._associatedDescriptionRefTexts = getAllAccessibleDescriptionRefTexts(this);
		this._associatedLabelsRefTexts = getAllAccessibleNameRefTexts(this);
	}

	onEnterDOM() {
		registerUI5Element(this, this._updateAssociatedLabelsTexts.bind(this));
	}

	get accessibleNameText() {
		return this._associatedLabelsRefTexts || getEffectiveAriaLabelText(this);
	}

	get accessibleDescriptionText() {
		return this._associatedDescriptionRefTexts || getEffectiveAriaDescriptionText(this);
	}
}

FlexibleColumnAccessibility.define();

export default FlexibleColumnAccessibility;
