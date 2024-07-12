import EventProvider from "./EventProvider";
import type UI5Element from "./UI5Element";

abstract class ComponentFeature {
	constructor(...args: any[]) {}
	static define?: () => Promise<void>;
	static dependencies?: Array<typeof UI5Element>
}

const features = new Map<string, any>();
const componentFeatures = new Map<string, ComponentFeature>();
const subscribers = new WeakSet<typeof UI5Element>();

const EVENT_NAME = "componentFeatureLoad";
const eventProvider = new EventProvider<undefined, void>();

const featureLoadEventName = (name: string) => `${EVENT_NAME}_${name}`;

const registerFeature = (name: string, feature: object) => {
	features.set(name, feature);
};

const getFeature = <T>(name: string): T => {
	return features.get(name) as T;
};

const registerComponentFeature = async (name: string, feature: typeof ComponentFeature) => {
	console.log("registerComponentFeature1")
	await Promise.all(feature.dependencies?.map(dep => dep.define()) || []);
	await feature.define?.();

	console.log("registerComponentFeature2")

	componentFeatures.set(name, feature);

	console.log("registerComponentFeature3")

	notifyForFeatureLoad(name);
};

const getComponentFeature = <T>(name: string): T => {
	return componentFeatures.get(name) as T;
};

const subscribeForFeatureLoad = (name: string, klass: typeof UI5Element) => {
	let isSubscribed = subscribers.has(klass);

	if (isSubscribed) {
		return;
	}

	subscribers.add(klass);

	eventProvider.attachEvent(featureLoadEventName(name),() => {
		console.log(featureLoadEventName(name))
		klass.cacheUniqueDependencies();
		debugger
	})
}

const notifyForFeatureLoad = (name: string) => {
	eventProvider.fireEvent(featureLoadEventName(name), undefined)
}

export {
	registerFeature,
	getFeature,
	registerComponentFeature,
	getComponentFeature,
	subscribeForFeatureLoad,
	ComponentFeature
};