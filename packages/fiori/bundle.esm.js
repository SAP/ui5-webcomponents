// BASE features
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// MAIN features
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

// MAIN assets

// FIORI assets
import "./dist/json-imports/Themes.js";
import "./dist/json-imports/i18n.js";
import "./dist/json-imports/LocaleData.js" // same as above

// FIORI components
import ShellBar from "./dist/ShellBar.js";
import ShellBarItem from "./dist/ShellBarItem.js";


// MAIN components + icons
import "@ui5/webcomponents/AllIcons.js";
import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
import "@ui5/webcomponents/dist/Title.js";




// ... more MAIN components
import Badge from "@ui5/webcomponents/dist/Badge.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import CheckBox from "@ui5/webcomponents/dist/CheckBox.js";
import Card from "@ui5/webcomponents/dist/Card.js";
import DatePicker from "@ui5/webcomponents/dist/DatePicker.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Icon from "@ui5/webcomponents/dist/Icon.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import Popover from "@ui5/webcomponents/dist/Popover.js";
import Panel from "@ui5/webcomponents/dist/Panel.js";
import RadioButton from "@ui5/webcomponents/dist/RadioButton.js";
import Select from "@ui5/webcomponents/dist/Select.js";
import Option from "@ui5/webcomponents/dist/Option.js";
import Switch from "@ui5/webcomponents/dist/Switch.js";
import MessageStrip from "@ui5/webcomponents/dist/MessageStrip.js";
import MultiComboBox from "@ui5/webcomponents/dist/MultiComboBox.js";
import TabContainer from "@ui5/webcomponents/dist/TabContainer.js";
import Tab from "@ui5/webcomponents/dist/Tab.js";
import TabSeparator from "@ui5/webcomponents/dist/TabSeparator.js";
import Table from "@ui5/webcomponents/dist/Table.js";
import TableColumn from "@ui5/webcomponents/dist/TableColumn.js";
import TableRow from "@ui5/webcomponents/dist/TableRow.js";
import TableCell from "@ui5/webcomponents/dist/TableCell.js";
import TextArea from "@ui5/webcomponents/dist/TextArea.js";
import Timeline from "@ui5/webcomponents/dist/Timeline.js";
import TimelineItem from "@ui5/webcomponents/dist/TimelineItem.js";
import Title from "@ui5/webcomponents/dist/Title.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import List from "@ui5/webcomponents/dist/List.js";
import StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";
import CustomListItem from "@ui5/webcomponents/dist/CustomListItem.js";
import GroupHeaderListItem from "@ui5/webcomponents/dist/GroupHeaderListItem.js";


// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js"
window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getTheme,
		setTheme,
		setNoConflict,
		getCompactSize,
		getRTL,
		getIconNames
	}
};
