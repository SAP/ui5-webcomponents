import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";

/**
 * Interface for components that may be slotted inside <code>ui5-page</code> as header and footer.
 *
 * @public
 */
interface IBar extends HTMLElement {}

/**
 * Interface for components that can be slotted inside <code>ui5-media-gallery</code> as items.
 *
 * @name sap.ui.webc.fiori.IMediaGalleryItem
 * @interface
 * @public
 */
const IMediaGalleryItem = "sap.ui.webc.fiori.IMediaGalleryItem";

/**
 * Interface for components that may be slotted as an action inside <code>ui5-li-notification</code> and <code>ui5-li-notification-group</code>
 *
 * @name sap.ui.webc.fiori.INotificationAction
 * @interface
 * @public
 */
const INotificationAction = "sap.ui.webc.fiori.INotificationAction";

/**
 * Interface for components that may be slotted inside a notification list
 *
 * @name sap.ui.webc.fiori.INotificationListItem
 * @interface
 * @public
 */
const INotificationListItem = "sap.ui.webc.fiori.INotificationListItem";

/**
 * Interface for components that may be slotted inside <code>ui5-product-switch</code> as items
 *
 * @name sap.ui.webc.fiori.IProductSwitchItem
 * @interface
 * @public
 */
const IProductSwitchItem = "sap.ui.webc.fiori.IProductSwitchItem";

/**
 * Interface for components that may be slotted inside <code>ui5-shellbar</code> as items
 *
 * @name sap.ui.webc.fiori.IShellBarItem
 * @interface
 * @public
 */
const IShellBarItem = "sap.ui.webc.fiori.IShellBarItem";

/**
 * Interface for components that may be slotted inside <code>ui5-side-navigation</code> as items
 *
 * @name sap.ui.webc.fiori.ISideNavigationItem
 * @interface
 * @public
 */
const ISideNavigationItem = "sap.ui.webc.fiori.ISideNavigationItem";

/**
 * Interface for components that may be slotted inside <code>ui5-side-navigation-item</code> as sub-items
 *
 * @name sap.ui.webc.fiori.ISideNavigationSubItem
 * @interface
 * @public
 */
const ISideNavigationSubItem = "sap.ui.webc.fiori.ISideNavigationSubItem";

/**
 * Interface for components that may be slotted inside <code>ui5-timeline</code> as items
 *
 * @public
 */
interface ITimelineItem extends UI5Element {
	icon: string,
	layout: string,
}

/**
 * Interface for components that may be slotted inside <code>ui5-upload-collection</code> as items
 *
 * @name sap.ui.webc.fiori.IUploadCollectionItem
 * @interface
 * @public
 */
const IUploadCollectionItem = "sap.ui.webc.fiori.IUploadCollectionItem";

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
	INotificationAction,
	INotificationListItem,
	IProductSwitchItem,
	IShellBarItem,
	ISideNavigationItem,
	ISideNavigationSubItem,
	ITimelineItem,
	IUploadCollectionItem,
	IWizardStep,
};
