let prevCalculation;

const supportsShadowParts = () => {
	if (prevCalculation) {
		return prevCalculation;
	}

	// custom element with an exposed part for testing CSS shadow parts support
	class PartsFeatureDetection extends HTMLElement {
		constructor() {
			super();
			var shadow = this.attachShadow({ mode: 'open' });
			shadow.innerHTML = `<div hidden part='target'></div>`;
		}
	}
	customElements.define('parts-feature-detection', PartsFeatureDetection);

	// get initial font size
	const fdElement = document.createElement("parts-feature-detection");
	document.body.appendChild(fdElement);
	const defaultFontSize = parseInt(getComputedStyle(fdElement.shadowRoot.firstChild).fontSize);

	// apply style with increased font size
	const style = document.createElement("style");
	style.textContent = `parts-feature-detection::part(target) { font-size: ${defaultFontSize + 1}px; }`;
	document.head.appendChild(style);

	// check if the increased font size is applied
	const newFontSize = parseInt(getComputedStyle(fdElement.shadowRoot.firstChild).fontSize);
	const supportsParts = (newFontSize === defaultFontSize + 1);

	// clean up and store result
	document.body.removeChild(fdElement);
	document.head.removeChild(style);
	prevCalculation = supportsParts;

	return supportsParts;
}

export default supportsShadowParts;