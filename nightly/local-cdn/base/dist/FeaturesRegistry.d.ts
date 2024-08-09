import type UI5Element from "./UI5Element.js";
declare abstract class ComponentFeature {
    constructor(...args: any[]);
    static define?: () => Promise<void>;
    static dependencies?: Array<typeof UI5Element>;
}
declare const registerFeature: (name: string, feature: object) => void;
declare const getFeature: <T>(name: string) => T;
declare const registerComponentFeature: (name: string, feature: typeof ComponentFeature) => Promise<void>;
declare const getComponentFeature: <T>(name: string) => T;
declare const subscribeForFeatureLoad: (name: string, klass: typeof UI5Element, callback: () => void) => void;
export { registerFeature, getFeature, registerComponentFeature, getComponentFeature, subscribeForFeatureLoad, ComponentFeature, };
