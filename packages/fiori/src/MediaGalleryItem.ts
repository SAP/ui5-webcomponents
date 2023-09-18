import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isSpace, isEnter } from "@ui5/webcomponents-base/dist/Keys.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents-icons/dist/background.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import MediaGalleryItemLayout from "./types/MediaGalleryItemLayout.js";

// Styles
import MediaGalleryItemCss from "./generated/themes/MediaGalleryItem.css.js";

// Template
import MediaGalleryItemTemplate from "./generated/templates/MediaGalleryItemTemplate.lit.js";

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
 * @alias sap.ui.webc.fiori.MediaGalleryItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-media-gallery-item
 * @public
 * @implements sap.ui.webc.fiori.IMediaGalleryItem
 * @since 1.1.0
 */
@customElement({
	tag: "ui5-media-gallery-item",
	renderer: litRender,
	styles: MediaGalleryItemCss,
	template: MediaGalleryItemTemplate,
	dependencies: [Icon],
})
class MediaGalleryItem extends UI5Element implements ITabbable {
	/**
	 * Defines the selected state of the component.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.MediaGalleryItem.prototype.selected
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.MediaGalleryItem.prototype.disabled
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Determines the layout of the item container.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Square</code></li>
	 * <li><code>Wide</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.fiori.types.MediaGalleryItemLayout}
	 * @name sap.ui.webc.fiori.MediaGalleryItem.prototype.layout
	 * @defaultvalue "Square"
	 * @public
	 */
	@property({ type: MediaGalleryItemLayout, defaultValue: MediaGalleryItemLayout.Square })
	layout!: `${MediaGalleryItemLayout}`;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_interactive!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_square!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_contentImageNotFound!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_thumbnailNotFound!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_thumbnailDesign!: boolean;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused!: boolean;

	/**
	 * @private
	 */
	@property()
	_tabIndex!: string;

	/**
	 * @private
	 */
	@property({ noAttribute: true })
	contentHeight!: string;

	/**
	 * Defines the content of the component.
	 *
	 * @type {HTMLElement}
	 * @name sap.ui.webc.fiori.MediaGalleryItem.prototype.default
	 * @slot content
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the content of the thumbnail.
	 *
	 * @type {HTMLElement}
	 * @name sap.ui.webc.fiori.MediaGalleryItem.prototype.thumbnail
	 * @slot thumbnail
	 * @public
	 */
	@slot()
	thumbnail!: Array<HTMLElement>;

	_monitoredThumbnail: HTMLElement | null;
	_monitoredContent: HTMLElement | null;

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

	get _thumbnail() {
		return this.thumbnail.length ? this.thumbnail[0] : null;
	}

	get _content() {
		return this.content.length ? this.content[0] : null;
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

	get effectiveTabIndex() {
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
			this._thumbnailNotFound = false; // reset flag
			callback = this._updateThumbnailLoaded.bind(this);
			success = this._attachListeners(this._thumbnail as HTMLImageElement, callback);
			success && (this._monitoredThumbnail = this._thumbnail);
		}
		if (!this._useThumbnail && this.content.length && (this._monitoredContent !== this._content)) {
			this._contentImageNotFound = false; // reset flag
			callback = this._updateContentImageLoaded.bind(this);
			success = this._attachListeners(this._content as HTMLImageElement, callback);
			success && (this._monitoredContent = this._content);
		}
	}

	_attachListeners(element: HTMLImageElement, callback: (image: HTMLImageElement) => void) {
		const isImg = element.tagName === "IMG",
			img = isImg ? element : element.querySelector("img");
		if (img) {
			callback(img);
			img.addEventListener("error", () => {
				if (this.contains(img)) { // img still belongs to us
					callback(img);
				}
			});
			img.addEventListener("load", () => {
				if (this.contains(img)) { // img still belongs to us
					callback(img);
				}
			});
			return true;
		}
	}

	_updateContentImageLoaded(image: HTMLImageElement) {
		this._contentImageNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_updateThumbnailLoaded(image: HTMLImageElement) {
		this._thumbnailNotFound = image.naturalHeight === 0 && image.naturalWidth === 0;
	}

	_onkeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
		}

		if (isEnter(e)) {
			this._fireItemClick();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
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
}

MediaGalleryItem.define();

export default MediaGalleryItem;
