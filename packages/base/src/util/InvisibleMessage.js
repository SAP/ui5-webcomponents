import InvisibleMessageMode from "../types/InvisibleMessageMode.js";
import getSingletonElementInstance from "./getSingletonElementInstance.js";
import { attachBoot } from "../Boot.js";

let politeSpan;
let assertiveSpan;

attachBoot(() => {
	if (politeSpan && assertiveSpan) {
		return;
	}

	const styles = `position: absolute;
	clip: rect(1px,1px,1px,1px);
	user-select: none;
	left: -1000px;
	top: -1000px;
	pointer-events: none;`;

	politeSpan = document.createElement("span");
	assertiveSpan = document.createElement("span");

	politeSpan.classList.add("ui5-invisiblemessage-polite");
	assertiveSpan.classList.add("ui5-invisiblemessage-assertive");

	politeSpan.setAttribute("aria-live", "polite");
	assertiveSpan.setAttribute("aria-live", "assertive");

	politeSpan.setAttribute("role", "alert");
	assertiveSpan.setAttribute("role", "alert");

	politeSpan.style.cssText = styles;
	assertiveSpan.style.cssText = styles;

	getSingletonElementInstance("ui5-static-area").appendChild(politeSpan);
	getSingletonElementInstance("ui5-static-area").appendChild(assertiveSpan);
});

/**
 * Inserts the string into the respective span, depending on the mode provided.
 *
 * @param {string} message String to be announced by the screen reader.
 * @param {sap.ui.core.InvisibleMessageMode} mode The mode to be inserted in the aria-live attribute.
 */
const announce = (message, mode) => {
	// If no type is presented, fallback to polite announcement.
	const span = mode === InvisibleMessageMode.Assertive ? assertiveSpan : politeSpan;

	// Set textContent to empty string in order to trigger screen reader's announcement.
	span.textContent = "";
	span.textContent = message;

	if (mode !== InvisibleMessageMode.Assertive && mode !== InvisibleMessageMode.Polite) {
		console.warn(`You have entered an invalid mode. Valid values are: "Polite" and "Assertive". The framework will automatically set the mode to "Polite".`); // eslint-disable-line
	}
};

export default announce;
