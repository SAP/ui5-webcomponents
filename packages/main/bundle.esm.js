import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/shims/jquery-shim";
import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/events/PolymerGestures";
import "./src/ThemeProvider";

import Gregorian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Gregorian";
import Buddhist from "@ui5/webcomponents-core/dist/sap/ui/core/date/Buddhist";
import Islamic from "@ui5/webcomponents-core/dist/sap/ui/core/date/Islamic";
import Japanese from "@ui5/webcomponents-core/dist/sap/ui/core/date/Japanese";
import Persian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Persian";

import Button from "./src/Button";
import CheckBox from "./src/CheckBox";
import Card from "./src/Card";
import Calendar from "./src/Calendar";
import CalendarHeader from "./src/CalendarHeader";
import DatePicker from "./src/DatePicker";
import Dialog from "./src/Dialog";
import Icon from "./src/Icon";
import Input from "./src/Input";
import InputSuggestions from "./src/InputSuggestions";
import Label from "./src/Label";
import Link from "./src/Link";
import DayPicker from "./src/DayPicker";
import Popover from "./src/Popover";
import Panel from "./src/Panel";
import RadioButton from "./src/RadioButton";
import Select from "./src/Select";
import ShellBar from "./src/ShellBar";
import ShellBarItem from "./src/ShellBarItem";
import TabContainer from "./src/TabContainer";
import Tab from "./src/Tab";
import TabSeparator from "./src/TabSeparator";
import Table from "./src/Table";
import TableColumn from "./src/TableColumn";
import TableRow from "./src/TableRow";
import TableCell from "./src/TableCell";
import TextArea from "./src/TextArea";
import Timeline from "./src/Timeline";
import TimelineItem from "./src/TimelineItem";
import Title from "./src/Title";
import ToggleButton from "./src/ToggleButton";
import Toolbar from "./src/Toolbar";
import ToolbarSpacer from "./src/ToolbarSpacer";

import List from "./src/List";
import StandardListItem from "./src/StandardListItem";
import CustomListItem from "./src/CustomListItem";
import GroupHeaderListItem from "./src/GroupHeaderListItem";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/RenderScheduler";
window.RenderScheduler = RenderScheduler;
import Device from "@ui5/webcomponents-core/dist/sap/ui/Device";
window.sapUiDevice = Device;


// Note: keep in sync with rollup.config value for IIFE
import * as configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import * as Theming from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Theming";
window["sap-ui-webcomponents-main-bundle"] = {
	configuration,
	Theming,
};