import EventProvider from "./EventProvider.js";
class ComponentFeature {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function
    constructor(...args) { }
}
const features = new Map();
const componentFeatures = new Map();
const subscribers = new Map();
const EVENT_NAME = "componentFeatureLoad";
const eventProvider = new EventProvider();
const featureLoadEventName = (name) => `${EVENT_NAME}_${name}`;
const registerFeature = (name, feature) => {
    features.set(name, feature);
};
const getFeature = (name) => {
    return features.get(name);
};
const registerComponentFeature = async (name, feature) => {
    await Promise.all(feature.dependencies?.map(dep => dep.define()) || []);
    await feature.define?.();
    componentFeatures.set(name, feature);
    notifyForFeatureLoad(name);
};
const getComponentFeature = (name) => {
    return componentFeatures.get(name);
};
const subscribeForFeatureLoad = (name, klass, callback) => {
    const subscriber = subscribers.get(klass);
    const isSubscribed = subscriber?.includes(name);
    if (isSubscribed) {
        return;
    }
    if (!subscriber) {
        subscribers.set(klass, [name]);
    }
    else {
        subscriber.push(name);
    }
    eventProvider.attachEvent(featureLoadEventName(name), callback);
};
const notifyForFeatureLoad = (name) => {
    eventProvider.fireEvent(featureLoadEventName(name), undefined);
};
export { registerFeature, getFeature, registerComponentFeature, getComponentFeature, subscribeForFeatureLoad, ComponentFeature, };
//# sourceMappingURL=FeaturesRegistry.js.map