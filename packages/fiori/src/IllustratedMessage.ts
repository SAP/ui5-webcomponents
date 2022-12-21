import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getIllustrationDataSync, getIllustrationData } from "@ui5/webcomponents-base/dist/asset-registries/Illustrations.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import I18nBundle, { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import IllustrationMessageSize from "./types/IllustrationMessageSize.js";
import IllustrationMessageType from "./types/IllustrationMessageType.js";
import "./illustrations/BeforeSearch.js";

// Styles
import IllustratedMessageCss from "./generated/themes/IllustratedMessage.css.js";

// Template
import IllustratedMessageTemplate from "./generated/templates/IllustratedMessageTemplate.lit.js";

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
 * @alias sap.ui.webc.fiori.IllustratedMessage
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-illustrated-message
 * @public
 * @since 1.0.0-rc.15
 */

@customElement("ui5-illustrated-message")
@languageAware
class IllustratedMessage extends UI5Element {
	/**
	* Defines the illustration name that will be displayed in the component.
	* <br><br>
	* Available illustrations are:
	* <ul>
	* <li><code>AddColumn</code></li>
	* <li><code>AddPeople</code></li>
	* <li><code>AddDimensions</code></li>
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
	* <li><code>NoDimensionsSet</code></li>
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
	* <li><code>UploadToCloud</code></li>
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
	* @type {sap.ui.webc.fiori.types.IllustrationMessageType}
	* @defaultvalue "BeforeSearch"
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.name
	* @public
	*/
	@property({ type: IllustrationMessageType, defaultValue: IllustrationMessageType.BeforeSearch })
	name!: IllustrationMessageType;

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
	* @type {sap.ui.webc.fiori.types.IllustrationMessageSize}
	* @defaultvalue "Auto"
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.size
	* @public
	* @since 1.5.0
	*/
	@property({ type: IllustrationMessageSize, defaultValue: IllustrationMessageSize.Auto })
	size!: IllustrationMessageSize;

	/**
	* Defines the subtitle of the component.
	* <br><br>
	* <b>Note:</b> Using this property, the default subtitle text of illustration will be overwritten.
	* <br><br>
	* <b>Note:</b> Using <code>subtitle</code> slot, the default of this property will be overwritten.
	* @type {string}
	* @defaultvalue ""
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.subtitleText
	* @public
	*/
	@property()
	subtitleText!: string;

	/**
	* Defines the title of the component.
	* <br><br>
	* <b>Note:</b> Using this property, the default title text of illustration will be overwritten.
	* @type {string}
	* @defaultvalue ""
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.titleText
	* @public
	*/
	@property()
	titleText!: string;

	/**
	* Receives id(or many ids) of the elements that label the component.
	*
	* @type {string}
	* @defaultvalue ""
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.accessibleNameRef
	* @public
	* @since 1.7.0
	*/
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	* Illustration breakpoint variant for the <code>Spot</code> size.
	*
	* @private
	* @type {String}
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	spotSvg!: string;

	/**
	* Illustration breakpoint variant for the <code>Scene</code> size.
	*
	* @private
	* @type {String}
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	sceneSvg!: string;

	/**
	* Illustration breakpoint variant for the <code>Dialog</code> size.
	*
	* @private
	* @type {String}
	* @since 1.9.0
	*/
	@property({ noAttribute: true })
	dialogSvg!: string;

	/**
	* Determinates what is the current media of the component based on its width.
	* @private
	*/
	@property()
	media!: string;

	/**
	* Defines the title of the component.
	* <br><br>
	* <b>Note:</b> Using this slot, the default title text of illustration and the value of <code>title</code> property will be overwritten.
	* @type {HTMLElement}
	* @slot title
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.title
	* @public
	* @since 1.7.0
	*/
	@slot({ type: HTMLElement })
	title!: Array<HTMLElement> & string; // Note: since title collides with HTMLElement's title attribute and it's a String, we're adding the "& string" to the type Array<HTMLElement> to avoid ts complains. In the future we will rename/deprecate this slot name, so that it doesn't collide with HTMLElement's title attribute.

