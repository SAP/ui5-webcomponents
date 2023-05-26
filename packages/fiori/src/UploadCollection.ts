import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import IllustratedMessage from "./IllustratedMessage.js";
import "./illustrations/sapIllus-Scene-Tent.js";
import "@ui5/webcomponents-icons/dist/upload-to-cloud.js";
import "@ui5/webcomponents-icons/dist/document.js";
import {
	UPLOADCOLLECTION_NO_DATA_TEXT,
	UPLOADCOLLECTION_NO_DATA_DESCRIPTION,
	UPLOADCOLLECTION_DRAG_FILE_INDICATOR,
	UPLOADCOLLECTION_DROP_FILE_INDICATOR,
	UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION,
} from "./generated/i18n/i18n-defaults.js";
import {
	attachBodyDnDHandler,
	detachBodyDnDHandler,
	draggingFiles,
} from "./upload-utils/UploadCollectionBodyDnD.js";
import type UploadCollectionItem from "./UploadCollectionItem.js";
import type { DnDEventListener, DnDEventListenerParam } from "./upload-utils/UploadCollectionBodyDnD.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";

// Template
import UploadCollectionTemplate from "./generated/templates/UploadCollectionTemplate.lit.js";

// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";

type SelectionChangeEventDetail = {
	selectedItems: Array<UploadCollectionItem>,
};

