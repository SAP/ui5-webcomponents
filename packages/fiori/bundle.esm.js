import testAssets from "@ui5/webcomponents/bundle.esm.js";
import * as defaultFioriTexts from "./dist/generated/i18n/i18n-defaults.js";

// FIORI assets
import "./dist/Assets.js";

// FIORI features
import "./dist/features/CoPilotAnimation.js";

// FIORI components
import Bar from "./dist/Bar.js";
import FlexibleColumnLayout from "./dist/FlexibleColumnLayout.js";
import ProductSwitch from "./dist/ProductSwitch.js";
import ProductSwitchItem from "./dist/ProductSwitchItem.js";
import SideNavigation from "./dist/SideNavigation.js";
import SideNavigationItem from "./dist/SideNavigationItem.js";
import SideNavigationSubItem from "./dist/SideNavigationSubItem.js";
import Page from "./dist/Page.js";
import ShellBar from "./dist/ShellBar.js";
import ShellBarItem from "./dist/ShellBarItem.js";
import Timeline from "./dist/Timeline.js";
import UploadCollection from "./dist/UploadCollection.js";
import UploadCollectionItem from "./dist/UploadCollectionItem.js";
import NotificationListItem from "./dist/NotificationListItem.js"
import NotificationListGroupItem from "./dist/NotificationListGroupItem.js";
import NotificationAction from "./dist/NotificationAction.js";
import Wizard from "./dist/Wizard.js";
import ViewSettingsDialog from "./dist/ViewSettingsDialog.js";
import FilterItem from "./dist/FilterItem.js";
import FilterItemOption from "./dist/FilterItemOption.js";

testAssets.defaultTexts = {...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
