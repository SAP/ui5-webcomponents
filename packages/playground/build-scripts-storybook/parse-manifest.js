const fs = require("fs");
const path = require("path");

// Run the script to generate and merge the custom-elements.json files.
// Removes the attributes from the declarations as they are duplicated with the properties.

// The following properties are excluded from the members array as they are not truly public.
const EXCLUDE_LIST = [
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
    "getStaticAreaItemDomRef",
];

const loadManifest = () => {
    try {
        const customElementsMain = require("@ui5/webcomponents/custom-elements.json");
        const customElementsFiori = require("@ui5/webcomponents-fiori/custom-elements.json");

        return {
            customElementsMain,
            customElementsFiori,
        };
    } catch (error) {
        console.log("Error while loading manifests. Did you run 'yarn build'?");

        if (process.env.NODE_ENV !== "production") {
            return {
                customElementsMain: {},
                customElementsFiori: {},
            };
        }

        throw error;
    }
};

const parseMembers = (members) => {
    const parsed = [];
    members.forEach((member) => {
        if (EXCLUDE_LIST.indexOf(member.name) > -1) {
            return;
        }
        if (member.kind === "method") {
            // change kind to property as Storybook does not show methods from the custom-elements.json
            member.kind = "field";
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
        let superclassDeclaration = processedDeclarations.get(declaration.superclass.name);

        if (!superclassDeclaration) {
            superclassDeclaration = customElements.modules.find(_m => _m.declarations.find(_d => _d.name === declaration.superclass?.name ));

            if (superclassDeclaration) {
                flattenAPIsHierarchicalStructure(superclassDeclaration);
            }
        }

        if (superclassDeclaration) {
            processedDeclarations.set(declaration.name, mergeClassMembers(declaration, processedDeclarations.get(declaration.superclass.name)));
        } else {
            processedDeclarations.set(declaration.name, declaration);
        }
    })
}

const mergeClassMembers = (declaration, superclassDeclaration) => {
    const props = ["members", "slots", "events"];

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


const { customElementsMain, customElementsFiori } = loadManifest();
const customElements = mergeManifests(customElementsMain, customElementsFiori );
const processedDeclarations = new Map();

customElements.modules.forEach(flattenAPIsHierarchicalStructure)

fs.writeFileSync(
    path.join(__dirname, "../.storybook/custom-elements.json"),
    JSON.stringify(customElements, null, 2)
);