type ItemDeleteEventDetail = {
	item: UploadCollectionItem,
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * This component allows you to represent files before uploading them to a server, with the help of <code>ui5-upload-collection-item</code>.
 * It also allows you to show already uploaded files.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/UploadCollection.js";</code>
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";</code> (for <code>ui5-upload-collection-item</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.UploadCollection
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-upload-collection
 * @appenddocs sap.ui.webc.fiori.UploadCollectionItem
 * @public
 * @since 1.0.0-rc.7
 */
@customElement({
	tag: "ui5-upload-collection",
	languageAware: true,
	renderer: litRender,
	styles: UploadCollectionCss,
	template: UploadCollectionTemplate,
	dependencies: [
		Icon,
		Label,
		List,
		Title,
		IllustratedMessage,
	],
})
/**
 * Fired when an element is dropped inside the drag and drop overlay.
 * <br><br>
 * <b>Note:</b> The <code>drop</code> event is fired only when elements are dropped within the drag and drop overlay and ignored for the other parts of the <code>ui5-upload-collection</code>.
 *
 * @event sap.ui.webc.fiori.UploadCollection#drop
 * @readonly
 * @param {DataTransfer} dataTransfer The <code>drop</code> event operation data.
 * @public
 * @native
 */
@event("drop")

/**
 * Fired when the Delete button of any item is pressed.
 * <br><br>
 * <b>Note:</b> A Delete button is displayed on each item,
 * when the <code>ui5-upload-collection</code> <code>mode</code> property is set to <code>Delete</code>.
 * @event sap.ui.webc.fiori.UploadCollection#item-delete
 * @param {HTMLElement} item The <code>ui5-upload-collection-item</code> which was renamed.
 * @public
 */
@event("item-delete", {
	detail: {
		item: { type: HTMLElement },
	},
})

/**
 * Fired when selection is changed by user interaction
 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
 *
 * @event sap.ui.webc.fiori.UploadCollection#selection-change
 * @param {Array} selectedItems An array of the selected items.
 * @public
 */
@event("selection-change", {
	detail: {
		selectedItems: { type: Array },
	},
})
class UploadCollection extends UI5Element {
	/**
	 * Defines the mode of the <code>ui5-upload-collection</code>.
	 *
	 * <br><br>
	 * <b>Note:</b>
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>SingleSelect</code></li>
	 * <li><code>MultiSelect</code></li>
	 * <li><code>Delete</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.main.types.ListMode}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.mode
	 * @defaultvalue "None"
	 * @public
	 */
	@property({ type: ListMode, defaultValue: ListMode.None })
	mode!: `${ListMode}`;

	/**
	 * Allows you to set your own text for the 'No data' description.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.noDataDescription
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	noDataDescription!: string;

	/**
	 * Allows you to set your own text for the 'No data' text.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.noDataText
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	noDataText!: string;

	/**
	 * By default there will be drag and drop overlay shown over the <code>ui5-upload-collection</code> when files
	 * are dragged. If you don't intend to use drag and drop, set this property.
	 * <br><br>
	 * <b>Note:</b> It is up to the application developer to add handler for <code>drop</code> event and handle it.
	 * <code>ui5-upload-collection</code> only displays an overlay.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.hideDragOverlay
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideDragOverlay!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.accessibleName
	 * @defaultvalue ""
	 * @public
	 * @since 1.0.0-rc.16
	 */
	 @property()
	 accessibleName!: string;

	/**
	 * Indicates what overlay to show when files are being dragged.
	 *
	 * @type {sap.ui.webc.fiori.types.UploadCollectionDnDOverlayMode}
	 * @defaultvalue "None"
	 * @private
	 */
	@property({ type: UploadCollectionDnDOverlayMode, defaultValue: UploadCollectionDnDOverlayMode.None })
	_dndOverlayMode!: UploadCollectionDnDOverlayMode;

	/**
	 * Defines the items of the <code>ui5-upload-collection</code>.
	 * <br><b>Note:</b> Use <code>ui5-upload-collection-item</code> for the intended design.
	 *
	 * @type {sap.ui.webc.fiori.IUploadCollectionItem[]}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	items!: Array<UploadCollectionItem>;

	/**
	 * Defines the <code>ui5-upload-collection</code> header.
	 * <br><br>
	 * <b>Note:</b> If <code>header</code> slot is provided,
	 * the labelling of the <code>UploadCollection</code> is a responsibility of the application developer.
	 * <code>accessibleName</code> should be used.
	 *
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.fiori.UploadCollection.prototype.header
	 * @slot
	 * @public
	 */
	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	_bodyDnDHandler: DnDEventListener;

	static i18nBundle: I18nBundle;

	static async onDefine() {
		UploadCollection.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	constructor() {
		super();
		this._bodyDnDHandler = this.bodyDnDHandler.bind(this);
	}

	bodyDnDHandler(e: DnDEventListenerParam) {
		if (this._dndOverlayMode !== UploadCollectionDnDOverlayMode.Drop) {
			this._dndOverlayMode = e.mode;
		}
	}

	onEnterDOM() {
		if (this.hideDragOverlay) {
			return;
		}

		attachBodyDnDHandler(this._bodyDnDHandler);
	}

	onExitDOM() {
		if (this.hideDragOverlay) {
			return;
		}

		detachBodyDnDHandler(this._bodyDnDHandler);
	}

	_ondragenter(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		if (!draggingFiles(e)) {
			return;
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drop;
	}

	_ondrop(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		if (e.target !== this.shadowRoot!.querySelector(".uc-dnd-overlay")) {
			e.stopPropagation();
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
	}

	_ondragover(e: DragEvent) {
		if (this.hideDragOverlay) {
			return;
		}

		e.preventDefault();
	}

	_ondragleave() {
		if (this.hideDragOverlay) {
			return;
		}

		this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drag;
	}

	_onItemDelete(e: CustomEvent<ItemDeleteEventDetail>) {
		this.fireEvent("item-delete", { item: e.detail.item });
	}

	_onSelectionChange(e: CustomEvent<SelectionChangeEventDetail>) {
		this.fireEvent("selection-change", { selectedItems: e.detail.selectedItems });
	}

	get classes() {
		return {
			content: {
				"ui5-uc-content": true,
				"ui5-uc-content-no-data": this.items.length === 0,
			},
			dndOverlay: {
				"uc-dnd-overlay": true,
				"uc-drag-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag,
				"uc-drop-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drop,
			},
			noFiles: {
				"uc-no-files": true,
				"uc-no-files-dnd-overlay": this._showDndOverlay,
			},
		};
	}

	get _root() {
		return this.shadowRoot!.querySelector(".ui5-uc-root");
	}

	get _dndOverlay() {
		return this._root?.querySelector(".uc-dnd-overlay");
	}

	get _showDndOverlay() {
		return this._dndOverlayMode !== UploadCollectionDnDOverlayMode.None;
	}

	get _showNoData() {
		return this.items.length === 0;
	}

	get _noDataText() {
		return this.noDataText || UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_TEXT);
	}

	get _noDataDescription() {
		return this.noDataDescription || UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_DESCRIPTION);
	}

	get _roleDescription() {
		return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION);
	}

	get _dndOverlayText() {
		if (this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag) {
			return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_DRAG_FILE_INDICATOR);
		}

		return UploadCollection.i18nBundle.getText(UPLOADCOLLECTION_DROP_FILE_INDICATOR);
	}
}

UploadCollection.define();

export default UploadCollection;
