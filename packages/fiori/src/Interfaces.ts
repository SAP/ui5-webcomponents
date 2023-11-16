/**
 * Interface for components that may be slotted inside <code>ui5-page</code> as header and footer.
 *
 * @name sap.ui.webc.fiori.IBar
 * @interface
 * @public
 */
const IBar = "sap.ui.webc.fiori.IBar";

/**
 * Interface for components that may be slotted inside <code>ui5-view-settings-dialog</code> as filter items
 *
 * @name sap.ui.webc.fiori.IFilterItem
 * @interface
 * @public
 */
const IFilterItem = "sap.ui.webc.fiori.IFilterItem";

/**
 * Interface for components that may be slotted inside <code>ui5-filter-item</code> as values
 *
 * @name sap.ui.webc.fiori.IFilterItemOption
 * @interface
 * @public
 */
const IFilterItemOption = "sap.ui.webc.fiori.IFilterItemOption";

/**
 * Interface for components that can be slotted inside <code>ui5-media-gallery</code> as items.
 *
 * @name sap.ui.webc.fiori.IMediaGalleryItem
 * @interface
 * @public
 */
const IMediaGalleryItem = "sap.ui.webc.fiori.IMediaGalleryItem";

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
 * Interface for components that may be slotted inside <code>ui5-view-settings-dialog</code> as sort items
 *
 * @name sap.ui.webc.fiori.ISortItem
 * @interface
 * @public
 */
const ISortItem = "sap.ui.webc.fiori.ISortItem";

/**
 * Interface for components that may be slotted inside <code>ui5-timeline</code> as items
 *
 * @name sap.ui.webc.fiori.ITimelineItem
 * @interface
 * @public
 */
const ITimelineItem = "sap.ui.webc.fiori.ITimelineItem";

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
	IFilterItem,
	IFilterItemOption,
	IMediaGalleryItem,
	INotificationListItem,
	IProductSwitchItem,
	IShellBarItem,
	ISortItem,
	ITimelineItem,
	IUploadCollectionItem,
	IWizardStep,
};
