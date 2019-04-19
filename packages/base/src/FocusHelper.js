import UI5Element from "./UI5Element.js";

const rFocusable = /^(?:input|select|textarea|button)$/i,
	rClickable = /^(?:a|area)$/i;

class FocusHelper {
	static hasTabIndex(domElement) {
		if (domElement.disabled) {
			return false;
		}

		const tabIndex = domElement.getAttribute("tabindex");
		if (tabIndex !== null && tabIndex !== undefined) {
			return parseInt(tabIndex) >= 0;
		}

		return rFocusable.test(domElement.nodeName)
			|| (rClickable.test(domElement.nodeName)
			&& domElement.href);
	}

	static isHidden(domElement) {
		if (domElement.nodeName === "SLOT") {
			return false;
		}

		const rect = domElement.getBoundingClientRect();

		return (domElement.offsetWidth <= 0 && domElement.offsetHeight <= 0)
			|| domElement.style.visibility === "hidden"
			|| (rect.width === 0 && 0 && rect.height === 0);
	}

	static isVisible(domElement) {
		return !FocusHelper.isHidden(domElement);
	}

	static getCorrectElement(element) {
		if (element instanceof UI5Element) {
			// Focus the CustomElement itself or provide getDomRef of each ?
			return element.getFocusDomRef();
		}

		return element;
	}

	static findFocusableElement(container, forward) {
		let child;
		if (container.assignedNodes && container.assignedNodes()) {
			const assignedElements = container.assignedNodes();
			child = forward ? assignedElements[0] : assignedElements[assignedElements.length - 1];
		} else {
			child = forward ? container.firstChild : container.lastChild;
		}

		let focusableDescendant;

		while (child) {
			const originalChild = child;

			child = FocusHelper.getCorrectElement(child);
			if (!child) {
				return null;
			}

			if (child.nodeType === 1 && !FocusHelper.isHidden(child)) {
				if (FocusHelper.hasTabIndex(child)) {
					return child;
				}

				focusableDescendant = FocusHelper.findFocusableElement(child, forward);
				if (focusableDescendant) {
					return focusableDescendant;
				}
			}

			child = forward ? originalChild.nextSibling : originalChild.previousSibling;
		}

		return null;
	}

	static findFirstFocusableElement(container) {
		if (!container || FocusHelper.isHidden(container)) {
			return null;
		}

		return FocusHelper.findFocusableElement(container, true);
	}

	static findLastFocusableElement(container) {
		if (!container || FocusHelper.isHidden(container)) {
			return null;
		}

		return FocusHelper.findFocusableElement(container, false);
	}

	static hasTabbableContent(node) {
		let hasTabableContent = false,
			content = node.children; // eslint-disable-line

		if (content) {
			hasTabableContent = FocusHelper._hasTabbableContent(content);
		}

		// If the node is inside Custom Element,
		// check the content in the 'light' DOM.
		if (!hasTabableContent && FocusHelper._isInsideShadowRoot(node)) {
			const customElement = FocusHelper._getCustomElement(node);
			const content = customElement.children; // eslint-disable-line

			if (content) {
				hasTabableContent = FocusHelper._hasTabbableContent(content);
			}
		}

		return hasTabableContent;
	}

	static getLastTabbableElement(node) {
		const tabbableContent = FocusHelper.getTabbableContent(node);
		return tabbableContent.length ? tabbableContent[tabbableContent.length - 1] : null;
	}

	static getTabbableContent(node) {
		let aTabbableContent = [],
			content = node.children; // eslint-disable-line

		if (content) {
			aTabbableContent = FocusHelper._getTabbableContent(content);
		}

		if (FocusHelper._isInsideShadowRoot(node)) {
			const customElement = FocusHelper._getCustomElement(node);
			const content = customElement.children; // eslint-disable-line

			if (content) {
				aTabbableContent = [...aTabbableContent, ...FocusHelper._getTabbableContent(content)];
			}
		}

		return aTabbableContent;
	}

	static _getTabbableContent(nodes) {
		const aTabbableContent = [];

		Array.from(nodes).forEach(node => {
			let currentNode = node;

			while (currentNode) {
				if (FocusHelper._hasShadowRoot(currentNode)) {
					// as the content is in the <span> template and it is always 2nd child
					const children = currentNode.shadowRoot.children;
					currentNode = children.length === 1 ? children[0] : children[1];
				}

				if (FocusHelper._isNodeTabbable(currentNode)) {
					aTabbableContent.push(currentNode);
				}
				currentNode = currentNode.children && currentNode.children.length && currentNode.children[0];
			}
		});

		return aTabbableContent.filter(FocusHelper.isVisible);
	}

	static _hasTabbableContent(nodes) {
		let hasTabableContent = false;

		Array.from(nodes).forEach(node => {
			let currentNode = node;

			while (currentNode && !hasTabableContent) {
				if (FocusHelper._hasShadowRoot(currentNode)) {
					// as the content is in the <span> template and it is always 2nd child
					const children = currentNode.shadowRoot.children;
					currentNode = children.length === 1 ? children[0] : children[1];
				}

				hasTabableContent = FocusHelper._isNodeTabbable(currentNode);
				currentNode = currentNode.children.length && currentNode.children[0];
			}
		});

		return hasTabableContent;
	}

	static _isNodeTabbable(node) {
		if (!node) {
			return false;
		}

		const nodeName = node.nodeName.toLowerCase();

		if (node.hasAttribute("data-sap-no-tab-ref")) {
			return false;
		}

		// special tags
		if (nodeName === "a") {
			return !!node.href;
		}

		if (/input|select|textarea|button|object/.test(nodeName)) {
			return !node.disabled;
		}

		return FocusHelper.hasTabIndex(node);
	}

	static _hasShadowRoot(node) {
		return !!(node && node.shadowRoot);
	}

	static _isInsideShadowRoot(node) {
		return !!(node && node.getRootNode() && node.getRootNode().host);
	}

	static _getCustomElement(node) {
		return node.getRootNode().host;
	}
}

export default FocusHelper;
