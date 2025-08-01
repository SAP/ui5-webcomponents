import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import DragRegistry from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import { findClosestPosition } from "@ui5/webcomponents-base/dist/util/dragAndDrop/findClosestPosition.js";
import Orientation from "@ui5/webcomponents-base/dist/types/Orientation.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type DropIndicator from "./DropIndicator.js";
import type ListItemBase from "./ListItemBase.js";

// Template
import ListItemGroupTemplate from "./ListItemGroupTemplate.js";

// Styles
import ListItemGroupCss from "./generated/themes/ListItemGroup.css.js";
import type ListItemGroupHeader from "./ListItemGroupHeader.js";
import type WrappingType from "./types/WrappingType.js";

type ListItemGroupMoveEventDetail = {
	source: {
		element: HTMLElement,
	},
	destination: {
		element: HTMLElement,
		placement: `${MovePlacement}`,
	}
}

/**
 * @class
 * ### Overview
 * The `ui5-li-group` is a special list item, used only to create groups of list items.
 *
 * This is the item to use inside a `ui5-list`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ListItemGroup.js";`
 * @csspart header - Used to style the header item of the group
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.0.0
 */
@customElement({
	tag: "ui5-li-group",
	renderer: jsxRenderer,
	languageAware: true,
	template: ListItemGroupTemplate,
	styles: [ListItemGroupCss],
})

/**
 * Fired when a movable list item is moved over a potential drop target during a dragging operation.
 *
 * If the new position is valid, prevent the default action of the event using `preventDefault()`.
 * @param {object} source Contains information about the moved element under `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 * @since 2.1.0
 */

@event("move-over", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired when a movable list item is dropped onto a drop target.
 *
 * **Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.
 * @param {object} source Contains information about the moved element under `element` property.
 * @param {object} destination Contains information about the destination of the moved element. Has `element` and `placement` properties.
 * @public
 * @since 2.1.0
 */
@event("move", {
	bubbles: true,
})

class ListItemGroup extends UI5Element {
	eventDetails!: {
		"move-over": ListItemGroupMoveEventDetail,
		"move": ListItemGroupMoveEventDetail,
	}
	/**
	 * Defines the header text of the <code>ui5-li-group</code>.
	 * @public
	 * @default undefined
	 */
	@property()
	headerText?: string;

	/**
	 * Defines the accessible name of the header.
	 * @public
	 * @default undefined
	 */
	@property()
	headerAccessibleName?: string;

	/**
	 * Defines the items of the <code>ui5-li-group</code>.
	 * @public
	 */
	@slot({
		"default": true,
		invalidateOnChildChange: true,
		type: HTMLElement,
	})
	items!: Array<ListItemBase>;

	/**
	 * Defines if the text of the component should wrap when it's too long.
	 * When set to "Normal", the content (title, description) will be wrapped
	 * using the `ui5-expandable-text` component.<br/>
	 *
	 * The text can wrap up to 100 characters on small screens (size S) and
	 * up to 300 characters on larger screens (size M and above). When text exceeds
	 * these limits, it truncates with an ellipsis followed by a text expansion trigger.
	 *
	 * Available options are:
	 * - `None` (default) - The text will truncate with an ellipsis.
	 * - `Normal` - The text will wrap (without truncation).
	 *
	 * @default "None"
	 * @public
	 * @since 2.15.0
	 */
	@property()
	wrappingType: `${WrappingType}` = "None";

	/**
	 * Indicates whether the header is focused
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	* Defines the header of the component.
	*
	* **Note:** Using this slot, the default header text of group and the value of `headerText` property will be overwritten.
	* @public
	*/
	@slot({ type: HTMLElement })
	header!: Array<ListItemBase>;

	onEnterDOM() {
		DragRegistry.subscribe(this);
	}

	onExitDOM() {
		DragRegistry.unsubscribe(this);
	}

	get groupHeaderItem() {
		return this.shadowRoot!.querySelector<ListItemGroupHeader>("[ui5-li-group-header]")!;
	}

	get hasHeader(): boolean {
		return !!this.headerText || this.hasFormattedHeader;
	}

	get hasFormattedHeader(): boolean {
		return !!this.header.length;
	}

	get isListItemGroup() {
		return true;
	}

	get dropIndicatorDOM(): DropIndicator | null {
		return this.shadowRoot!.querySelector("[ui5-drop-indicator]");
	}

	_ondragenter(e: DragEvent) {
		e.preventDefault();
	}

	_ondragleave(e: DragEvent) {
		if (e.relatedTarget instanceof Node && this.shadowRoot!.contains(e.relatedTarget)) {
			return;
		}

		this.dropIndicatorDOM!.targetReference = null;
	}

	_ondragover(e: DragEvent) {
		const draggedElement = DragRegistry.getDraggedElement();

		if (!(e.target instanceof HTMLElement) || !draggedElement) {
			return;
		}

		const closestPosition = findClosestPosition(
			this.items,
			e.clientY,
			Orientation.Vertical,
		);

		if (!closestPosition) {
			this.dropIndicatorDOM!.targetReference = null;
			return;
		}

		let placements = closestPosition.placements;

		if (closestPosition.element === draggedElement) {
			placements = placements.filter(placement => placement !== MovePlacement.On);
		}

		const placementAccepted = placements.some(placement => {
			const beforeItemMovePrevented = !this.fireDecoratorEvent("move-over", {
				source: {
					element: draggedElement,
				},
				destination: {
					element: closestPosition.element,
					placement,
				},
			});

			if (beforeItemMovePrevented) {
				e.preventDefault();
				this.dropIndicatorDOM!.targetReference = closestPosition.element;
				this.dropIndicatorDOM!.placement = placement;
				return true;
			}

			return false;
		});

		if (!placementAccepted) {
			this.dropIndicatorDOM!.targetReference = null;
		}
	}

	_ondrop(e: DragEvent) {
		e.preventDefault();

		this.fireDecoratorEvent("move", {
			source: {
				element: DragRegistry.getDraggedElement()!,
			},
			destination: {
				element: this.dropIndicatorDOM!.targetReference!,
				placement: this.dropIndicatorDOM!.placement,
			},
		});

		this.dropIndicatorDOM!.targetReference = null;
	}
}

ListItemGroup.define();

const isInstanceOfListItemGroup = (object: any): object is ListItemGroup => {
	return "isListItemGroup" in object;
};

export default ListItemGroup;
export { isInstanceOfListItemGroup };
export type { ListItemGroupMoveEventDetail };
