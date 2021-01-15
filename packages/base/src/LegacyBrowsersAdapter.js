import { getFeature } from "./FeaturesRegistry.js";

const LegacyInterface = getFeature("LegacyInterface");

const emptyFn = () => undefined;
const falsyFn = () => false;

const isLegacyBrowser = LegacyInterface ? LegacyInterface.isLegacyBrowser : falsyFn;
const LegacyDOMObserver = LegacyInterface ? LegacyInterface.DOMObserver : undefined;
const onLegacyBoot = LegacyInterface ? LegacyInterface.onBoot : emptyFn;
const onLegacyApplyTheme = LegacyInterface ? LegacyInterface.onApplyTheme : emptyFn;
const onLegacyComponentRender = LegacyInterface ? LegacyInterface.onComponentRender : emptyFn;

export {
	isLegacyBrowser,
	LegacyDOMObserver,
	onLegacyBoot,
	onLegacyApplyTheme,
	onLegacyComponentRender,
};
