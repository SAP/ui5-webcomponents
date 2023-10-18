import fs from "fs";

let JSDocErrors = [];

const getDeprecatedStatus = (jsdocComment) => {
    const deprecatedTag = findTag(jsdocComment, "deprecated");

    if (deprecatedTag?.name) {
        return deprecatedTag.description ? `${deprecatedTag.name} ${deprecatedTag.description}` : deprecatedTag.name;
    }

    return deprecatedTag ? true : false;
}

const getSinceStatus = (jsdocComment) => {
    const sinceTag = findTag(jsdocComment, "since");

    if (sinceTag) {
        return sinceTag.description ? `${sinceTag.name} ${sinceTag.description}` : sinceTag.name;
    }
}

const getPrivacyStatus = (jsdocComment) => {
    const privacyTag = findTag(jsdocComment, ["public", "private", "protected"]);

    return privacyTag?.tag || "private";
}

const findPackageName = (ts, sourceFile, typeName, packageJSON) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.find(statement => localStatements.includes(statement.kind) && statement?.name?.text === typeName);

    if (isLocalDeclared) {
        return packageJSON?.name;
    } else {
        const importStatements = sourceFile.statements?.filter((statement) => statement.kind === ts.SyntaxKind.ImportDeclaration);
        const currentModuleSpecifier = importStatements.find((statement) => {
            if (statement.importClause?.name?.text === typeName) {
                return true;
            }

            return statement.importClause?.namedBindings?.elements?.some(
                (element) => element.name?.text === typeName
            );
        })?.moduleSpecifier;

        if (currentModuleSpecifier?.text?.startsWith(".")) {
            return packageJSON?.name;
        } else {
            return Object.keys(packageJSON?.dependencies || {}).find(
                (dependency) => currentModuleSpecifier?.text?.startsWith(dependency)
            );
        }
    }
};

const getReference = (ts, type, classNode) => {
    const sourceFile = classNode.parent?.kind === ts.SyntaxKind.SourceFile && classNode.parent;
    const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

    const typeName = typeof type === "string" ? type : type.class?.expression?.text || type.typeExpression?.type?.getText() || type.typeExpression?.type?.elementType?.typeName?.text;
    const packageName = findPackageName(ts, sourceFile, typeName, packageJSON);

    return packageName && {
        name: typeName,
        package: packageName,
    };
};

const getType = (ts, type, classNode) => {
    const typeName = typeof type === "string" ? type : type.type;

    const multiple = typeName.endsWith("[]");
    const name = multiple ? typeName.replace("[]", "") : typeName;
    const reference = getReference(ts, name, classNode);

    return reference
        ? {
            text: multiple ? `${name}[]` : name,
            references: [reference],
        }
        : { text: multiple ? `${name}[]` : name };
};

const commonTags = ["public", "protected", "private", "since", "deprecated"]

const allowedTags = {
    field: [...commonTags, "formEvents", "formProperty", "type", "default", "readonly"],
    slot: [...commonTags, "type", "default"],
    event: [...commonTags, "param", "allowPreventDefault", "native"],
    eventParam: [...commonTags],
    method: [...commonTags, "param", "returns"],
    class: [...commonTags, "constructor", "class", "abstract", "implements", "extends", "slot", "csspart"],
    enum: [...commonTags],
    enumMember: [...commonTags],
    interface: [...commonTags],
}

const tagMatchCallback = (tag, tagName) => {
    const currentTagName = tag.tag;

    return typeof tagName === "string" ? currentTagName === tagName : tagName.includes(currentTagName);
}

const findDecorator = (node, decoratorName) => {
    return node?.decorators?.find(decorator => decorator?.expression?.expression?.text === decoratorName);
}

const findAllDecorators = (node, decoratorName) => {
    return node?.decorators?.filter(decorator => decorator?.expression?.expression?.text === decoratorName) || [];
}

const hasTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.some(tag => tagMatchCallback(tag, tagName))
}

const findTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.find(tag => tagMatchCallback(tag, tagName))
}

const findAllTags = (jsDoc, tagName) => {
    if (!jsDoc) {
        return [];
    }

    const foundTags = jsDoc?.tags?.filter(tag => tagMatchCallback(tag, tagName))

    return foundTags || [];
}

const validateJSDocTag = (tag) => {
    const booleanTags = ["private", "protected", "public", "abstract", "allowPreventDefault", "native", "formProperty", "constructor"];
    let tagName = tag.tag;

    if (booleanTags.includes(tag.tag)) {
        tagName = "boolean";
    }

    switch (tagName) {
        case "boolean":
            return !tag.name && !tag.type && !tag.description;
        case "deprecated":
            return !tag.type;
        case "extends":
            return !tag.type && tag.name && !tag.description;
        case "implements":
            return tag.type && !tag.name && !tag.description;
        case "slot":
            return tag.type && tag.name && tag.description;
        case "csspart":
            return !tag.type && tag.name && tag.description;
        case "since":
            return !tag.type && tag.name;
        case "returns":
            return tag.type && tag.name;
        case "default":
            return !tag.type && !tag.description;
        case "class":
            return !tag.type && !tag.name && tag.description;
        case "type":
            return tag.type && !tag.name && !tag.description;
        case "formEvents":
            return !tag.type && tag.name;
        default:
            return false;
    }
}

const validateJSDocComment = (fieldType, jsdocComment, node) => {
    return !!jsdocComment?.tags?.every(tag => {
        const isValid = allowedTags[fieldType]?.includes(tag.tag) && validateJSDocTag(tag);

        if (!isValid) {
            JSDocErrors.push(`=== ERROR: Problem found with ${node}'s JSDoc comment: \n\t- @${tag.tag} tag is being used wrong or it's not part of ${fieldType} JSDoc tags`)
        }

        return !!isValid;
    });
}

const getJSDocErrors = () => {
    return JSDocErrors;
}

export {
    getPrivacyStatus,
    getSinceStatus,
    getDeprecatedStatus,
    getType,
    getReference,
    validateJSDocComment,
    findDecorator,
    findAllDecorators,
    hasTag,
    findTag,
    findAllTags,
    getJSDocErrors,
}
