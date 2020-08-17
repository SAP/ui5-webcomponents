const isSlot = el => el && el instanceof HTMLElement && el.localName === "slot";

export default isSlot;
