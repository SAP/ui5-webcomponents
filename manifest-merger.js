import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const cache = new Map();
const fieldsToMerge = ['members', 'slots', 'events', 'cssParts', "_ui5implements"];
const packages = [
    "@ui5/webcomponents-base",
    "@ui5/webcomponents",
    "@ui5/webcomponents-fiori",
    "@ui5/webcomponents-ai",
    "@ui5/webcomponents-compat"
];
function getCEM(packageName) {
    if (!cache.has(packageName)) {
        const require = createRequire(import.meta.url);
        const customElementManifestPath = require.resolve(`${packageName}/dist/custom-elements.json`);
        const customElementManifest = JSON.parse(readFileSync(customElementManifestPath, { encoding: 'utf-8' }));
        for (const module of customElementManifest.modules) {
            for (const declaration of module.declarations ?? []) {
                // @ts-expect-error
                declaration._ui5package = packageName;
                // @ts-expect-error
                declaration._ui5module = module.path;
            }
        }
        cache.set(packageName, customElementManifest);
    }
    const cem = cache.get(packageName);
    if (!cem) {
        throw new Error(`Could not load CEM for ${packageName}`);
    }
    return cem;
}
function saveCEM(packageName) {
    const cem = cache.get(packageName);
    if (!cem) {
        throw new Error(`Could not load CEM for ${packageName}`);
    }
    for (const module of cem.modules) {
        for (const declaration of module.declarations ?? []) {
            // @ts-expect-error
            delete declaration._ui5package;
            // @ts-expect-error
            delete declaration._ui5module;
        }
    }
    const require = createRequire(import.meta.url);
    const customElementManifestPath = require.resolve(`${packageName}/custom-elements.json`);
    writeFileSync(customElementManifestPath, JSON.stringify(cem, null, 2));
}
function mergeArraysWithoutDuplicates(currentValues, newValue, superClass) {
    if (!currentValues.find((currentValue) => currentValue.name === newValue.name)) {
        currentValues.push({
            ...newValue,
            ...{
                "inheritedFrom": {
                    "name": superClass.name,
                    // @ts-expect-error
                    "package": superClass._ui5package,
                    // @ts-expect-error
                    "module": superClass._ui5module,
                }
            }
        });
    }
    return currentValues;
}
function getSuperClassDeclaration(declaration) {
    if (declaration.superclass.name === "HTMLElement") {
        return null;
    }
    if (declaration.superclass) {
        const cem = getCEM(declaration.superclass.package);
        const mod = cem.modules.find((mod) => mod.path === declaration.superclass.module);
        if (mod) {
            return (mod.declarations?.find((decl) => decl.name === declaration.superclass.name) ?? null);
        }
    }
    return null;
}
function resolveTree(declaration, acc = []) {
    const superclass = getSuperClassDeclaration(declaration);
    if (superclass) {
        acc.push(superclass);
        resolveTree(superclass, acc);
    }
    return acc;
}
function resolveModule(mod) {
    for (const declaration of mod.declarations ?? []) {
        if (!Boolean(declaration.customElement)) {
            continue;
        }
        const customElementDeclaration = declaration;
        const superclasses = resolveTree(customElementDeclaration);
        for (const superClass of superclasses) {
            for (const field of fieldsToMerge) {
                const superClassFields = superClass[field];
                if (superClassFields) {
                    customElementDeclaration[field] = superClassFields.reduce((currentValue, newValue) => {
                        return mergeArraysWithoutDuplicates(currentValue, newValue, superClass);
                    }, customElementDeclaration[field] ?? []);
                }
            }
        }
    }
}
function recursiveManifestResolver(pkgName) {
    const customElementManifest = getCEM(pkgName);
    for (const module of customElementManifest.modules) {
        resolveModule(module);
    }
    return customElementManifest;
}
packages.forEach(packageName => {
    recursiveManifestResolver(packageName);
});
packages.forEach(packageName => {
    const customElementManifest = getCEM(packageName);
    for (const mod of customElementManifest.modules) {
        for (const declaration of mod.declarations ?? []) {
            if (!Boolean(declaration.customElement)) {
                continue;
            }
            const customElementDeclaration = declaration;
            if (customElementDeclaration.name === "UI5Element") {
                customElementDeclaration.superclass = {
                    "name": "HTMLElement",
                };
            }
            else {
                customElementDeclaration.superclass = {
                    "name": "UI5Element",
                    "package": "@ui5/webcomponents-base",
                    "module": "dist/UI5Element.js"
                };
            }
        }
    }
    saveCEM(packageName);
});
