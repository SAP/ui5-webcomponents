// import "@ui5/webcomponents-base/test/dev-helpers/ExternalThemePresent.js";

import { registerCustomTheme } from "@ui5/webcomponents-base/dist/AssetRegistry.js";

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

// asset helpers (needs correct json as url in rollup.config.js)
import "./dist/Assets.js";

import "./dist/features/InputElementsFormSupport.js";
import "./dist/features/InputSuggestions.js";

import Avatar from "./dist/Avatar.js";
import Badge from "./dist/Badge.js";
import BusyIndicator from "./dist/BusyIndicator.js";
import Button from "./dist/Button.js";
import Card from "./dist/Card.js";
import Carousel from "./dist/Carousel.js";
import CheckBox from "./dist/CheckBox.js";
import ComboBox from "./dist/ComboBox.js";
import ComboBoxItem from "./dist/ComboBoxItem.js";
import MultiComboBoxItem from "./dist/MultiComboBoxItem.js";
import DatePicker from "./dist/DatePicker.js";
import DateTimePicker from "./dist/DateTimePicker.js";
import DurationPicker from "./dist/DurationPicker.js";
import Dialog from "./dist/Dialog.js";
import FileUploader from "./dist/FileUploader.js";
import Icon from "./dist/Icon.js";
import Input from "./dist/Input.js";
import Label from "./dist/Label.js";
import Link from "./dist/Link.js";
import Popover from "./dist/Popover.js";
import Panel from "./dist/Panel.js";
import RadioButton from "./dist/RadioButton.js";
import ResponsivePopover from "./dist/ResponsivePopover.js";
import SuggestionItem from "./dist/SuggestionItem.js";
import SegmentedButton from "./dist/SegmentedButton.js";
import Select from "./dist/Select.js";
import Option from "./dist/Option.js";
import Switch from "./dist/Switch.js";
import MessageStrip from "./dist/MessageStrip.js";
import MultiComboBox from "./dist/MultiComboBox.js";
import TabContainer from "./dist/TabContainer.js";
import Tab from "./dist/Tab.js";
import TabSeparator from "./dist/TabSeparator.js";
import Table from "./dist/Table.js";
import TableColumn from "./dist/TableColumn.js";
import TableRow from "./dist/TableRow.js";
import TableCell from "./dist/TableCell.js";
import TextArea from "./dist/TextArea.js";
import Timeline from "./dist/Timeline.js";
import TimelineItem from "./dist/TimelineItem.js";
import TimePicker from "./dist/TimePicker.js";
import Title from "./dist/Title.js";
import Toast from "./dist/Toast.js";
import ToggleButton from "./dist/ToggleButton.js";



import List from "./dist/List.js";
import StandardListItem from "./dist/StandardListItem.js";
import CustomListItem from "./dist/CustomListItem.js";
import GroupHeaderListItem from "./dist/GroupHeaderListItem.js";



// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js"
window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getAnimationMode,
		getTheme,
		setTheme,
		setNoConflict,
		getRTL,
		getFirstDayOfWeek,
	},
	getIconNames,
	getLocaleData,
};

registerCustomTheme("my_custom_theme", "sap_belize_hcw", "head>link#my_custom_theme");
