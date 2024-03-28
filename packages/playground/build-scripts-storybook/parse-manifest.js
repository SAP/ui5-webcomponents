const fs = require("fs");
const path = require("path");

// Run the script to generate and merge the custom-elements.json files.
// Removes the attributes from the declarations as they are duplicated with the properties.

// The following properties are excluded from the members array as they are not truly public.
const EXCLUDE_LIST = [
    "detachComponentStateFinalized",
    "attachComponentStateFinalized",
    "effectiveDir",
    "isUI5Element",
    "attachInvalidate",
    "define",
    "detachInvalidate",
    "fireEvent",
    "focus",
    "getDomRef",
    "getFocusDomRef",
    "getFocusDomRefAsync",
    "getMetadata",
    "getSlottedNodes",
    "getUniqueDependencies",
    "onAfterRendering",
    "onBeforeRendering",
    "onEnterDOM",
    "onExitDOM",
    "onInvalidation",
];

const loadManifest = () => {
    let customElementsMain = {};
    let customElementsFiori = {};
    let customElementsBase = {};

    try {
        customElementsMain = require("@ui5/webcomponents/custom-elements-internal.json");

        customElementsMain.modules.forEach(module => {
            applyPackageToDeclarations(module, "@ui5/webcomponents")
        })
    } catch (error) {
        console.error("Did you run `yarn build` for packages/main?")
    }

    try {
        customElementsFiori = require("@ui5/webcomponents-fiori/custom-elements-internal.json");

        customElementsFiori.modules.forEach(module => {
            applyPackageToDeclarations(module, "@ui5/webcomponents-fiori")
        })
    } catch (error) {
        console.error("Did you run `yarn build` for packages/main?")
    }

    try {
        customElementsBase = require("@ui5/webcomponents-base/custom-elements-internal.json");

        customElementsBase.modules.forEach(module => {
            applyPackageToDeclarations(module, "@ui5/webcomponents-base")
        })
    } catch (error) {
        console.error("Did you run `yarn build` for packages/main?")
    }

    return {
        customElementsMain,
        customElementsFiori,
        customElementsBase,
    };
};

const applyPackageToDeclarations = (module, package) => {
    module?.declarations?.forEach(declaration => (declaration._ui5package = package));
}

const parseMembers = (members) => {
    const parsed = [];
    members.forEach((member) => {
        if (EXCLUDE_LIST.indexOf(member.name) > -1) {
            return;
        }
        parsed.push(member);
    });
    return parsed;
};

const parseModule = (module) => {
    module.declarations = module.declarations.map((declaration) => {
        declaration.tagName = declaration.name;

        // remove attributes as they are duplicated with the properties
        if (declaration.attributes) {
            delete declaration.attributes;
        }
        if (declaration.members) {
            declaration.members = parseMembers(declaration.members);
        }
        // Storybook remove slots/css parts/properties/events with duplicate names so we add suffix to css parts in order to avoid duplicates.
        // It can't happen to slots and properties since you can't have duplicate accessors.
        if (declaration.cssParts) {
            declaration.cssParts.forEach(part => {
                if (!part.name.startsWith("_ui5")) {
                    part.name = `_ui5${part.name}`;
                }
            });
        }

        return declaration;
    });
};

const mergeManifests = (target, source) => {
    if (Array.isArray(target.modules) && Array.isArray(source.modules)) {
        target.modules = target.modules.concat(source.modules);
        target.modules.forEach(parseModule);
    }

    return target;
};


const flattenAPIsHierarchicalStructure = module => {
    if (!module) {
        return;
    }
    const declarations = module.declarations;

    declarations.forEach(declaration => {
        let superclassDeclaration = processedDeclarations.get(`${declaration.superclass?.package}/${declaration.superclass?.name}`);

        if (!superclassDeclaration) {
            superclassDeclaration = customElements.modules.find(_m => _m.declarations.find(_d => _d.name === declaration.superclass?.name && _d._ui5package === declaration.superclass?.package));

            if (superclassDeclaration) {
                flattenAPIsHierarchicalStructure(superclassDeclaration);
            }
        }

        if (superclassDeclaration) {
            processedDeclarations.set(`${declaration._ui5package}/${declaration.name}`, mergeClassMembers(declaration, processedDeclarations.get(`${declaration.superclass?.package}/${declaration.superclass?.name}`)));
        } else {
            processedDeclarations.set(`${declaration._ui5package}/${declaration.name}`, declaration);
        }
    })
}

const mergeClassMembers = (declaration, superclassDeclaration) => {
    const props = ["members", "slots", "events", "cssParts"];

    props.forEach(prop => {
        if (declaration[prop]?.length) {
            declaration[prop] = (superclassDeclaration[prop] || []).reduce(mergeArraysWithoutDuplicates, declaration[prop])
        } else if (superclassDeclaration[prop]?.length) {
            declaration[prop] = superclassDeclaration[prop];
        }
    });

    return declaration;
}

const mergeArraysWithoutDuplicates = (currentValues, newValue) => {
    if (!currentValues.find(currentValue => currentValue.name === newValue.name)) {
        currentValues.push(newValue);
    }

    return currentValues;
}


const { customElementsMain, customElementsFiori, customElementsBase } = loadManifest();
let customElements = mergeManifests(mergeManifests(customElementsMain, customElementsFiori), customElementsBase);
const processedDeclarations = new Map();

customElements.modules?.forEach(flattenAPIsHierarchicalStructure);

fs.writeFileSync(
    path.join(__dirname, "../.storybook/custom-elements.json"),
    JSON.stringify(customElements, null, 2)
);
