import type List from "../List.js";
import ListItemStandard from "../ListItemStandard.js";

/**
 * Provides a template for rendering the drag ghost text in the List component
 * when multiple items are dragged.
 *
 * @returns {JSX.Element} The rendered drag ghost
 */
export default function ListDragElementTemplate(
	this: List,
): JSX.Element {
	return (
		<div aria-hidden="true">
			<ListItemStandard data-custom-drag-ghost class="ui5-list-drag-ghost">
				{this.dragGhostText}
			</ListItemStandard>
		</div>
	);
}
