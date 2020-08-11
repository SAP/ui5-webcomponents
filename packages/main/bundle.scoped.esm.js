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

/* Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
registerI18nBundle("@ui5/webcomponents", {
	bg: "./lang/messagebundle_bg.properties",
	fr: "./lang/fr.json",
});
*/

// asset helpers (needs correct json as url in rollup.config.js)
import "./dist/scoped/Assets.js";

import "./dist/scoped/features/InputElementsFormSupport.js";
import "./dist/scoped/features/InputSuggestions.js";

import Avatar from "./dist/scoped/Avatar.js";
import Badge from "./dist/scoped/Badge.js";
import BusyIndicator from "./dist/scoped/BusyIndicator.js";
import Button from "./dist/scoped/Button.js";
import Card from "./dist/scoped/Card.js";
import Carousel from "./dist/scoped/Carousel.js";
import CheckBox from "./dist/scoped/CheckBox.js";
import ComboBox from "./dist/scoped/ComboBox.js";
import DatePicker from "./dist/scoped/DatePicker.js";
import DateRangePicker from "./dist/scoped/DateRangePicker.js";
import DateTimePicker from "./dist/scoped/DateTimePicker.js";
import DurationPicker from "./dist/scoped/DurationPicker.js";
import Dialog from "./dist/scoped/Dialog.js";
import FileUploader from "./dist/scoped/FileUploader.js";
import Icon from "./dist/scoped/Icon.js";
import Input from "./dist/scoped/Input.js";
import Label from "./dist/scoped/Label.js";
import Link from "./dist/scoped/Link.js";
import Popover from "./dist/scoped/Popover.js";
import Panel from "./dist/scoped/Panel.js";
import RadioButton from "./dist/scoped/RadioButton.js";
import ResponsivePopover from "./dist/scoped/ResponsivePopover.js";
import SegmentedButton from "./dist/scoped/SegmentedButton.js";
import Select from "./dist/scoped/Select.js";
import Switch from "./dist/scoped/Switch.js";
import MessageStrip from "./dist/scoped/MessageStrip.js";
import MultiComboBox from "./dist/scoped/MultiComboBox.js";
import ProgressIndicator from "./dist/scoped/ProgressIndicator.js";
import RatingIndicator from "./dist/scoped/RatingIndicator.js";
import TabContainer from "./dist/scoped/TabContainer.js";
import Tab from "./dist/scoped/Tab.js";
import TabSeparator from "./dist/scoped/TabSeparator.js";
import Table from "./dist/scoped/Table.js";
import TableColumn from "./dist/scoped/TableColumn.js";
import TableRow from "./dist/scoped/TableRow.js";
import TableCell from "./dist/scoped/TableCell.js";
import TextArea from "./dist/scoped/TextArea.js";
import Timeline from "./dist/scoped/Timeline.js";
import TimePicker from "./dist/scoped/TimePicker.js";
import Title from "./dist/scoped/Title.js";
import Toast from "./dist/scoped/Toast.js";
import ToggleButton from "./dist/scoped/ToggleButton.js";
import Tree from "./dist/scoped/Tree.js";

import List from "./dist/scoped/List.js";
import StandardListItem from "./dist/scoped/StandardListItem.js";
import CustomListItem from "./dist/scoped/CustomListItem.js";
import GroupHeaderListItem from "./dist/scoped/GroupHeaderListItem.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
window["sap-ui-webcomponents-bundle"] = {
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
	},
	getIconNames,
	getLocaleData,
	applyDirection,
	ResizeHandler,
};
