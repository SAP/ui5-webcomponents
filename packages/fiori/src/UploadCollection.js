import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle, fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import List from "@ui5/webcomponents/dist/List.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents-icons/dist/icons/upload-to-cloud.js";
import "@ui5/webcomponents-icons/dist/icons/document.js";
import {
	UPLOADCOLLECTION_NO_DATA_TEXT,
	UPLOADCOLLECTION_NO_DATA_DESCRIPTION,
	UPLOADCOLLECTION_DRAG_FILE_INDICATOR,
	UPLOADCOLLECTION_DROP_FILE_INDICATOR,
} from "./generated/i18n/i18n-defaults.js";
import {
	addUploadCollectionInstance,
	removeUploadCollectionInstance,
	draggingFiles,
} from "./upload-utils/BodyDragAndDrop.js";
import UploadCollectionDnDOverlayMode from "./types/UploadCollectionDnDMode.js";

// Template
import UploadCollectionTemplate from "./generated/templates/UploadCollectionTemplate.lit.js";

// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-upload-collection",
	properties: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		/**
		 * Defines the mode of the <code>ui5-upload-collection</code>.
		 * <br><br>
		 * <b>Note:</b> Available options are <code>None</code>, <code>SingleSelect</code>,
		 * <code>MultiSelect</code>, and <code>Delete</code>.
		 *
		 * @type {string}
		 * @defaultvalue "None"
		 * @public
		 */
		mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},

		/**
		 * Allows you to set your own text for the 'No data' description.
		 *
		 * @type {string}
		 * @public
		 */
		noDataDescription: {
			type: String,
		},

		/**
		 * Allows you to set your own text for the 'No data' text.
		 *
		 * @type {string}
		 * @public
		 */
		noDataText: {
			type: String,
		},

		/**
		 * By default there will be drag and drop overlay shown over the <code>ui5-upload-collection</code> when files
		 * are dragged. If you don't intend to use drag and drop, set this property to <code>true</code>
		 * <br><br>
		 * <b>Note:</b> It is up to the application developer to add handler for <code>drop</code> event and handle it.
		 * <code>ui5-upload-collection</code> only shows an overlay.
		 *
		 * @type {boolean}
		 * @public
		 */
		noDnd: {
			type: Boolean,
		},

		/**
		 * Indicates what overlay to show when files are being dragged.
		 *
		 * @private
		 */
		_dndOverlayMode: {
			type: String,
			defaultValue: UploadCollectionDnDOverlayMode.None,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		/**
		 * Defines the items of the <code>ui5-upload-collection</code>.
		 * <br><b>Note:</b> Use <code>ui5-upload-collection-item</code> for the intended design.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},

		/**
		 * Defines the <code>ui5-upload-collection</code> header.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		/**
		 * Fired when the Delete button of any item is pressed.
		 * <br><br>
		 * <b>Note:</b> A Delete button is displayed on each item,
		 * when the <code>ui5-upload-collection</code> <code>mode</code> property is set to <code>Delete</code>.
		 * @event
		 * @param {HTMLElement} item The <code>ui5-upload-collection-item</code> which was renamed.
		 * @public
		 */
		fileDeleted: {
			detail: {
				item: { type: HTMLElement },
			},
		},

		/**
		 * Fired when selection is changed by user interaction
		 * in <code>SingleSelect</code> and <code>MultiSelect</code> modes.
		 *
		 * @event
		 * @param {Array} selectedItems An array of the selected items.
		 * @public
		 */
		selectionChange: {
			detail: {
				selectedItems: { type: Array },
			},
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-upload-collection</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents-fiori/dist/UploadCollection.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.UploadCollection
 * @extends UI5Element
 * @tagname ui5-upload-collection
 * @public
 */
class UploadCollection extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return UploadCollectionCss;
	}

	static get template() {
		return UploadCollectionTemplate;
	}

	static async onDefine() {
		await Promise.all([
			Icon.define(),
			Label.define(),
			List.define(),
			Title.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);
	}

	constructor() {
		super();

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._listeners = {
			dragenter: this._ondragenter.bind(this),
			dragleave: this._ondragleave.bind(this),
			dragover: this._ondragover.bind(this),
			drop: this._ondrop.bind(this),
		};
	}

	onEnterDOM() {
		if (this.noDnd) {
			return;
		}

		addUploadCollectionInstance(this);
	}

	onBeforeRendering() {
		if (this.noDnd) {
			return;
		}

		this._removeDragAndDropListeners();
	}

	onAfterRendering() {
		if (this.noDnd) {
			return;
		}

		this._addDragAndDropListeners();
	}

	onExitDOM() {
		if (this.noDnd) {
			return;
		}

		removeUploadCollectionInstance(this);
		this._removeDragAndDropListeners();
	}

	_addDragAndDropListeners() {
		this._root.addEventListener("dragenter", this._listeners.dragenter);
		this._root.addEventListener("dragover", this._listeners.dragover);
		this._root.addEventListener("dragleave", this._listeners.dragleave);
		this._root.addEventListener("drop", this._listeners.drop);
	}

	_removeDragAndDropListeners() {
		if (this._root) {
			this._root.removeEventListener("dragenter", this._listeners.dragenter);
			this._root.removeEventListener("dragover", this._listeners.dragover);
			this._root.removeEventListener("dragleave", this._listeners.dragleave);
			this._root.removeEventListener("drop", this._listeners.drop);
		}
	}

	_ondragenter(event) {
		if (!draggingFiles(event)) {
			return;
		}

		if (event.target === this._dndOverlay) {
			this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drop;
		}
	}

	_ondrop(event) {
		this._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
	}

	_ondragover(event) {
		event.preventDefault();
	}

	_ondragleave(event) {
		if (event.target === this._dndOverlay) {
			this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drag;
		}
	}

	_ondragenterBody(event) {
		this._lastDragEnter = event.target;

		if (this._dndOverlayMode !== UploadCollectionDnDOverlayMode.Drop) {
			this._dndOverlayMode = UploadCollectionDnDOverlayMode.Drag;
		}
	}

	_ondragleaveBody(event) {
		if (this._lastDragEnter === event.target) {
			this._dndOverlayMode = UploadCollectionDnDOverlayMode.None;
		}
	}

	_ondropBody() {
		this._dndOverlayMode = "None";
	}

	_onItemDelete(event) {
		this.fireEvent("fileDeleted", { item: event.detail.item });
	}

	_onSelectionChange(event) {
		this.fireEvent("selectionChange", { selectedItems: event.detail.selectedItems });
	}

	get classes() {
		return {
			dndOverlay: {
				"uc-dnd-overlay": true,
				"uc-drag-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag,
				"uc-drop-overlay": this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drop,
			},
		};
	}

	get _root() {
		return this.shadowRoot.querySelector(".ui5-uc-root");
	}

	get _dndOverlay() {
		return this._root.querySelector(".uc-dnd-overlay");
	}

	get _showDndOverlay() {
		return this._dndOverlayMode !== UploadCollectionDnDOverlayMode.None;
	}

	get _showNoData() {
		return this.items.length === 0 && !this._showDndOverlay;
	}

	get _noDataText() {
		return this.noDataText || this.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_TEXT);
	}

	get _noDataDescription() {
		return this.noDataDescription || this.i18nBundle.getText(UPLOADCOLLECTION_NO_DATA_DESCRIPTION);
	}

	get _dndOverlayText() {
		if (this._dndOverlayMode === UploadCollectionDnDOverlayMode.Drag) {
			return this.i18nBundle.getText(UPLOADCOLLECTION_DRAG_FILE_INDICATOR);
		}

		return this.i18nBundle.getText(UPLOADCOLLECTION_DROP_FILE_INDICATOR);
	}
}

UploadCollection.define();

export default UploadCollection;
