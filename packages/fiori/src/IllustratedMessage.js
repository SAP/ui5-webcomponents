import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getIllustrationDataSync, getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";

import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import IllustratedMessageTemplate from "./generated/templates/IllustratedMessageTemplate.lit.js";
import IllustrationMessageSize from "./types/IllustrationMessageSize.js";
import IllustrationMessageType from "./types/IllustrationMessageType.js";
import "./illustrations/BeforeSearch.js";

// Styles
import IllustratedMessageCss from "./generated/themes/IllustratedMessage.css.js";

const ILLUSTRATION_NOT_FOUND = "ILLUSTRATION_NOT_FOUND";

/**
 * @public
 */
const metadata = {
	tag: "ui5-illustrated-message",
	languageAware: true,
	managedSlots: true,
	properties: /** @lends sap.ui.webcomponents.fiori.IllustratedMessage.prototype */ {

		/**
		 * Receives id(or many ids) of the elements that label the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 * @since 1.7.0
		 */
		 accessibleNameRef: {
			type: String,
			defaultValue: "",
		},
		/**
		 * Defines the title of the component.
		 * <br><br>
		 * <b>Note:</b> Using this property, the default title text of illustration will be overwritten.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		titleText: {
			type: String,
		},
		/**
		 * Defines the subtitle of the component.
		 * <br><br>
		 * <b>Note:</b> Using this property, the default subtitle text of illustration will be overwritten.
		 * <br><br>
		 * <b>Note:</b> Using <code>subtitle</code> slot, the default of this property will be overwritten.
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		subtitleText: {
			type: String,
		},
		/**
		 * Determinates what is the current media of the component based on its width.
		 * @private
		*/
		media: {
			type: String,
		},
		/**
		 * Determinates whether illustration is invalid.
		 * @private
		*/
		invalid: {
			type: Boolean,
		},
		/**
		 * Defines the illustration name that will be displayed in the component.
		 * <br><br>
		 * Available illustrations are:
		 * <ul>
		 * <li><code>AddColumn</code></li>
		 * <li><code>AddPeople</code></li>
		 * <li><code>BalloonSky</code></li>
		 * <li><code>BeforeSearch</code></li>
		 * <li><code>Connection</code></li>
		 * <li><code>EmptyCalendar</code></li>
		 * <li><code>EmptyList</code></li>
		 * <li><code>EmptyPlanningCalendar</code></li>
		 * <li><code>ErrorScreen</code></li>
		 * <li><code>FilterTable</code></li>
		 * <li><code>GroupTable</code></li>
		 * <li><code>NoActivities</code></li>
		 * <li><code>NoData</code></li>
		 * <li><code>NoEntries</code></li>
		 * <li><code>NoFilterResults</code></li>
		 * <li><code>NoMail_v1</code></li>
		 * <li><code>NoMail</code></li>
		 * <li><code>NoNotifications</code></li>
		 * <li><code>NoSavedItems_v1</code></li>
		 * <li><code>NoSavedItems</code></li>
		 * <li><code>NoSearchResults</code></li>
		 * <li><code>NoTasks_v1</code></li>
		 * <li><code>NoTasks</code></li>
		 * <li><code>PageNotFound</code></li>
		 * <li><code>ReloadScreen</code></li>
		 * <li><code>ResizeColumn</code></li>
		 * <li><code>SearchEarth</code></li>
		 * <li><code>SearchFolder</code></li>
		 * <li><code>SimpleBalloon</code></li>
		 * <li><code>SimpleBell</code></li>
		 * <li><code>SimpleCalendar</code></li>
		 * <li><code>SimpleCheckMark</code></li>
		 * <li><code>SimpleConnection</code></li>
		 * <li><code>SimpleEmptyDoc</code></li>
		 * <li><code>SimpleEmptyList</code></li>
		 * <li><code>SimpleError</code></li>
		 * <li><code>SimpleMagnifier</code></li>
		 * <li><code>SimpleMail</code></li>
		 * <li><code>SimpleNoSavedItems</code></li>
		 * <li><code>SimpleNotFoundMagnifier</code></li>
		 * <li><code>SimpleReload</code></li>
		 * <li><code>SimpleTask</code></li>
		 * <li><code>SleepingBell</code></li>
		 * <li><code>SortColumn</code></li>
		 * <li><code>SuccessBalloon</code></li>
		 * <li><code>SuccessCheckMark</code></li>
		 * <li><code>SuccessHighFive</code></li>
		 * <li><code>SuccessScreen</code></li>
		 * <li><code>Tent</code></li>
		 * <li><code>UnableToLoad</code></li>
		 * <li><code>UnableToLoadImage</code></li>
		 * <li><code>UnableToUpload</code></li>
		 * <li><code>UploadCollection</code></li>
		 * <li><code>TntChartArea</code></li>
		 * <li><code>TntChartArea2</code></li>
		 * <li><code>TntChartBar</code></li>
		 * <li><code>TntChartBPMNFlow</code></li>
		 * <li><code>TntChartBullet</code></li>
		 * <li><code>TntChartDoughnut</code></li>
		 * <li><code>TntChartFlow</code></li>
		 * <li><code>TntChartGantt</code></li>
		 * <li><code>TntChartOrg</code></li>
		 * <li><code>TntChartPie</code></li>
		 * <li><code>TntCodePlaceholder</code></li>
		 * <li><code>TntCompany</code></li>
		 * <li><code>TntComponents</code></li>
		 * <li><code>TntExternalLink</code></li>
		 * <li><code>TntFaceID</code></li>
		 * <li><code>TntFingerprint</code></li>
		 * <li><code>TntLock</code></li>
		 * <li><code>TntMission</code></li>
		 * <li><code>TntNoApplications</code></li>
		 * <li><code>TntNoFlows</code></li>
		 * <li><code>TntNoUsers</code></li>
		 * <li><code>TntRadar</code></li>
		 * <li><code>TntSecrets</code></li>
		 * <li><code>TntServices</code></li>
		 * <li><code>TntSessionExpired</code></li>
		 * <li><code>TntSessionExpiring</code></li>
		 * <li><code>TntSuccess</code></li>
		 * <li><code>TntSuccessfulAuth</code></li>
		 * <li><code>TntSystems</code></li>
		 * <li><code>TntTeams</code></li>
		 * <li><code>TntTools</code></li>
		 * <li><code>TntUnableToLoad</code></li>
		 * <li><code>TntUnlock</code></li>
		 * <li><code>TntUnsuccessfulAuth</code></li>
		 * <li><code>TntUser2</code></li>
		 * </ul>
		 * <br><br>
		 * <b>Note:</b> By default the <code>BeforeSearch</code> illustration is loaded.
		 * <br>
		 * When using an illustration type, other than the default, it should be loaded in addition:
		 * <br>
		 * <code>import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js";</code>
		 * <br><br>
		 * <b>Note:</b> TNT illustrations cointain <code>Tnt</code> prefix in their name.
		 * You can import them removing the <code>Tnt</code> prefix like this:
		 * <br>
		 * <code>import "@ui5/webcomponents-fiori/dist/illustrations/tnt/SessionExpired.js";</code>
		 * @type {sap.ui.webcomponents.fiori.types.IllustrationMessageType}
		 * @defaultvalue "BeforeSearch"
		 * @public
		 */
		name: {
			type: IllustrationMessageType,
			defaultValue: IllustrationMessageType.BeforeSearch,
		},
		/**
		 * Determines which illustration breakpoint variant is used.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Auto</code></li>
		 * <li><code>Base</code></li>
		 * <li><code>Spot</code></li>
		 * <li><code>Dialog</code></li>
		 * <li><code>Scene</code></li>
		 * </ul>
		 *
		 * As <code>IllustratedMessage</code> adapts itself around the <code>Illustration</code>, the other
		 * elements of the component are displayed differently on the different breakpoints/illustration sizes.
		 *
		 * @type {sap.ui.webcomponents.fiori.types.IllustrationMessageSize}
		 * @defaultvalue "Auto"
		 * @public
		 * @since 1.5.0
		 */
		size: {
			type: IllustrationMessageSize,
			defaultValue: IllustrationMessageSize.Auto,
		},
		/**
		* Illustration breakpoint variant for the <code>Dialog</code> size.
		*
		* @private
		* @type {String}
		* @since 1.9.0
		*/
		dialogSvg: {
			type: String,
		},
		/**
		* Illustration breakpoint variant for the <code>Scene</code> size.
		*
		* @private
		* @type {String}
		* @since 1.9.0
		*/
		sceneSvg: {
			type: String,
		},
		/**
		* Illustration breakpoint variant for the <code>Spot</code> size.
		*
		* @private
		* @type {String}
		* @since 1.9.0
		*/
		spotSvg: {
			type: String,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.IllustratedMessage.prototype */ {
		/**
		 * Defines the component actions.
		 * @type {sap.ui.webcomponents.main.IButton[]}
		 * @slot actions
		 * @public
		 */
		"default": {
			propertyName: "actions",
			type: HTMLElement,
		},
		/**
		 * Defines the subtitle of the component.
		 * <br><br>
		 * <b>Note:</b> Using this slot, the default subtitle text of illustration and the value of <code>subtitleText</code> property will be overwritten.
		 * @type {HTMLElement}
		 * @slot subtitle
		 * @public
		 * @since 1.0.0-rc.16
		 */
		subtitle: {
			type: HTMLElement,
		},
		/**
		 * Defines the title of the component.
		 * <br><br>
		 * <b>Note:</b> Using this slot, the default title text of illustration and the value of <code>title</code> property will be overwritten.
		 * @type {HTMLElement}
		 * @slot title
		 * @public
		 * @since 1.7.0
		 */
		title: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.IllustratedMessage.prototype */ {
		//
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * An IllustratedMessage is a recommended combination of a solution-oriented message, an engaging
 * illustration, and conversational tone to better communicate an empty or a success state than just show
 * a message alone.
 *
 * Each illustration has default internationalised title and subtitle texts. Also they can be managed with
 * <code>titleText</code> and <code>subtitleText</code> properties.
 *
 * To display the desired illustration, use the <code>name</code> property, where you can find the list of all available illustrations.
 * <br><br>
 * <b>Note:</b> By default the “BeforeSearch” illustration is loaded. To use other illustrations, make sure you import them in addition, for example:
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"</code>
 * <br>
 * <b>Note:</b> Illustrations starting with the “Tnt” prefix are part of another illustration set. For example to use the “TntSuccess” illustration, add the following import::
 * <br>
 * <code>import "@ui5/webcomponents-fiori/dist/illustrations/tnt/Success.js"</code>
 *
 * <h3>Structure</h3>
 * The IllustratedMessage consists of the following elements, which are displayed below each other in the following order:
 * <br>
 * <ul>
 * <li>Illustration</li>
 * <li>Title</li>
 * <li>Subtitle</li>
 * <li>Actions</li>
 * </ul>
 *
 * <h3>Usage</h3>
 * <code>ui5-illustrated-message</code> is meant to be used inside container component, for example a <code>ui5-card</code>,
 * a <code>ui5-dialog</code> or a <code>ui5-page</code>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.IllustratedMessage
 * @extends sap.ui.webcomponents.base.UI5Element
 * @tagname ui5-illustrated-message
 * @public
 * @since 1.0.0-rc.15
 */
class IllustratedMessage extends UI5Element {
	constructor() {
		super();

		this._handleResize = this.handleResize.bind(this);
		this._lastKnownOffsetWidthForMedia = {}; // this will store the last known offsetWidth of the IllustratedMessage DOM node for a given media (e.g. "Spot")
	}

	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return IllustratedMessageCss;
	}

	static get template() {
		return IllustratedMessageTemplate;
	}

	static async onDefine() {
		IllustratedMessage.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	static get BREAKPOINTS() {
		return {
			DIALOG: 679,
			SPOT: 319,
			BASE: 259,
		};
	}

	static get MEDIA() {
		return {
			BASE: "base",
			SPOT: "spot",
			DIALOG: "dialog",
			SCENE: "scene",
		};
	}

	static get dependencies() {
		return [Title];
	}

	async onBeforeRendering() {
		let illustrationData = getIllustrationDataSync(this.name);

		if (illustrationData === undefined) {
			illustrationData = await getIllustrationData(this.name);
		}

		if (illustrationData === ILLUSTRATION_NOT_FOUND) {
			this.invalid = true;
			const illustrationPath = this.name.includes("Tnt") ? `tnt/${this.name.replace("Tnt", "")}` : this.name;

			/* eslint-disable-next-line */
			return console.warn(`Required illustration is not registered. You can either import the specific illustration as a module - e.g. "@ui5/webcomponents-fiori/dist/illustrations/${illustrationPath}.js" or import the "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js" module to fetch any existing illustration on demand`);
		}

		this.invalid = false;
		this.spotSvg = illustrationData.spotSvg;
		this.dialogSvg = illustrationData.dialogSvg;
		this.sceneSvg = illustrationData.sceneSvg;

		this.illustrationTitle = IllustratedMessage.i18nBundle.getText(illustrationData.title);
		this.illustrationSubtitle = IllustratedMessage.i18nBundle.getText(illustrationData.subtitle);

		if (this.size !== IllustrationMessageSize.Auto) {
			this._handleCustomSize();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	handleResize() {
		if (this.size !== IllustrationMessageSize.Auto) {
			return;
		}

		this._applyMedia();
	}

	_applyMedia() {
		const currOffsetWidth = this.offsetWidth;
		let newMedia = "";

		if (this.offsetWidth <= IllustratedMessage.BREAKPOINTS.BASE) {
			newMedia = IllustratedMessage.MEDIA.BASE;
		} else if (this.offsetWidth <= IllustratedMessage.BREAKPOINTS.SPOT) {
			newMedia = IllustratedMessage.MEDIA.SPOT;
		} else if (this.offsetWidth <= IllustratedMessage.BREAKPOINTS.DIALOG) {
			newMedia = IllustratedMessage.MEDIA.DIALOG;
		} else {
			newMedia = IllustratedMessage.MEDIA.SCENE;
		}
		const lastKnownOffsetWidth = this._lastKnownOffsetWidthForMedia[newMedia];
		if (!(lastKnownOffsetWidth && currOffsetWidth === lastKnownOffsetWidth)) { // prevents infinite resize
			this.media = newMedia;
			this._lastKnownOffsetWidthForMedia[newMedia] = currOffsetWidth;
		}
	}

	_setSVGAccAttrs() {
		const svg = this.shadowRoot.querySelector(".ui5-illustrated-message-illustration svg");
		if (svg && this.ariaLabelText !== "") {
			svg.setAttribute("aria-label", this.ariaLabelText);
		}
	}

	onAfterRendering() {
		this._setSVGAccAttrs();
	}

	/**
	 * Modifies the IM styles in accordance to the `size` property's value.
	 * Note: The resize handler has no effect when size is different than "Auto".
	 * @private
	 * @since 1.5.0
	 */
	_handleCustomSize() {
		switch (this.size) {
		case IllustrationMessageSize.Base:
			this.media = IllustratedMessage.MEDIA.BASE;
			return;
		case IllustrationMessageSize.Spot:
			this.media = IllustratedMessage.MEDIA.SPOT;
			return;
		case IllustrationMessageSize.Dialog:
			this.media = IllustratedMessage.MEDIA.DIALOG;
			return;
		default:
			this.media = IllustratedMessage.MEDIA.SCENE;
		}
	}

	get ariaLabelText() {
		return getEffectiveAriaLabelText(this);
	}

	get effectiveIllustration() {
		switch (this.media) {
		case IllustratedMessage.MEDIA.SPOT:
			return this.spotSvg;
		case IllustratedMessage.MEDIA.DIALOG:
			return this.dialogSvg;
		case IllustratedMessage.MEDIA.SCENE:
			return this.sceneSvg;
		default:
			return "";
		}
	}

	get hasFormattedSubtitle() {
		return !!this.subtitle.length;
	}

	get hasFormattedTitle() {
		return !!this.title.length;
	}

	get effectiveTitleText() {
		return this.titleText ? this.titleText : this.illustrationTitle;
	}

	get effectiveSubitleText() {
		return this.subtitleText ? this.subtitleText : this.illustrationSubtitle;
	}

	get hasTitle() {
		return this.hasFormattedTitle || this.titleText || this.illustrationTitle;
	}

	get hasSubtitle() {
		return this.hasFormattedSubtitle || this.subtitleText || this.illustrationSubtitle;
	}

	get hasActions() {
		return !!this.actions.length && this.media !== IllustratedMessage.MEDIA.BASE;
	}
}

IllustratedMessage.define();

export default IllustratedMessage;
