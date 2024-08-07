import EventProvider from "../EventProvider.js";

const eventProvider = new EventProvider<undefined, void>();
const CONFIGURATION_RESET = "configurationReset";
type ConfigurationResetCallback = () => void;

const attachConfigurationReset = (listener: ConfigurationResetCallback) => {
	eventProvider.attachEvent(CONFIGURATION_RESET, listener);
};

const resetConfiguration = () => {
	eventProvider.fireEvent(CONFIGURATION_RESET, undefined);
};

export {
	attachConfigurationReset,
	resetConfiguration,
};
