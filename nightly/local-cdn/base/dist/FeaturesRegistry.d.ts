import type UI5Element from "./UI5Element.js";
declare abstract class ComponentFeature {
    constructor(...args: any[]);
    /**
     * @deprecated assign the feature's "i18nBundle" static member directly from the component that uses the feature
     */
    static define?: () => Promise<void>;
    static dependencies?: Array<typeof UI5Element>;
}
declare const registerFeature: (name: string, feature: object) => void;
declare const getFeature: <T>(name: string) => T;
declare const registerComponentFeature: (name: string, feature: typeof ComponentFeature) => Promise<void>;
declare const getComponentFeature: <T>(name: string) => T;
declare const subscribeForFeatureLoad: (name: string, klass: typeof UI5Element, callback: () => void) => void;
export { registerFeature, getFeature, registerComponentFeature, getComponentFeature, subscribeForFeatureLoad, ComponentFeature, };
