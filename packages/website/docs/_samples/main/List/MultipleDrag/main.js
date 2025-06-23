import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/task.js";
import "@ui5/webcomponents-icons/dist/accept.js";
import { startMultipleDrag } from "@ui5/webcomponents-base/dist/util/dragAndDrop/DragRegistry.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const lists = [
    document.getElementById("list1"),
    document.getElementById("list2"), 
];
const counters = [
    document.getElementById("count1"),
    document.getElementById("count2"),
];

function getSelectedItems(list) {
    return list.getItems().filter(item => item.selected);
}

function updateSelectionCount(listIndex) {
    const selectedItems = getSelectedItems(lists[listIndex]);
    counters[listIndex].textContent = selectedItems.length;
}

function setupSelectionChangeListener(listIndex) {
    lists[listIndex].addEventListener("ui5-selection-change", () => {
        updateSelectionCount(listIndex);
    });
}

function handleDragStart(listIndex) {
    return function(event) {
        const list = lists[listIndex];
        const selectedItems = getSelectedItems(list);
        const draggedItem = event.target;
        
        // If dragged item is not selected, select only it
        if (!draggedItem.selected) {
            selectedItems.forEach(item => item.selected = false);
            draggedItem.selected = true;
            updateSelectionCount(listIndex);
        }
        
        const currentSelected = getSelectedItems(list);
        
        // Start multiple drag if more than one item is selected
        if (currentSelected.length > 1) {
            startMultipleDrag(currentSelected.length);
        }
    };
}

function handleMoveOver(event) {
    const { source, destination } = event.detail;
    
    // Allow drops from both lists
    const sourceList = source.element.closest('ui5-list');
    if (lists.includes(sourceList)) {
        // Allow reordering within lists
        if (destination.placement === MovePlacement.Before || 
            destination.placement === MovePlacement.After) {
            event.preventDefault();
        }
    }
}

function handleMove(event) {
    const { source, destination } = event.detail;
    
    // Get the source list to find all selected items
    const sourceList = source.element.closest('ui5-list');
    const selectedItems = getSelectedItems(sourceList);
    
    // If multiple items are selected, move all of them
    if (selectedItems.length > 1 && selectedItems.includes(source.element)) {
        // Move all selected items together
        selectedItems.forEach((item, index) => {
            switch (destination.placement) {
                case MovePlacement.Before:
                    if (index === 0) {
                        destination.element.before(item);
                    } else {
                        // Place subsequent items after the previous one
                        selectedItems[index - 1].after(item);
                    }
                    break;
                case MovePlacement.After:
                    if (index === 0) {
                        destination.element.after(item);
                    } else {
                        // Place subsequent items after the previous one
                        selectedItems[index - 1].after(item);
                    }
                    break;
                case MovePlacement.On:
                    destination.element.prepend(item);
                    break;
            }
        });
    } else {
        // Single item move
        switch (destination.placement) {
            case MovePlacement.Before:
                destination.element.before(source.element);
                break;
            case MovePlacement.After:
                destination.element.after(source.element);
                break;
            case MovePlacement.On:
                destination.element.prepend(source.element);
                break;
        }
    }
    
    // Update selection counts after move
    setTimeout(() => {
        updateSelectionCount(0);
        updateSelectionCount(1);
    }, 0);
}

// Setup both lists
lists.forEach((list, index) => {
    setupSelectionChangeListener(index);
    list.addEventListener("dragstart", handleDragStart(index));
    list.addEventListener("ui5-move-over", handleMoveOver);
    list.addEventListener("ui5-move", handleMove);
});

// Initialize selection counts
updateSelectionCount(0);
updateSelectionCount(1);
