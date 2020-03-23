import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import List from "@ui5/webcomponents/dist/List.js";
import UploadCollectionTemplate from "./generated/templates/UploadCollectionTemplate.lit.js";
import ListMode from "@ui5/webcomponents/dist/types/ListMode.js";

// Styles
import UploadCollectionCss from "./generated/themes/UploadCollection.css.js";


const DndOverlayMode = {
	None: "None",
	Drag: "Drag",
	Drop: "Drop"
};

const ifDraggingFiles = cb => event => {
	if (event.dataTransfer.types.includes("Files")) {
		cb(event);
	}
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
		]);
	}

	constructor() {
		super();

		this._listeners = {
			dragenter: ifDraggingFiles(this._ondragenter.bind(this)),
			dragleave: ifDraggingFiles(this._ondragleave.bind(this)),
			dragover: ifDraggingFiles(this._ondragover.bind(this)),
			drop: ifDraggingFiles(this._ondrop.bind(this)),
		};

		this._bodyListeners = {
			dragenter: ifDraggingFiles(this._ondragenterBody.bind(this)),
			dragleave: ifDraggingFiles(this._ondragleaveBody.bind(this)),
			drop: ifDraggingFiles(this._ondropBody.bind(this)),
		};

		this.addEventListener("_rename", this._onFileRenamed);
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
			this._removeDragAndDropListeners();
		}
	}
	
	_onItemDelete(event) {
		this.fireEvent("fileDeleted", { item: event.detail.item });
	}

	_addDragAndDropListeners() {
		document.body.addEventListener("dragenter", this._bodyListeners.dragenter);
		document.body.addEventListener("dragleave", this._bodyListeners.dragleave);
		document.body.addEventListener("drop", this._bodyListeners.drop);

		this._root.addEventListener("dragenter", this._listeners.dragenter);
		this._root.addEventListener("dragover", this._listeners.dragover);
		this._root.addEventListener("dragleave", this._listeners.dragleave);
		this._root.addEventListener("drop", this._listeners.drop);
	}

	_removeDragAndDropListeners() {
		document.body.removeEventListener("dragenter", this._bodyListeners.dragenter);
		document.body.removeEventListener("dragleave", this._bodyListeners.dragleave);
		document.body.removeEventListener("drop", this._bodyListeners.drop);

		if (this._root) {
			this._root.removeEventListener("dragenter", this._listeners.dragenter);
			this._root.removeEventListener("dragover", this._listeners.dragover);
			this._root.removeEventListener("dragleave", this._listeners.dragleave);
			this._root.removeEventListener("drop", this._listeners.drop);
		}
	}

	_ondragenter(event) {
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

	get _dndOverlayText() {
		//TODO: make this translatable
		return this._dndOverlayMode === DndOverlayMode.Drag ? "Drag files here" : "Drop files to upload";
	}
}

UploadCollection.define();

export default UploadCollection;
