import { getAssetsPath, setAssetsPath } from "@ui5/webcomponents-base/dist/config/AssetsPath.js";
// setAssetsPath("/my-resources/");

import { addCustomCSS, attachThemeLoaded, detachThemeLoaded } from "@ui5/webcomponents-base/dist/Theming";


// Calendars
import "@ui5/webcomponents-localization/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/features/calendar/Persian.js";

// CLDR
import getLocaleData from "@ui5/webcomponents-localization/locale/getLocaleData.js";

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

import "./features/InputElementsFormSupport.js";
import "./features/InputSuggestions.js";
import "./features/ColorPaletteMoreColors.js";

import Avatar from "./Avatar.js";
import AvatarGroup from "./AvatarGroup.js";
import Badge from "./Badge.js";
import BusyIndicator from "./BusyIndicator.js";
import Button from "./Button.js";
import Card from "./Card.js";
import Carousel from "./Carousel.js";
import CheckBox from "./CheckBox.js";
import ColorPalette from "./ColorPalette.js";
import ColorPaletteItem from "./ColorPaletteItem.js";
import ColorPicker from "./ColorPicker.js";
import ComboBox from "./ComboBox.js";
import DatePicker from "./DatePicker.js";
import DateRangePicker from "./DateRangePicker.js";
import DateTimePicker from "./DateTimePicker.js";
import DurationPicker from "./DurationPicker.js";
import Dialog from "./Dialog.js";
import FileUploader from "./FileUploader.js";
import Icon from "./Icon.js";
import Input from "./Input.js";
import MultiInput from "./MultiInput.js";
import Label from "./Label.js";
import Link from "./Link.js";
import Popover from "./Popover.js";
import Panel from "./Panel.js";
import RadioButton from "./RadioButton.js";
import ResponsivePopover from "./ResponsivePopover.js";
import SegmentedButton from "./SegmentedButton.js";
import Select from "./Select.js";
import Slider from "./Slider.js";
import StepInput from "./StepInput.js";
import RangeSlider from "./RangeSlider.js";
import Switch from "./Switch.js";
import MessageStrip from "./MessageStrip.js";
import MultiComboBox from "./MultiComboBox.js";
import ProgressIndicator from "./ProgressIndicator.js";
import RatingIndicator from "./RatingIndicator.js";
import TabContainer from "./TabContainer.js";
import Tab from "./Tab.js";
import TabSeparator from "./TabSeparator.js";
import Table from "./Table.js";
import TableColumn from "./TableColumn.js";
import TableRow from "./TableRow.js";
import TableCell from "./TableCell.js";
import TextArea from "./TextArea.js";
import TimeSelection from "./TimeSelection.js";
import TimePicker from "./TimePicker.js";
import Title from "./Title.js";
import Toast from "./Toast.js";
import ToggleButton from "./ToggleButton.js";
import Tree from "./Tree.js";

import List from "./List.js";
import StandardListItem from "./StandardListItem.js";
import CustomListItem from "./CustomListItem.js";
import GroupHeaderListItem from "./GroupHeaderListItem.js";

// used in test pages
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isIE } from "@ui5/webcomponents-base/dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes

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
import * as defaultTexts from "./generated/i18n/i18n-defaults.js";

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
	attachDirectionChange,
	ResizeHandler,
	addCustomCSS,
	attachThemeLoaded,
	detachThemeLoaded,
	getIconNames,
	renderFinished,
	defaultTexts,
};

window["sap-ui-webcomponents-bundle"] = testAssets;

export default testAssets;
