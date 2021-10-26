import createLinkInHead from "./util/createLinkInHead.js";

const createLink = (href, name, value = "") => {
	const attributes = {};
	attributes[name] = value;
	createLinkInHead(href, attributes);
};

const updateLink = (href, name, value = "") => {
	document.querySelector(`head>link[${name}="${value}"]`).href = href;
};

const hasLink = (name, value = "") => {
	return !!document.querySelector(`head>link[${name}="${value}"]`);
};

const removeLink = (name, value = "") => {
	const linkElement = document.querySelector(`head>link[${name}="${value}"]`);
	if (linkElement) {
		linkElement.parentElement.removeChild(linkElement);
	}
};

const createOrUpdateLink = (href, name, value = "") => {
	if (hasLink(name, value)) {
		updateLink(href, name, value);
	} else {
		createLink(href, name, value);
	}
};

export {
	createLink,
	hasLink,
	updateLink,
	removeLink,
	createOrUpdateLink,
};
