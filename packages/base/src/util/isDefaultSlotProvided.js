import { getSlotName } from "./SlotsHelper.js";

const isDefaultSlotProvided = element => {
	return Array.from(element.childNodes).filter(node => {
		return node.nodeType !== Node.COMMENT_NODE
		&& getSlotName(node) === "default"
		&& (node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim().length !== 0);
	}).length > 0;
};

export default isDefaultSlotProvided;
