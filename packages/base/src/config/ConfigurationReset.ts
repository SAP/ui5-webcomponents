const registeredConfigurations = new Map<string, () => void>();

const registerConfiguration = (name: string, resetCallback: () => void) => {
    const configuration = registeredConfigurations.has(name);

    if (!configuration) {
        registeredConfigurations.set(name, resetCallback);
    }
}

const resetConfiguration = () => {
    registeredConfigurations.forEach(resetCallback => {
        resetCallback();
    });
}

export {
    registerConfiguration,
    resetConfiguration,
}