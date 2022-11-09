import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/background.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";
// Template
import MediaGalleryItemTemplate from "./generated/templates/MediaGalleryItemTemplate.lit.js";
// Styles
import MediaGalleryItemCss from "./generated/themes/MediaGalleryItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-media-gallery-item",
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.MediaGalleryItem.prototype */ {

		/**
		 * Defines the selected state of the component.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		selected: {
			type: Boolean,
		},

		/**
		 * Defines whether the component is in disabled state.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disabled: {
			type: Boolean,
		},

		/**
		 * Determines the layout of the item container.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Square</code></li>
		 * <li><code>Wide</code></li>
		 * </ul>
		 *
		 * @type {sap.ui.webcomponents.fiori.types.MediaGalleryItemLayout}
		 * @defaultvalue "Square"
		 * @public
		 */
		layout: {
			type: MediaGalleryItemLayout,
			defaultValue: MediaGalleryItemLayout.Square,
		},

		/**
		 * @private
		 */
		_interactive: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_square: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_contentImageNotFound: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_thumbnailNotFound: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_thumbnailDesign: {
			type: Boolean,
		},

		/**
		 * Indicates whether the element is focused.
		 *
		 * @private
		 */
		focused: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_tabIndex: {
			type: String,
			defaultValue: undefined,
		},

		/**
		 * @private
		 */
		contentHeight: {
			type: String,
			noAttribute: true,
			defaultValue: "",
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.MediaGalleryItem.prototype */ {
		/**
		 * Defines the content of the component.
		 *
		 * @type {HTMLElement}
		 * @slot content
		 * @public
		 */
		 "default": {
			propertyName: "content",
			type: HTMLElement,
		},

		/**
		 * Defines the content of the thumbnail.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		 "thumbnail": {
			type: HTMLElement,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-media-gallery-item</code> web component represents the items displayed in the
 * <code>ui5-media-gallery</code> web component.
 * <br><br>
 * <b>Note:</b> <code>ui5-media-gallery-item</code> is not supported when used outside of <code>ui5-media-gallery</code>.
 * <br><br>
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-media-gallery</code> provides advanced keyboard handling.
 * When focused, the user can use the following keyboard
 * shortcuts in order to perform a navigation:
 * <br>
 * <ul>
 * <li>[SPACE/ENTER/RETURN] - Trigger <code>ui5-click</code> event</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";</code> (comes with <code>ui5-media-gallery</code>)
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.MediaGalleryItem
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-media-gallery-item
 * @public
 * @implements sap.ui.webcomponents.fiori.IMediaGalleryItem
 * @since 1.1.0
 */
class MediaGalleryItem extends UI5Element {
	constructor() {
		super();
		this._monitoredContent = null;
		this._monitoredThumbnail = null;
	}

	onEnterDOM() {
		this._thumbnailDesign = !isPhone();
		this._interactive = !isPhone();
		this._square = true;
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return MediaGalleryItemCss;
	}

	static get template() {
		return MediaGalleryItemTemplate;
	}

	get _thumbnail() {
		return this.thumbnail.length && this.thumbnail[0];
	}

	get _content() {
		return this.content.length && this.content[0];
	}

	get _isThubmnailAvailable() {
		return this._thumbnail && !this._thumbnailNotFound;
	}

	get _isContentAvailable() {
		return this._content && !this._contentImageNotFound;
	}

	get _useThumbnail() {
		return this._thumbnailDesign && this._isThubmnailAvailable;
	}

	get _useContent() {
		return !this._useThumbnail && this._isContentAvailable;
	}

	get tabIndex() {
		return this.disabled ? undefined : this._tabIndex;
	}

	get _showBackgroundIcon() {
		return this._thumbnailNotFound || this._contentImageNotFound;
	}

	get styles() {
		return {
			wrapper: {
				height: this.contentHeight,
			},
		};
	}

	get _role() {
		return this._interactive ? "button" : undefined;
	}

	onBeforeRendering() {
		this._monitorLoadingError();
	}

	_monitorLoadingError() {
		let callback,
			success;
		if (this._thumbnailDesign && this.thumbnail.length && (this._monitoredThumbnail !== this._thumbnail)) {
			this._thumbnailNotFound = undefined; // reset flag
			callback = this._updateThumbnailLoaded;
			success = this._attachListeners(this._thumbnail, callback);
			success && (this._monitoredThumbnail = this._thumbnail);
		}
		if (!this._useThumbnail && this.content.length && (this._monitoredContent !== this._content)) {
			this._contentImageNotFound = undefined; // reset flag
			callback = this._updateContentImageLoaded;
			success = this._attachListeners(this._content, callback);
			success && (this._monitoredContent = this._content);
		}
	}

	_attachListeners(element, callback) {
		const isImg = element.tagName === "IMG",
			img = isImg ? element : element.querySelector("img");
		if (img) {
			callback.call(this, img);
			img.addEventListener("error", () => {
				if (this.contains(img)) { // img still belongs to us
					callback.call(this, img);
				}
			});
			img.addEventListener("load", () => {
				if (this.contains(img)) { // img still belongs to us
					callback.call(this, img);
				}
			});
			return true;
		}
	}

	_updateContentImageLoaded(image) {
		this._contentImageNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_updateThumbnailLoaded(image) {
		this._thumbnailNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_onkeydown(event) {
		if (isSpace(event)) {
			event.preventDefault();
		}

		if (isEnter(event)) {
			this._fireItemClick();
		}
	}

	_onkeyup(event) {
		if (isSpace(event)) {
			this._fireItemClick();
		}
	}

	_onfocusout() {
		this.focused = false;
	}

	_onfocusin() {
		this.focused = true;
	}

	_fireItemClick() {
		this.fireEvent("click", { item: this });
	}

	static get dependencies() {
		return [
			Icon,
		];
	}
}

MediaGalleryItem.define();

export default MediaGalleryItem;
