/**
 * Removes a <link> tag in the <head> tag
 * @param linkElement - reference to <link> tag
 */
const removeLinkFromHead = linkElement => {
	document.head.removeChild(linkElement);
};

export default removeLinkFromHead;
