import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import TimelineLayout from "./types/TimelineLayout.js";

/**
 * Interface for components that may be slotted inside <code>ui5-page</code> as header and footer.
 *
 * @public
 */
interface IBar extends HTMLElement {}

/**
 * Interface for components that can be slotted inside <code>ui5-media-gallery</code> as items.
 *
 * @public
 */
interface IMediaGalleryItem {
	selected: boolean,
	disabled: boolean,
	focused: boolean,
}

/**
 * Interface for components that may be slotted inside a notification list
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface INotificationListItem extends HTMLElement { }

/**
 * Interface for components that may be slotted inside <code>ui5-product-switch</code> as items
 *
 * @public
 */
interface IProductSwitchItem {
	titleText: string,
	subtitleText: string,
	icon: string,
	target: string,
	targetSrc: string,
	selected: boolean,
}

/**
 * Interface for components that may be slotted inside <code>ui5-shellbar</code> as items
 *
 * @name sap.ui.webc.fiori.IShellBarItem
 * @interface
 * @public
 */
const IShellBarItem = "sap.ui.webc.fiori.IShellBarItem";

/**
 * Interface for components that may be slotted inside <code>ui5-timeline</code> as items
 *
 * @public
 */
interface ITimelineItem extends UI5Element, ITabbable {
    layout: `${TimelineLayout}`,
    icon: string,
    _lineWidth: string,
    nameClickable: boolean,
    focusLink: () => void,
}

/**
 * Interface for components that may be slotted inside <code>ui5-upload-collection</code> as items
 *
 * @public
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUploadCollectionItem extends HTMLElement { }

/**
 * Interface for components that may be slotted inside <code>ui5-wizard</code> as wizard steps
 *
 * @name sap.ui.webc.fiori.IWizardStep
 * @interface
 * @public
 */
const IWizardStep = "sap.ui.webc.fiori.IWizardStep";

export {
	IBar,
	IMediaGalleryItem,
	INotificationListItem,
	IProductSwitchItem,
	IShellBarItem,
	ITimelineItem,
	IUploadCollectionItem,
	IWizardStep,
};
