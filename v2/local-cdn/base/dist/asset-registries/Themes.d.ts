import type { StyleData, StyleDataCSP } from "../ManagedStyles.js";
type ThemeData = {
    _: StyleDataCSP;
} | StyleDataCSP | string;
type ThemeLoader = (themeName: string) => Promise<ThemeData>;
declare const registerThemePropertiesLoader: (packageName: string, themeName: string, loader: ThemeLoader) => void;
declare const registerCustomThemePropertiesLoader: (packageName: string, themeName: string, loader: ThemeLoader) => void;
declare const getThemeProperties: (packageName: string, themeName: string, externalThemeName?: string) => Promise<StyleData | undefined>;
declare const getRegisteredPackages: () => Set<string>;
declare const isThemeRegistered: (theme: string) => boolean;
export { registerThemePropertiesLoader, registerCustomThemePropertiesLoader, getThemeProperties, getRegisteredPackages, isThemeRegistered, };
export type { ThemeData, ThemeLoader, };
