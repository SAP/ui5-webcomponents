import "@ui5/webcomponents/dist/Tree.js";
import "@ui5/webcomponents/dist/TreeItem.js";
import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Label.js";


const tree1 = document.getElementById("tree");
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

const tree1HandleMoveOver = (e) => {
    const { destination, source } = e.detail;

    if (!tree1.contains(source.element)) {
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

tree1.addEventListener("move-over", tree1HandleMoveOver);
tree1.addEventListener("move", handleMove);

const densityCb = document.getElementById("density");
densityCb.addEventListener("change", e => {
    document.body.classList.toggle("ui5-content-density-compact", e.target.checked);
});

const reorderCb = document.getElementById("reorder");
reorderCb.addEventListener("change", e => {
    tree1.items.forEach((item) => item.movable = e.target.checked);
});