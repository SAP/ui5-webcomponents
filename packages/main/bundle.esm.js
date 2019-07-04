import "@ui5/webcomponents-base/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-base/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-base/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-base/dist/features/calendar/Persian.js";

// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

import "./dist/ThemePropertiesProvider.js";
import "./dist/MessageBundleAssets.js";
import "./dist/features/InputElementsFormSupport.js";
import "./dist/features/InputSuggestions.js";


import Badge from "./dist/Badge.js";
import BusyIndicator from "./dist/BusyIndicator.js";
import Button from "./dist/Button.js";
import CheckBox from "./dist/CheckBox.js";
import Card from "./dist/Card.js";
import DatePicker from "./dist/DatePicker.js";
import Dialog from "./dist/Dialog.js";
import Icon from "./dist/Icon.js";
import Input from "./dist/Input.js";
import Label from "./dist/Label.js";
import Link from "./dist/Link.js";
import Popover from "./dist/Popover.js";
import Panel from "./dist/Panel.js";
import RadioButton from "./dist/RadioButton.js";
import Select from "./dist/Select.js";
import ShellBar from "./dist/ShellBar.js";
import ShellBarItem from "./dist/ShellBarItem.js";
import Switch from "./dist/Switch.js";
import MessageStrip from "./dist/MessageStrip.js";
import MultiComboBox from "./dist/MultiComboBox.js";
import TabContainer from "./dist/TabContainer.js";
import Tab from "./dist/Tab.js";
import TabSeparator from "./dist/TabSeparator.js";
import Table from "./dist/Table.js";
import TextArea from "./dist/TextArea.js";
import Timeline from "./dist/Timeline.js";
import Title from "./dist/Title.js";
import ToggleButton from "./dist/ToggleButton.js";

import List from "./dist/List.js";
import StandardListItem from "./dist/StandardListItem.js";
import CustomListItem from "./dist/CustomListItem.js";
import GroupHeaderListItem from "./dist/GroupHeaderListItem.js";


// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import * as configuration from "@ui5/webcomponents-base/dist/Configuration.js";
import * as Theming from "@ui5/webcomponents-base/dist/Theming.js";
window["sap-ui-webcomponents-main-bundle"] = {
	configuration,
	Theming,
};
