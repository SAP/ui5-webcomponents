const fs = require('fs');
const path = require('path');

// Run the script to generate and merge the custom-elements.json files.
// Removes the attributes from the declarations as they are duplicated with the properties.

const loadManifest = () => {
    try {
        const customElementsMain = require('@ui5/webcomponents/custom-elements.json');
        const customElementsFiori = require('@ui5/webcomponents-fiori/custom-elements.json');

        return {
            customElementsMain,
            customElementsFiori,
        };
    } catch (error) {
        console.log(
            "Error while loading manifests. Did you run 'npm run build'?"
        );

        if (process.env.NODE_ENV !== "production") {
            return {
                customElementsMain: {},
                customElementsFiori: {},
            };
        }

        throw error;
    }
};

const parseModules = (modules) => {
    // remove module.declarations[].attributes
    modules.forEach((module) => {
        module.declarations = module.declarations.map((declaration) => {
            if (declaration.attributes) {
                delete declaration.attributes;
            }
            return declaration;
        });
    });

    return modules;
};

const mergeManifests = (target, source) => {
    if (target.modules && source.modules) {
        target.modules = parseModules(target.modules.concat(source.modules));
    }

    return target;
};

const { customElementsMain, customElementsFiori } = loadManifest();
const customElements = mergeManifests(customElementsMain, customElementsFiori);

fs.writeFileSync(
    path.join(__dirname, "../.storybook/custom-elements.json"),
    JSON.stringify(customElements, null, 2)
);
