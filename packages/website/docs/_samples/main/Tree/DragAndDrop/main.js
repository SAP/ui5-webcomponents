import "@ui5/webcomponents/dist/Tree.js";
import "@ui5/webcomponents/dist/TreeItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Label.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const tree = document.getElementById("tree");
const handleBeforeItemMove = (e) => {
    const { destination, source } = e.detail;

    if (destination.placement === "Before" || destination.placement === "After") {
        e.preventDefault();
    }

    if (destination.placement === "On" && "allowsNesting" in destination.element.dataset) {
        e.preventDefault();
    }

    console.log(`Moving "${source.element.text}" ${destination.placement.toLowerCase()} "${destination.element.text}"`);
};

const handleMoveOver = (e) => {
    const { destination, source } = e.detail;

    if (!tree.contains(source.element)) {
        return;
    }

    handleBeforeItemMove(e);
};

const handleMove = (e) => {
    const { destination, source } = e.detail;

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
};

tree.addEventListener("move-over", handleMoveOver);
tree.addEventListener("move", handleMove);