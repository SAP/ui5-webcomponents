import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle, fetchI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import {
	UPLOADCOLLECTION_NO_DATA_TEXT,
	UPLOADCOLLECTION_NO_DATA_DESCRIPTION,
	UPLOADCOLLECTION_DRAG_FILE_INDICATOR,
	UPLOADCOLLECTION_DROP_FILE_INDICATOR
} from "./generated/i18n/i18n-defaults.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";
import List from "@ui5/webcomponents/dist/List.js";

// Template
import UploadCollectionTemplate from "./generated/templates/UploadCollectionTemplate.lit.js";

// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";

const DndOverlayMode = {
	None: "None",
	Drag: "Drag",
	Drop: "Drop"
};

const draggingFiles = event => {
	return event.dataTransfer.types.includes("Files");
}

/**
 * Handles drag and drop event listeners on document.body.
 * Ensures that there is only 1 listener per type attached (drag, drop, leave). Event listeners will be only attached when
 * there is at least 1 UploadCollection registered in the set.
 */
const bodyDnDHandler = {
	_lastDragEnter: null,
	_uploadCollections: new Set(),
	_globalHandlersAttached: false,
	_ondragenter: event => {
		if (!draggingFiles(event)) {
			return;
		}

		bodyDnDHandler._lastDragEnter = event.target;
		bodyDnDHandler._uploadCollections.forEach(uc => {
			if (uc._dndOverlayMode !== DndOverlayMode.Drop) {
				uc._dndOverlayMode = DndOverlayMode.Drag;
			}
		});
	},
	_ondragleave: event => {
		bodyDnDHandler._uploadCollections.forEach(uc => {
			if (bodyDnDHandler._lastDragEnter === event.target) {
				uc._dndOverlayMode = DndOverlayMode.None;
			}
		});
	},
	_ondrop: () => {
		bodyDnDHandler._uploadCollections.forEach(uc => {
			uc._dndOverlayMode = DndOverlayMode.None;
		});
	},
	_attachGlobalHandlers: function() {
		if (!this._globalHandlersAttached) {
			document.body.addEventListener("dragenter", this._ondragenter);
			document.body.addEventListener("dragleave", this._ondragleave);
			document.body.addEventListener("drop", this._ondrop);
			this._globalHandlersAttached = true;
		}
	},
	_detachGlobalHandlers: function() {
		document.body.removeEventListener("dragenter", this._ondragenter);
		document.body.removeEventListener("dragleave", this._dragleave);
		document.body.removeEventListener("drop", this._ondrop);
		this._globalHandlersAttached = false;

	},
	addUploadCollectionInstance: function(uploadCollections) {
		this._uploadCollections.add(uploadCollections);
		this._attachGlobalHandlers();
	},
	removeUploadCollectionInstance: function() {
		this.uploadCollections.delete(uploadCollections);

		if (this.uploadCollections.size === 0) {
			this._detachGlobalHandlers();
		}
	},
}

/**
 * @public
 */
const metadata = {
	tag: "ui5-upload-collection",
	properties: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		mode: {
			type: ListMode,
			defaultValue: ListMode.None,
		},
		noDnd: {
			type: Boolean,
		},
		noDataText:{ 
			type: String,
		},
		noDataDescription:{ 
			type: String,
		},
		_dndOverlayMode: {
			type: String,
			defaultValue: DndOverlayMode.None
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		"default": {
			propertyName: "items",
			type: HTMLElement,
		},
		header: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.UploadCollection.prototype */ {
		fileDeleted: {
			detail: {
				item: { type: HTMLElement },
			},
		},
		fileRenamed: {
			detail: {
				item: { type: HTMLElement },
			},
		}
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
			List.define(),
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

		this.addEventListener("_rename", this._onFileRenamed);
	}

	onEnterDOM() {
		if (!this.noDnd) {
			bodyDnDHandler.addUploadCollectionInstance(this);
		}
	}

	onBeforeRendering() {
		if (!this.noDnd) {
			this._removeDragAndDropListeners();
		}
	}

	onAfterRendering() {
		if (!this.noDnd) {
			this._addDragAndDropListeners();
		}
	}

	onExitDOM() {
		if (!this.noDnd) {
			bodyDnDHandler.removeUploadCollectionInstance(this);
			this._removeDragAndDropListeners();
		}
	}
	
	_onItemDelete(event) {
		this.fireEvent("fileDeleted", { item: event.detail.item });
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
			this._dndOverlayMode = DndOverlayMode.Drop;
		}
	}

	_ondrop(event) {
		this._dndOverlayMode = DndOverlayMode.None;
	}

	_ondragover(event) {
		event.preventDefault()
	}

	_ondragleave(event) {
		if (event.target === this._dndOverlay) {
			this._dndOverlayMode = DndOverlayMode.Drag;
		}
	}

	_ondragenterBody(event) {
		this._lastDragEnter = event.target;

		if (this._dndOverlayMode !== DndOverlayMode.Drop) {
			this._dndOverlayMode = DndOverlayMode.Drag;
		}
	}

	_ondragleaveBody(event) {
		if (this._lastDragEnter === event.target) {
			this._dndOverlayMode = DndOverlayMode.None;
		}
	}

	_ondropBody() {
		this._dndOverlayMode = "None";
	}

	_onFileRenamed(event) {
		this.fireEvent("fileRenamed", { item: event.target });
	}

	get classes() {
		return {
			dndOverlay: {
				"uc-dnd-overlay": true,
				"uc-drag-overlay": this._dndOverlayMode === DndOverlayMode.Drag,
				"uc-drop-overlay": this._dndOverlayMode === DndOverlayMode.Drop,
			},
		};
	}

	get _root() {
		return this.shadowRoot.querySelector(".uc-root");
	}

	get _dndOverlay() {
		return this._root.querySelector(".uc-dnd-overlay")
	}

	get _showDndOverlay() {
		return this._dndOverlayMode !== DndOverlayMode.None;
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
		if (this._dndOverlayMode === DndOverlayMode.Drag) {
			return this.i18nBundle.getText(UPLOADCOLLECTION_DRAG_FILE_INDICATOR);
		} else {
			return this.i18nBundle.getText(UPLOADCOLLECTION_DROP_FILE_INDICATOR);
		}
	}
}

UploadCollection.define();

export default UploadCollection;
