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

const { customElementsMain, customElementsFiori } = loadManifest();
const customElements = mergeManifests(customElementsMain, customElementsFiori);

fs.writeFileSync(
    path.join(__dirname, "../.storybook/custom-elements.json"),
    JSON.stringify(customElements, null, 2)
);
