import type MediaGalleryItem from "./MediaGalleryItem.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import background from "@ui5/webcomponents-icons/dist/background.js";

export default function MediaGalleryItemTemplate(this: MediaGalleryItem) {
	return (
		<div class="ui5-media-gallery-item-root"
			tabindex={this.effectiveTabIndex}
			data-sap-focus-ref
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			role={this._role}
		>
			<div class="ui5-media-gallery-item-mask-layer"></div>
			<div class="ui5-media-gallery-item-wrapper" style={this.styles.wrapper}>
				{this._showBackgroundIcon && <Icon name={background}/>}
				{this._useContent && <slot />}
				{this._useThumbnail && <slot name="thumbnail" />}
			</div>
		</div>
	);
}
