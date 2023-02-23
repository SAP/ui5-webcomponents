jsControls = ["RatingIndicator",
	"SelectPopover",
	"TabContainerPopover",
	"TabInOverflow",
	"TabInStrip",
	"TabSeparatorInOverflow",
	"TabSeparatorInStrip",
	"TextAreaPopover",
	"TextArea",
	"TimePickerPopover",
	"Toast",
	"TokenizerPopover",
	"Tokenizer",
	"Token",
	"BreadcrumbsPopover",
	"ColorPaletteDialog",
	"ComboBoxPopover",
	"ComboBox",
	"DatePickerPopover",
	"DateTimePickerPopover",
	"FileUploaderPopover",
	"MultiComboBoxPopover",
	"MultiComboBox", "MultiInput",
	"PopupBlockLayer",
	"MediaGalleryItem",
	"MediaGallery",
	"NotificationListGroupItem",
	"NotificationListItem",
	"NotificationOverflowActionsPopover",
	"ShellBarPopover",
	"ShellBar",
	"SideNavigationItemPopoverContent",
	"SideNavigation",
	"SideNavigationItem",
	"SideNavigationPopover",
	"WizardPopover",
	"WizardTab",
	"Wizard",
]

const importForControl = (controlName) => {
	if (jsControls.includes(controlName)) {
		return `type ${controlName} = any;`;
	}

	if (process.env.UI5_BASE) {
		// base package has a component in `test/elements` instead of `src`
		return `import type ${controlName} from "../../../../test/elements/${controlName}";`
	}
	return `import type ${controlName} from "../../${controlName}";`
}

const buildRenderer = (controlName, litTemplate) => {
	// typescript cannot process package imports for the same package and the paths are changed to relative for base package templates
	const importPrefix = process.env.UI5_BASE ? "../../../" : "@ui5/webcomponents-base/dist/"
	return `/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "${importPrefix}renderer/LitRenderer.js";
import type UI5Element from "${importPrefix}UI5Element";
${importForControl(controlName)}
import type { ClassMapValue } from "${importPrefix}types";

${litTemplate}

export default block0;`;
};

module.exports = {
	generateTemplate: buildRenderer
};