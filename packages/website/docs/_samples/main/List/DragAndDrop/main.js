import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/ListItemStandard.js";
import "@ui5/webcomponents-icons/dist/checklist-item.js";
import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";

const list = document.getElementById('listDnd1');
const handleBeforeItemMove = (e) => {
  const { destination, source } = e.detail;

  if (destination.placement === 'Before' || destination.placement === 'After') {
    e.preventDefault();
  }

};

const handleMoveOver = (e) => {
  const { destination, source } = e.detail;

  if (!list.contains(source.element)) {
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

list.addEventListener('move-over', handleMoveOver);
list.addEventListener('move', handleMove);

