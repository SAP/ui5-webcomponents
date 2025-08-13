import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableHeaderCellActionAI.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Popover.js";

function showGeneratedByAIPopover(e) {
	const popover = document.getElementById("generatedByAIPopover");
	popover.opener = e.detail.targetRef;
	popover.open = true;
}

const aiActionProduct = document.getElementById("aiActionProduct");
const aiActionPrice = document.getElementById("aiActionPrice");

aiActionProduct.addEventListener("click", showGeneratedByAIPopover);
aiActionPrice.addEventListener("click", showGeneratedByAIPopover);