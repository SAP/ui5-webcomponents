const isNodeHidden = node => {
	if (node.nodeName === "SLOT") {
		return false;
	}

	return (node.offsetWidth <= 0 && node.offsetHeight <= 0) || (node.style && node.style.visibility === "hidden");
};

export default isNodeHidden;
