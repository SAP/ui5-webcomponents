type ConfigurationResetCallback = () => void;

const registeredConfigurations = new Map<string, ConfigurationResetCallback>();

const registerConfiguration = (name: string, resetCallback: ConfigurationResetCallback) => {
	const configuration = registeredConfigurations.has(name);

	if (!configuration) {
		registeredConfigurations.set(name, resetCallback);
	}
};

const resetConfiguration = () => {
	registeredConfigurations.forEach(resetCallback => {
		resetCallback();
	});
};

export {
	registerConfiguration,
	resetConfiguration,
};
