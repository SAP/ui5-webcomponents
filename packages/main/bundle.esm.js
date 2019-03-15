// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/browsersupport/Edge";

import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/shims/jquery-shim";
import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/events/PolymerGestures";

import Gregorian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Gregorian";
import Buddhist from "@ui5/webcomponents-core/dist/sap/ui/core/date/Buddhist";
import Islamic from "@ui5/webcomponents-core/dist/sap/ui/core/date/Islamic";
import Japanese from "@ui5/webcomponents-core/dist/sap/ui/core/date/Japanese";
import Persian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Persian";

import Button from "./dist/Button";
import CheckBox from "./dist/CheckBox";
import Card from "./dist/Card";
import Calendar from "./dist/Calendar";
import CalendarHeader from "./dist/CalendarHeader";
import DatePicker from "./dist/DatePicker";
import Dialog from "./dist/Dialog";
import Icon from "./dist/Icon";
import Input from "./dist/Input";
import InputSuggestions from "./dist/InputSuggestions";
import Label from "./dist/Label";
import Link from "./dist/Link";
import DayPicker from "./dist/DayPicker";
import Popover from "./dist/Popover";
import Panel from "./dist/Panel";
import RadioButton from "./dist/RadioButton";
import Select from "./dist/Select";
import ShellBar from "./dist/ShellBar";
import ShellBarItem from "./dist/ShellBarItem";
import Switch from "./dist/Switch";
import MessageStrip from "./dist/MessageStrip";
import TabContainer from "./dist/TabContainer";
import Tab from "./dist/Tab";
import TabSeparator from "./dist/TabSeparator";
import Table from "./dist/Table";
import TableColumn from "./dist/TableColumn";
import TableRow from "./dist/TableRow";
import TableCell from "./dist/TableCell";
import TextArea from "./dist/TextArea";
import Timeline from "./dist/Timeline";
import TimelineItem from "./dist/TimelineItem";
import Title from "./dist/Title";
import ToggleButton from "./dist/ToggleButton";
import Toolbar from "./dist/Toolbar";
import ToolbarSpacer from "./dist/ToolbarSpacer";

import List from "./dist/List";
import StandardListItem from "./dist/StandardListItem";
import CustomListItem from "./dist/CustomListItem";
import GroupHeaderListItem from "./dist/GroupHeaderListItem";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/RenderScheduler";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import * as configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import * as Theming from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Theming";
window["sap-ui-webcomponents-main-bundle"] = {
	configuration,
	Theming,
};