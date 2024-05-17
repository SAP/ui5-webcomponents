import "@ui5/webcomponents/dist/Tree.js";
import "@ui5/webcomponents/dist/TreeItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Label.js";


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
    const parent = destination.element.parentNode.closest("[ui5-tree-item]") ||
        destination.element.closest("[ui5-tree]");

    if (destination.placement === "Before") {
        parent.insertBefore(
            source.element,
            destination.element
        );
    } else if (destination.placement === "After") {
        const nextElement = Array.from(parent.children).at(Array.from(parent.children).indexOf(destination.element) + 1);

        parent.insertBefore(
            source.element,
            nextElement,
        );
    } else if (destination.placement === "On") {
        destination.element.prepend(source.element);
    }
};

tree.addEventListener("move-over", handleMoveOver);
tree.addEventListener("move", handleMove);