import { getFeature } from "./FeaturesRegistry.js";

const LegacyInterface = getFeature("LegacyInterface");

const emptyFn = () => undefined;
const falsyFn = () => false;

const isLegacyBrowser = LegacyInterface ? LegacyInterface.isLegacyBrowser : falsyFn;
const onLegacyBoot = LegacyInterface ? LegacyInterface.onBoot : emptyFn;
const onLegacyApplyTheme = LegacyInterface ? LegacyInterface.onApplyTheme : emptyFn;
const onLegacyComponentRender = LegacyInterface ? LegacyInterface.onComponentRender : emptyFn;
const legacyObserveDOMNode = LegacyInterface ? LegacyInterface.observeDOMNode : undefined;
const legacyUnobserveDOMNode = LegacyInterface ? LegacyInterface.unobserveDOMNode : undefined;

export {
	isLegacyBrowser,
	onLegacyBoot,
	onLegacyApplyTheme,
	onLegacyComponentRender,
	legacyObserveDOMNode,
	legacyUnobserveDOMNode,
};
