/**
 * Enumeration for different mode behaviors of the InvisibleMessage.
 *
 * @readonly
 * @enum {string}
 * @public
 * @author SAP SE
 * @alias sap.ui.webc.base.types.InvisibleMessageMode
 */
const InvisibleMessageMode = {
	/**
     * Indicates that updates to the region should be presented at the next graceful opportunity,
     * such as at the end of reading the current sentence, or when the user pauses typing.
	 * @public
	 * @type {Polite}
     */
	Polite: "Polite",

	/**
     * Indicates that updates to the region have the highest priority and should be presented to the user immediately.
	 * @public
	 * @type {Assertive}
     */
	Assertive: "Assertive",
} as const;

type InvisibleMessageMode = typeof InvisibleMessageMode[keyof typeof InvisibleMessageMode];

export default InvisibleMessageMode;
