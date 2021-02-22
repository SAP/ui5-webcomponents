import { getAssetsPath, setAssetsPath } from "@ui5/webcomponents-base/dist/config/AssetsPath.js";
// setAssetsPath("/my-resources/");

import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming";
attachThemeLoaded(theme => {
	console.log("Theme load complete: ", theme);
});

// OpenUI5 integration
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";

// Calendars
import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";

// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// CLDR
import getLocaleData from "@ui5/webcomponents-localization/dist/locale/getLocaleData.js";

// Icons
import "@ui5/webcomponents-icons/dist/Assets.js";
import "@ui5/webcomponents-icons-tnt/dist/Assets.js";

/* Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
registerI18nBundle("@ui5/webcomponents", {
	bg: "./lang/messagebundle_bg.properties",
	fr: "./lang/fr.json",
});
*/

// asset helpers (needs correct json as url in rollup.config.js)
import "./dist/Assets.js";

import "./dist/features/InputElementsFormSupport.js";
import "./dist/features/InputSuggestions.js";

import Avatar from "./dist/Avatar.js";
import AvatarGroup from "./dist/AvatarGroup.js";
import Badge from "./dist/Badge.js";
import BusyIndicator from "./dist/BusyIndicator.js";
import Button from "./dist/Button.js";
import Card from "./dist/Card.js";
import Carousel from "./dist/Carousel.js";
import CheckBox from "./dist/CheckBox.js";
import ComboBox from "./dist/ComboBox.js";
import DatePicker from "./dist/DatePicker.js";
import DateRangePicker from "./dist/DateRangePicker.js";
import DateTimePicker from "./dist/DateTimePicker.js";
import DurationPicker from "./dist/DurationPicker.js";
import Dialog from "./dist/Dialog.js";
import FileUploader from "./dist/FileUploader.js";
import Icon from "./dist/Icon.js";
import Input from "./dist/Input.js";
import MultiInput from "./dist/MultiInput.js";
import Label from "./dist/Label.js";
import Link from "./dist/Link.js";
import Popover from "./dist/Popover.js";
import Panel from "./dist/Panel.js";
import RadioButton from "./dist/RadioButton.js";
import ResponsivePopover from "./dist/ResponsivePopover.js";
import SegmentedButton from "./dist/SegmentedButton.js";
import Select from "./dist/Select.js";
import Slider from "./dist/Slider.js";
import StepInput from "./dist/StepInput.js";
import RangeSlider from "./dist/RangeSlider.js";
import Switch from "./dist/Switch.js";
import MessageStrip from "./dist/MessageStrip.js";
import MultiComboBox from "./dist/MultiComboBox.js";
import ProgressIndicator from "./dist/ProgressIndicator.js";
import RatingIndicator from "./dist/RatingIndicator.js";
import TabContainer from "./dist/TabContainer.js";
import Tab from "./dist/Tab.js";
import TabSeparator from "./dist/TabSeparator.js";
import Table from "./dist/Table.js";
import TableColumn from "./dist/TableColumn.js";
import TableRow from "./dist/TableRow.js";
import TableCell from "./dist/TableCell.js";
import TextArea from "./dist/TextArea.js";
import TimePicker from "./dist/TimePicker.js";
import Title from "./dist/Title.js";
import Toast from "./dist/Toast.js";
import ToggleButton from "./dist/ToggleButton.js";
import Tree from "./dist/Tree.js";

import List from "./dist/List.js";
import StandardListItem from "./dist/StandardListItem.js";
import CustomListItem from "./dist/CustomListItem.js";
import GroupHeaderListItem from "./dist/GroupHeaderListItem.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes

import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";

const testAssets = {
	configuration : {
		getAnimationMode,
		setAnimationMode,
		getTheme,
		setTheme,
		getLanguage,
		setLanguage,
		setNoConflict,
		getRTL,
		getFirstDayOfWeek,
		getAssetsPath,
		setAssetsPath
	},
	getLocaleData,
	applyDirection,
	ResizeHandler,
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,
	getIconNames,
};

window["sap-ui-webcomponents-bundle"] = testAssets;

export default testAssets;
