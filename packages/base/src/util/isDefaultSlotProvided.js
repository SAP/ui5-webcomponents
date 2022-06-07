const isDefaultSlotProvided = element => {
	return Array.from(element.childNodes).filter(node => {
		return node.nodeType !== Node.COMMENT_NODE
		&& (node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim().length !== 0);
	}).length;
};

export default isDefaultSlotProvided;
