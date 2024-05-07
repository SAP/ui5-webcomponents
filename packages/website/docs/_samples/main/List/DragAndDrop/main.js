import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";

import "@ui5/webcomponents-icons/dist/checklist-item.js";

const list = document.getElementById('listDnd1');
const handleBeforeItemMove = (e) => {
  const { destination, source } = e.detail;

  if (destination.placement === 'Before' || destination.placement === 'After') {
    e.preventDefault();
  }

};

const listHandleMoveOver = (e) => {
  const { destination, source } = e.detail;

  if (!list.contains(source.element)) {
    return;
  }

  handleBeforeItemMove(e);
};

const handleMove = (e) => {
  const { destination, source } = e.detail;
  const parent = destination.element.closest('[ui5-list]');

  if (destination.placement === 'Before') {
    parent.insertBefore(source.element, destination.element);
  } else if (destination.placement === 'After') {
    const nextElement = Array.from(parent.children).at(
      Array.from(parent.children).indexOf(destination.element) + 1
    );

    parent.insertBefore(source.element, nextElement);
  } else if (destination.placement === 'On') {
    destination.element.prepend(source.element);
  }
};

list.addEventListener('ui5-move-over', listHandleMoveOver);
list.addEventListener('ui5-move', handleMove);

