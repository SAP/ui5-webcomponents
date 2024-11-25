/* eslint-disable @typescript-eslint/no-unused-vars */
import testAssets from "@ui5/webcomponents/dist/bundle.esm.js";
import * as defaultFioriTexts from "./generated/i18n/i18n-defaults.js";

// FIORI assets
import "./Assets.js";

// FIORI illustrations
import "./illustrations/AllIllustrations.js";

// FIORI components
import BarcodeScannerDialog from "./BarcodeScannerDialog.js";
import DynamicPage from "./DynamicPage.js";
import DynamicPageHeader from "./DynamicPageHeader.js";
import DynamicPageTitle from "./DynamicPageTitle.js";
import DynamicPageHeaderActions from "./DynamicPageHeaderActions.js";
import DynamicSideContent from "./DynamicSideContent.js";
import FilterItem from "./FilterItem.js";
import FilterItemOption from "./FilterItemOption.js";
import FlexibleColumnLayout from "./FlexibleColumnLayout.js";
import IllustratedMessage from "./IllustratedMessage.js";
import MediaGallery from "./MediaGallery.js";
import MediaGalleryItem from "./MediaGalleryItem.js";
import NotificationListGroupItem from "./NotificationListGroupItem.js";
import NotificationListItem from "./NotificationListItem.js";
import NotificationList from "./NotificationList.js";
import Page from "./Page.js";
import ProductSwitch from "./ProductSwitch.js";
import ProductSwitchItem from "./ProductSwitchItem.js";
import ShellBar from "./ShellBar.js";
import SearchField from "./SearchField.js";
import SearchFieldScopeOption from "./SearchFieldScopeOption.js";
import Search from "./Search.js";
import SearchItem from "./SearchItem.js";
import SearchItemGroup from "./SearchItemGroup.js";
import ShellBarItem from "./ShellBarItem.js";
import SideNavigation from "./SideNavigation.js";
import SideNavigationItem from "./SideNavigationItem.js";
import SideNavigationSubItem from "./SideNavigationSubItem.js";
import SortItem from "./SortItem.js";
import Timeline from "./Timeline.js";
import NavigationLayout from "./NavigationLayout.js";
import UploadCollection from "./UploadCollection.js";
import UploadCollectionItem from "./UploadCollectionItem.js";
import ViewSettingsDialog from "./ViewSettingsDialog.js";
import Wizard from "./Wizard.js";

testAssets.defaultTexts = { ...testAssets.defaultTexts, ...defaultFioriTexts };
export default testAssets;
