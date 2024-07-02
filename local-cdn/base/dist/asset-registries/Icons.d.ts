import type { I18nText } from "../i18nBundle.js";
import type { TemplateFunction } from "../renderer/executeTemplate.js";
type IconLoader = (collectionName: string) => Promise<CollectionData | Array<CollectionData>>;
type CollectionData = {
    collection: string;
    packageName: string;
    themeFamily?: "legacy" | "sap_horizon";
    version?: string;
    data: Record<string, {
        path?: string;
        paths?: Array<string>;
        ltr?: boolean;
        acc?: I18nText;
    }>;
};
type IconData = {
    collection: string;
    packageName: string;
    pathData: string | Array<string>;
    ltr?: boolean;
    accData?: I18nText;
    customTemplate?: TemplateFunction;
    viewBox?: string;
};
declare const registerIconLoader: (collectionName: string, loader: IconLoader) => void;
declare const registerIcon: (name: string, iconData: IconData) => void;
declare const getIconDataSync: (iconName: string) => IconData | undefined;
declare const getIconData: (iconName: string) => Promise<IconData | "ICON_NOT_FOUND" | undefined>;
/**
 * Returns the accessible name for the given icon,
 * or undefined if accessible name is not present.
 *
 * @param { string } name
 * @return { Promise }
 */
declare const getIconAccessibleName: (name: string) => Promise<string | undefined>;
declare const _getRegisteredNames: () => Promise<string[]>;
export { registerIconLoader, getIconData, getIconDataSync, getIconAccessibleName, registerIcon, _getRegisteredNames, };
export type { IconData, CollectionData, };
