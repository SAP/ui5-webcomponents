function filterHelper(elements, lowerText) {
  return elements.filter(element => {

    if (element.label?.toLowerCase().includes(lowerText)) {
      return true;
    }

    if (element.items) {
      element.items = filterHelper(element.items, lowerText);
    }

    const containsItems = (element.items && element.items.length > 0);

    return containsItems;
  });
}

export function filter(sidebar = [], text) {
  if (!text) return sidebar;
  const lowerText = text.toLowerCase();

  return filterHelper(sidebar, lowerText);
}