import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents/dist/ListItemGroup.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const listMultipleDnd = document.getElementById("listMultipleDnd");
const listMultipleDnd1 = document.getElementById("listMultipleDnd1");
const group1 = document.getElementById("group1");
const group2 = document.getElementById("group2");

let selectedItems = [];

const handleBeforeItemMove = (e) => {
  const { destination, source } = e.detail;
  const isOn = destination.placement === MovePlacement.On;
  const isAfter = destination.placement === MovePlacement.After;
  const isBefore = destination.placement === MovePlacement.Before;
  const isNesting = "allowsNesting" in destination.element.dataset;

  if (isBefore || isAfter || (isOn && isNesting)) {
    e.preventDefault();
  }
};

function updateMovingItemsCount() {
  listMultipleDnd.movingItemsCount = listMultipleDnd.getSelectedItems().length;
  listMultipleDnd1.movingItemsCount = listMultipleDnd1.getSelectedItems().length;
}

const onMove = async (e) => {
  const { destination, source, originalEvent } = e.detail;
  const movedElements = selectedItems.length > 1 ? selectedItems : [source.element];
  
  // stop the propagation of the event to prevent when the items are moved 
  // inside of a group to prevent double handling by the list handler
  originalEvent?.stopPropagation();

  if (destination.placement === MovePlacement.Before) {
    destination.element.before(...movedElements);
  } else if (destination.placement === MovePlacement.After) {
    destination.element.after(...movedElements);
  } else if (destination.placement === MovePlacement.On) {
    destination.element.prepend(...movedElements);
  }
  await window["sap-ui-webcomponents-bundle"].renderFinished();
  updateMovingItemsCount();
};

[group1, group2, listMultipleDnd1, listMultipleDnd].forEach((el) => {
  if (el.tagName === "UI5-LIST") {
    el.addEventListener("dragstart", () => selectedItems = el.getSelectedItems());
    el.addEventListener("ui5-selection-change", updateMovingItemsCount);
    el.addEventListener("ui5-move-over", handleBeforeItemMove);
  }
  el.addEventListener("ui5-move", onMove);
});