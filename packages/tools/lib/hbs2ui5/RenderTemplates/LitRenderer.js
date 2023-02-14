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
	"InputPopover",
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
	"WizardPopover",
	"WizardTab",
	"Wizard",
]

const importForControl = (controlName) => {
	if (jsControls.includes(controlName)) {
		return `type ${controlName} = any;`;
	}

	return `import type ${controlName} from "../../${controlName}";`
}

const buildRenderer = (controlName, litTemplate) => {
	return `/* eslint no-unused-vars: 0 */
import { html, svg, repeat, classMap, styleMap, ifDefined, unsafeHTML, scopeTag } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element";
${importForControl(controlName)}
import type { ClassMapValue } from "@ui5/webcomponents-base/dist/types";

${litTemplate}

export default block0;`;
};

module.exports = {
	generateTemplate: buildRenderer
};