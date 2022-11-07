const fs = require('fs');
const path = require('path');
const customElementsMain = require('@ui5/webcomponents/custom-elements.json');
const customElementsFiori = require('@ui5/webcomponents-fiori/custom-elements.json');

// run the script to generate merge the custom-elements.json files
// remove the attributes from the declarations as they are duplicated with the properties

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
    target.modules = parseModules(target.modules.concat(source.modules));

    return target;
};

const customElements = mergeManifests(customElementsMain, customElementsFiori);

fs.writeFileSync(
    path.join(__dirname, '../.storybook/custom-elements.json'),
    JSON.stringify(customElements, null, 2)
);