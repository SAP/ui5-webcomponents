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

// const bg = "https://sdk.openui5.org/resources/sap/ui/core/messagebundle_bg.properties";
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
import TreeList from "./dist/TreeList.js";
import TreeItem from "./dist/TreeItem.js";
import TreeItemCustom from "./dist/TreeItemCustom.js";

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
// or for custom theme
// setDefaultIconCollection("my_custom_theme", "SAP-icons-v5");
// or for custom icon collection
// setDefaultIconCollection("sap_fiori_3", "my-custom-icons");

import {registerIconLoader } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
registerIconLoader("my-custom-icons", () => {
	return {
		"collection": "my-custom-icons",
		"data": {
			"mark": {
				paths: [
					`M514,514c-170.7,0-341.3,0-512,0C2,343.4,2,172.7,2,2c170.7,0,341.3,0,512,0C514,172.7,514,343.4,514,514z M257.6,6.4C119.5,6.2,7,117.9,6.5,255.8C6,394.1,118.3,507.2,256.5,507.5c137.8,0.3,250.6-111.9,251.1-249.6C508.1,119.4,395.9,6.6,257.6,6.4z`,
						`M257.6,6.4c138.3,0.2,250.5,113.1,250,251.6c-0.5,137.7-113.3,249.9-251.1,249.6C118.3,507.2,6,394.1,6.5,255.8
						C7,117.9,119.5,6.2,257.6,6.4z M256.6,358.8c0.3,4.2,0.6,7.6,0.7,10.9c0.2,27.6,0.3,55.3,0.4,82.9c0,15.1-4.2,18.9-19.1,17.6
						C127,461,41.4,366.1,42.9,253.3C44.3,141.9,133.4,49.1,244.6,43c102.4-5.6,194.8,61.7,219.9,160.4
						C490,303.1,441.8,406,348.6,450.5c-3.7,1.8-7.8,2.9-11,5.4c-1.9,1.5-3.8,5.5-3.1,7.4c0.7,1.8,5,3.7,7.2,3.2
						c4.6-0.9,9-3.2,13.3-5.2C454,414,504.5,302,474.9,195.8C445.3,90,344.1,21.3,234.1,32.3C103.7,45.4,11.8,166.1,34.1,295.2
						C51.8,397.9,133.3,472.6,238.6,483c4.9,0.5,10,3.2,14.2,6c7.2,4.9,14.2,5.7,20.5-0.2c6.4-6,5.9-12.9,1.2-20.3
						c-2.5-4-4.7-9.1-4.8-13.7c-0.7-29.3-0.6-58.7-1.3-88c-0.2-8.2,2.4-12.5,10-16.3c25.9-13,39.5-40.1,35.9-68.8
						c-3.6-28-23.8-50.9-51.4-57.2c-6.9-1.6-14.2-1.8-21.3-2.5c-29.7-3.1-50.5-27.4-49.2-57.7c1.1-27.7,24.6-50.7,52.7-51.4
						c29.4-0.8,53.7,20.6,56.4,49.7c0.3,3.6,0.7,7.3,1.1,12c13.2,0,25.4-0.2,37.7,0c41.2,0.7,77.3,31.4,83.3,71
						c6.5,42.3-17,81.8-56.6,95.6c-6.2,2.2-11.4,3.7-17.4-2.5c-6.8-7-18.6-4.6-24.4,3.1c-5.7,7.5-4.6,17.8,2.5,24
						c7.1,6.1,17.1,5.2,24.3-0.9c4.9-4.1,10.5-8.1,16.5-10c40.8-13.1,69.4-51.2,69.7-93.9c0.3-42.2-27.1-81.6-67.6-94
						c-13.7-4.2-28.8-4.7-43.4-5.2c-9-0.3-12.6-2.4-14.9-11.7c-9.4-37.2-47.8-58.3-84.7-47.5c-36,10.6-56.6,49.1-45.4,85.3
						c8.9,29,32.5,45.8,67.7,48c23.5,1.5,42.5,16.3,49.3,38.3c6.8,21.9-0.6,45.7-18.8,59.6c-3,2.3-6.6,4-11.3,6.8
						c-0.3-5.7-0.6-9.4-0.8-13c-1.7-27.1-21.1-50.3-47.4-56.2c-7-1.5-14.3-1.4-21.3-2.6c-21.4-3.4-38.3-13.7-49.2-32.9
						c-3.2-5.7-3.7-10.4,1.4-16.5c3.4-4,4.5-12.6,2.5-17.5c-1.7-4.3-9.3-9-14-8.8c-5.3,0.2-10.6,5.4-15.3,9.2c-3.7,3-6,8.1-10,10.5
						c-27.5,16.8-43.1,48.1-38.5,78c6.4,40.8,37.8,68,79.4,68.2C189.1,359,222.2,358.8,256.6,358.8z`,
						`M256.6,358.8c-34.4,0-67.5,0.1-100.6,0c-41.5-0.2-73-27.4-79.4-68.2c-4.7-29.9,11-61.3,38.5-78
						c4-2.4,6.2-7.5,10-10.5c4.7-3.8,10.1-9,15.3-9.2c4.8-0.2,12.3,4.5,14,8.8c2,4.9,0.8,13.5-2.5,17.5c-5.1,6.1-4.7,10.7-1.4,16.5
						c10.8,19.2,27.8,29.5,49.2,32.9c7.1,1.1,14.4,1,21.3,2.6c26.3,5.9,45.7,29.1,47.4,56.2c0.2,3.7,0.4,7.3,0.8,13
						c4.7-2.8,8.2-4.4,11.3-6.8c18.2-13.9,25.6-37.7,18.8-59.6c-6.8-22-25.8-36.8-49.3-38.3c-35.2-2.3-58.8-19.1-67.7-48
						c-11.1-36.2,9.4-74.7,45.4-85.3c36.9-10.8,75.3,10.3,84.7,47.5c2.3,9.2,6,11.4,14.9,11.7c14.5,0.5,29.6,1,43.4,5.2
						c40.5,12.5,67.9,51.8,67.6,94c-0.3,42.7-28.9,80.8-69.7,93.9c-6,1.9-11.7,5.9-16.5,10c-7.2,6.1-17.2,7-24.3,0.9
						c-7.1-6.2-8.2-16.5-2.5-24c5.8-7.6,17.6-10.1,24.4-3.1c6,6.2,11.2,4.6,17.4,2.5c39.6-13.8,63.1-53.3,56.6-95.6
						c-6-39.6-42.1-70.4-83.3-71c-12.2-0.2-24.5,0-37.7,0c-0.4-4.7-0.8-8.4-1.1-12c-2.7-29.1-27-50.5-56.4-49.7
						c-28,0.8-51.5,23.7-52.7,51.4c-1.2,30.3,19.5,54.6,49.2,57.7c7.1,0.7,14.4,0.9,21.3,2.5c27.5,6.4,47.8,29.2,51.4,57.2
						c3.7,28.8-9.9,55.9-35.9,68.8c-7.6,3.8-10.2,8.1-10,16.3c0.7,29.3,0.6,58.7,1.3,88c0.1,4.6,2.3,9.7,4.8,13.7
						c4.7,7.4,5.2,14.3-1.2,20.3c-6.4,5.9-13.3,5.1-20.5,0.2c-4.2-2.8-9.3-5.5-14.2-6C133.3,472.6,51.8,397.9,34.1,295.2
						c-22.3-129.1,69.6-249.8,200-262.9c110.1-11,211.2,57.7,240.8,163.5C504.5,302,454,414,355.1,461.3c-4.3,2.1-8.7,4.3-13.3,5.2
						c-2.2,0.5-6.5-1.4-7.2-3.2c-0.7-1.9,1.1-5.9,3.1-7.4c3.1-2.5,7.3-3.6,11-5.4C441.8,406,490,303.1,464.6,203.4
						C439.4,104.7,347,37.4,244.6,43C133.4,49.1,44.3,141.9,42.9,253.3C41.4,366.1,127,461,238.5,470.3c14.9,1.2,19.1-2.6,19.1-17.6
						c-0.1-27.6-0.2-55.3-0.4-82.9C257.3,366.4,256.9,363,256.6,358.8z M198.8,345.6c0-0.1,0-0.2,0-0.3c16.4,0,32.7-0.1,49.1,0
						c6.8,0,9.7-2.7,9.4-9.9c-0.5-12.9-2.9-25-11.2-35.4c-11.1-13.8-25.9-18.9-43.1-19.7c-30.9-1.4-56.7-21.1-66.7-50.3
						c-3.2-9.1-6.6-10.4-15.2-5.4c-24.2,13.9-36.8,43.9-29.9,71.4c7,28.3,32.2,48.7,61.7,49.5C168.1,346,183.5,345.6,198.8,345.6z`,
						`M198.8,345.6c-15.3,0-30.7,0.3-46-0.1c-29.4-0.8-54.7-21.3-61.7-49.5c-6.8-27.5,5.8-57.5,29.9-71.4
						c8.6-4.9,12.1-3.7,15.2,5.4c10.1,29.1,35.8,48.8,66.7,50.3c17.2,0.8,32.1,5.9,43.1,19.7c8.3,10.4,10.8,22.5,11.2,35.4
						c0.3,7.1-2.6,9.9-9.4,9.9c-16.4-0.1-32.7,0-49.1,0C198.8,345.4,198.8,345.5,198.8,345.6z`,
				]
			}
		}
	}
});


window["sap-ui-webcomponents-bundle"] = testAssets;

export default testAssets;
