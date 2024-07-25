import EventProvider from "./EventProvider.js";
import type UI5Element from "./UI5Element.js";

abstract class ComponentFeature {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function
	constructor(...args: any[]) {}
	static define?: () => Promise<void>;
	static dependencies?: Array<typeof UI5Element>
}

const features = new Map<string, any>();
const componentFeatures = new Map<string, ComponentFeature>();
const subscribers = new Map<typeof UI5Element, Array<string>>();

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
	await Promise.all(feature.dependencies?.map(dep => dep.define()) || []);
	await feature.define?.();

	componentFeatures.set(name, feature);
	notifyForFeatureLoad(name);
};

const getComponentFeature = <T>(name: string): T => {
	return componentFeatures.get(name) as T;
};

const subscribeForFeatureLoad = (name: string, klass: typeof UI5Element, callback: () => void) => {
	const subscriber = subscribers.get(klass);
	const isSubscribed = subscriber?.includes(name);

	if (isSubscribed) {
		return;
	}

	if (!subscriber) {
		subscribers.set(klass, [name]);
	} else {
		subscriber.push(name);
	}

	eventProvider.attachEvent(featureLoadEventName(name), callback);
};

const notifyForFeatureLoad = (name: string) => {
	eventProvider.fireEvent(featureLoadEventName(name), undefined);
};

export {
	registerFeature,
	getFeature,
	registerComponentFeature,
	getComponentFeature,
	subscribeForFeatureLoad,
	ComponentFeature,
};