	/**
	* Defines the subtitle of the component.
	* <br><br>
	* <b>Note:</b> Using this slot, the default subtitle text of illustration and the value of <code>subtitleText</code> property will be overwritten.
	* @type {HTMLElement}
	* @slot subtitle
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.subtitle
	* @public
	* @since 1.0.0-rc.16
	*/
	@slot({ type: HTMLElement })
	subtitle!: Array<HTMLElement>;

	/**
	* Defines the component actions.
	* @type {sap.ui.webc.main.IButton[]}
	* @slot actions
	* @name sap.ui.webc.fiori.IllustratedMessage.prototype.default
	* @public
	*/
	@slot({ type: HTMLElement, "default": true })
	actions!: Array<HTMLElement>;

	illustrationTitle?: string;
	illustrationSubtitle?: string;

	static i18nBundle: I18nBundle;
	_lastKnownOffsetWidthForMedia: Record<string, number>;
	_lastKnownMedia: string;
	_handleResize: () => void;

	constructor() {
		super();

		this._handleResize = this.handleResize.bind(this);
		// this will store the last known offsetWidth of the IllustratedMessage DOM node for a given media (e.g. "Spot")
		this._lastKnownOffsetWidthForMedia = {};
		// this will store the last known media, in order to detect if IllustratedMessage has been hidden by expand/collapse container
		this._lastKnownMedia = "base";
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

		// Gets the current illustration name given in the "name" attribute
		const currentIllustration = this.getAttribute("name") as IllustrationMessageType;

		if (this.hasAttribute("name") && !this.isValidIllustration(currentIllustration)) {
			// eslint-disable-next-line
			console.warn(`The illustration "${currentIllustration!}" does not exist. The default illustration "${IllustrationMessageType.BeforeSearch}" is loaded instead.`);
		}

		if (illustrationData === undefined) {
			illustrationData = await getIllustrationData(this.name);
		}

		this.spotSvg = illustrationData!.spotSvg;
		this.dialogSvg = illustrationData!.dialogSvg;
		this.sceneSvg = illustrationData!.sceneSvg;

		this.illustrationTitle = IllustratedMessage.i18nBundle.getText(illustrationData!.title);
		this.illustrationSubtitle = IllustratedMessage.i18nBundle.getText(illustrationData!.subtitle);

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
		 // prevents infinite resizing, when same width is detected for the same media,
		 // excluding the case in which, the control is placed inside expand/collapse container
		if (!(lastKnownOffsetWidth && currOffsetWidth === lastKnownOffsetWidth) || this._lastKnownOffsetWidthForMedia[this._lastKnownMedia] === 0) {
			this.media = newMedia;
			this._lastKnownOffsetWidthForMedia[newMedia] = currOffsetWidth;
			this._lastKnownMedia = newMedia;
		}
	}

	_setSVGAccAttrs() {
		const svg = this.shadowRoot!.querySelector(".ui5-illustrated-message-illustration svg");
		if (svg) {
			if (this.ariaLabelText) {
				svg.setAttribute("aria-label", this.ariaLabelText);
			} else {
				svg.removeAttribute("aria-label");
			}
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

	get ariaLabelText(): string | undefined {
		return getEffectiveAriaLabelText(this);
	}

	get effectiveIllustration(): string {
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

	get hasFormattedSubtitle(): boolean {
		return !!this.subtitle.length;
	}

	get hasFormattedTitle(): boolean {
		return !!this.title.length;
	}

	get effectiveTitleText(): string | undefined {
		return this.titleText ? this.titleText : this.illustrationTitle;
	}

	get effectiveSubitleText(): string | undefined {
		return this.subtitleText ? this.subtitleText : this.illustrationSubtitle;
	}

	get hasTitle(): boolean {
		return !!(this.hasFormattedTitle || this.titleText || this.illustrationTitle);
	}

	get hasSubtitle(): boolean {
		return !!(this.hasFormattedSubtitle || this.subtitleText || this.illustrationSubtitle);
	}

	get hasActions(): boolean {
		return !!this.actions.length && this.media !== IllustratedMessage.MEDIA.BASE;
	}

	isValidIllustration(currentIllustration: IllustrationMessageType): boolean {
		return currentIllustration in IllustrationMessageType;
	}
}

IllustratedMessage.define();

export default IllustratedMessage;
