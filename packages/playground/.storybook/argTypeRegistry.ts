type componentArgTypes = {
    subComponents?: string[];
    componentName: string;
    [key: string]: any;
}

const componentsArgTypes = new Map<string, componentArgTypes>();

const registerComponentArgTypes = (componentName: string, argTypes: componentArgTypes) => {
    componentsArgTypes.set(componentName, argTypes);
}

const getComponentArgTypes = (componentName: string) => {
    return componentsArgTypes.get(componentName);
}

export {
    registerComponentArgTypes,
    getComponentArgTypes
}
