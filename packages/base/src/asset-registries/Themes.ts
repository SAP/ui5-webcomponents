import { DEFAULT_THEME } from "../generated/AssetParameters.js";
import { StyleData, StyleDataCSP } from "../types.js";
import { fireThemeRegistered } from "../theming/ThemeRegistered.js";

type ThemeData = {_: StyleDataCSP } | StyleDataCSP | string;
type ThemeLoader = (themeName: string) => Promise<ThemeData>;

const themeStyles = new Map<string, StyleData>();
const loaders = new Map<string, ThemeLoader>();
const registeredPackages = new Set<string>();
const registeredThemes = new Set<string>();

const registerThemePropertiesLoader = (packageName: string, themeName: string, loader: ThemeLoader) => {
	loaders.set(`${packageName}/${themeName}`, loader);
	registeredPackages.add(packageName);
	registeredThemes.add(themeName);
	fireThemeRegistered(themeName);
};

const getThemeProperties = async (packageName: string, themeName: string) => {
	const style = themeStyles.get(`${packageName}_${themeName}`);
	if (style !== undefined) { // it's valid for style to be an empty string
		return style;
	}

	if (!registeredThemes.has(themeName)) {
		const regThemesStr = [...registeredThemes.values()].join(", ");
		console.warn(`You have requested a non-registered theme ${themeName} - falling back to ${DEFAULT_THEME}. Registered themes are: ${regThemesStr}`); /* eslint-disable-line */
		return _getThemeProperties(packageName, DEFAULT_THEME);
	}

	return _getThemeProperties(packageName, themeName);
};

const _getThemeProperties = async (packageName: string, themeName: string) => {
	const loader = loaders.get(`${packageName}/${themeName}`);
	if (!loader) {
		// no themes for package
		console.error(`Theme [${themeName}] not registered for package [${packageName}]`); /* eslint-disable-line */
		return;
	}
	let data;
	try {
		data = await loader(themeName);
	} catch (error: unknown) {
		const e = error as Error;
		console.error(packageName, e.message); /* eslint-disable-line */
		return;
	}
	const themeProps = (data as {_: StyleDataCSP})._ || data; // Refactor: remove _ everywhere

	themeStyles.set(`${packageName}_${themeName}`, themeProps);
	return themeProps;
};

const getRegisteredPackages = () => {
	return registeredPackages;
};

const isThemeRegistered = (theme: string) => {
	return registeredThemes.has(theme);
};

export {
	registerThemePropertiesLoader,
	getThemeProperties,
	getRegisteredPackages,
	isThemeRegistered,
};

export type {
	ThemeData,
	ThemeLoader,
};
