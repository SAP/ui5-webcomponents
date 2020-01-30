const isNodeHidden = node => {
	if (node.nodeName === "SLOT") {
		return false;
	}

	const rect = node.getBoundingClientRect();

	return (node.offsetWidth <= 0 && node.offsetHeight <= 0)
		|| node.style.visibility === "hidden"
		|| (rect.width === 0 && 0 && rect.height === 0);
};

export default isNodeHidden;
