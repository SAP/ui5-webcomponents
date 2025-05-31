import type { DragGhostProvider } from "./DragGhostBehavior.js";
import ListItemStandard from "../ListItemStandard.js";

/**
 * Provides a template for rendering the drag ghost text in the List component
 * when multiple items are dragged.
 *
 * @returns {JSX.Element} The rendered drag ghost
 */
function DragGhostTemplate<T extends DragGhostProvider>(this: T): JSX.Element {
	return (
		<div aria-hidden="true">
			<ListItemStandard data-custom-drag-ghost class="ui5-drag-ghost">
				{this.getDragGhostText()}
			</ListItemStandard>
		</div>
	);
}

export default DragGhostTemplate;
