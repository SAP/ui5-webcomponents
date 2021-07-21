/**
 * Checks if the nodes contain text
 *
 * @param {Node[]} nodes nodes
 * @returns {boolean}
 */

const nodesHaveText = nodes => {
	return Array.from(nodes).filter(node => {
		return node.nodeType !== Node.COMMENT_NODE
			&& (node.nodeType !== Node.TEXT_NODE || node.nodeValue.trim().length !== 0);
	}).length > 0;
};

export default nodesHaveText;
