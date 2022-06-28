import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming.js";
// import "./customI18n.js";

import "./bundle.common.bootstrap.js"; // code that needs to be executed before other modules

// Calendars
import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";

// CLDR
import getLocaleData from "@ui5/webcomponents-localization/dist/locale/getLocaleData.js";

// Uncomment to test the registration of custom properties and JSON bundles - use the TextArea test page
// import { registerI18nLoader } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
// import parse from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";

// const bg = "https://ui5.sap.com/resources/sap/ui/core/messagebundle_bg.properties";
// registerI18nLoader("@ui5/webcomponents", "bg", async (localeId) => {
// 	const props = await (await fetch(bg)).text();
// 	return parse(props);
// });
// registerI18nLoader("@ui5/webcomponents", "fr", async (localeId) => {
// 	return await (await fetch("fr")).json();
// });

import "./dist/features/InputElementsFormSupport.js";
import "./dist/features/InputSuggestions.js";
import "./dist/features/ColorPaletteMoreColors.js";

import Avatar from "./dist/Avatar.js";
import AvatarGroup from "./dist/AvatarGroup.js";
import Badge from "./dist/Badge.js";
import Breadcrumbs from "./dist/Breadcrumbs.js";
import BusyIndicator from "./dist/BusyIndicator.js";
import Button from "./dist/Button.js";
import Card from "./dist/Card.js";
import CardHeader from "./dist/CardHeader.js";
import Carousel from "./dist/Carousel.js";
import CheckBox from "./dist/CheckBox.js";
import ColorPalette from "./dist/ColorPalette.js";
import ColorPaletteItem from "./dist/ColorPaletteItem.js";
import ColorPalettePopover from "./dist/ColorPalettePopover.js";
import ColorPicker from "./dist/ColorPicker.js";
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
import Menu from "./dist/Menu.js";
import MenuItem from "./dist/MenuItem.js";
import Popover from "./dist/Popover.js";
import Panel from "./dist/Panel.js";
import RadioButton from "./dist/RadioButton.js";
import ResponsivePopover from "./dist/ResponsivePopover.js";
import SegmentedButton from "./dist/SegmentedButton.js";
import SegmentedButtonItem from "./dist/SegmentedButtonItem.js";
import Select from "./dist/Select.js";
import Slider from "./dist/Slider.js";
import SplitButton from "./dist/SplitButton.js";
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
import TableGroupRow from "./dist/TableGroupRow.js";
import TableCell from "./dist/TableCell.js";
import TextArea from "./dist/TextArea.js";
import TimeSelection from "./dist/TimeSelection.js";
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
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";

import { sanitizeHTML, URLListValidator } from "@ui5/webcomponents-base/dist/util/HTMLSanitizer.js";
window.sanitizeHTML = sanitizeHTML;
window.URLListValidator = URLListValidator;

import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { _getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import { attachDirectionChange } from "@ui5/webcomponents-base/dist/locale/directionChange.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import * as defaultTexts from "./dist/generated/i18n/i18n-defaults.js";
import announce from "@ui5/webcomponents-base/dist/util/InvisibleMessage.js";

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
	},
	invisibleMessage : {
		announce,
	},
	getLocaleData,
	applyDirection,
	attachDirectionChange,
	ResizeHandler,
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,
	getIconNames,
	renderFinished,
	defaultTexts,
};

// The SAP Icons V4 icon collection is set by default in sap_fiori_3,
// but it's configurable:
// import { setDefaultIconCollection } from  "@ui5/webcomponents-base/dist/config/Icons.js";
// setDefaultIconCollection("sap_fiori_3", "SAP-icons-v5");
// or
// setDefaultIconCollection("sap_fiori_3", "horizon");
// or for custom theme
// setDefaultIconCollection("my_custom_theme", "SAP-icons-v5");

window["sap-ui-webcomponents-bundle"] = testAssets;

export default testAssets;
