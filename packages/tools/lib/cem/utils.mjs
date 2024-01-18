import fs from "fs";
import path from "path";

let JSDocErrors = [];

const getDeprecatedStatus = (jsdocComment) => {
    const deprecatedTag = findTag(jsdocComment, "deprecated");
    return deprecatedTag?.name
        ? deprecatedTag.description
            ? `${deprecatedTag.name} ${deprecatedTag.description}`
            : deprecatedTag.name
        : deprecatedTag
            ? true
            : undefined;
};

const normalizeDescription = (description) => {
	return typeof description === 'string' ? description.replaceAll(/^-\s+|^(\n)+|(\n)+$/g, ""): description;
}

const getTypeRefs = (ts, node, member) => {
    const extractTypeRefs = (type) => {
        if (type?.kind === ts.SyntaxKind.TypeReference) {
            return type.typeArguments?.length
                ? type.typeArguments.map((typeRef) => typeRef.typeName?.text)
                : [type.typeName?.text];
        } else if (type?.kind === ts.SyntaxKind.UnionType) {
            return type.types
                .map((type) => extractTypeRefs(type))
                .flat(1);
        } else if (type?.kind === ts.SyntaxKind.TemplateLiteralType) {
            if (member?.type) {
                member.type.text = member.type.text.replaceAll?.(/`|\${|}/g, "");
            }

            return type.templateSpans?.length
                ? type.templateSpans.map((typeRef) => typeRef.type?.typeName?.text)
                : [type.typeName?.text];
        }
    };

    let typeRefs = extractTypeRefs(node.type) || node?.typeArguments?.map(n => extractTypeRefs(n)).flat(2);

    if (typeRefs) {
        typeRefs = typeRefs.filter((e) => !!e);
    }

    return typeRefs?.length ? typeRefs : undefined;
};

const getSinceStatus = (jsdocComment) => {
    const sinceTag = findTag(jsdocComment, "since");
    return sinceTag
        ? sinceTag.description
            ? `${sinceTag.name} ${sinceTag.description}`
            : sinceTag.name
        : undefined;
};

const getPrivacyStatus = (jsdocComment) => {
    const privacyTag = findTag(jsdocComment, ["public", "private", "protected"]);
    return privacyTag?.tag || "private";
};

const findPackageName = (ts, sourceFile, typeName, packageJSON) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.some(
        (statement) =>
            localStatements.includes(statement.kind) && statement?.name?.text === typeName
    );

    if (isLocalDeclared) {
        return packageJSON?.name;
    } else {
        const importStatements = sourceFile.statements?.filter(
            (statement) => statement.kind === ts.SyntaxKind.ImportDeclaration
        );
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
                (dependency) =>
                    currentModuleSpecifier?.text?.startsWith(`${dependency}/`)
            );
        }
    }
};

const findImportPath = (ts, sourceFile, typeName, packageJSON, modulePath) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.some(
        (statement) =>
            localStatements.includes(statement.kind) && statement?.name?.text === typeName
    );

    if (isLocalDeclared) {
        return (
            modulePath?.replace("src", "dist")?.replace(".ts", ".js") || undefined
        );
    } else {
        const importStatements = sourceFile.statements?.filter(
            (statement) => statement.kind === ts.SyntaxKind.ImportDeclaration
        );
        const currentModuleSpecifier = importStatements.find((statement) => {
            if (statement.importClause?.name?.text === typeName) {
                return true;
            }

            return statement.importClause?.namedBindings?.elements?.some(
                (element) => element.name?.text === typeName
            );
        })?.moduleSpecifier;

        if (currentModuleSpecifier?.text?.startsWith(".")) {
            return (
                path.join(path.dirname(modulePath), currentModuleSpecifier.text)
                    ?.replace("src", "dist")?.replace(".ts", ".js") || undefined
            );
        } else {
            const packageName = Object.keys(packageJSON?.dependencies || {}).find(
                (dependency) =>
                    currentModuleSpecifier?.text?.startsWith(dependency)
            );
            return currentModuleSpecifier?.text
                ?.replace(`${packageName}/`, "") || undefined;
        }
    }
};


const isClass = text => {
	return text.includes("@abstract") || text.includes("@class") || text.includes("@constructor");
};

const normalizeTagType = (type) => {
	return type?.trim();
}

const getReference = (ts, type, classNode, modulePath) => {
    let sourceFile = classNode.parent;

    while (sourceFile && sourceFile.kind !== ts.SyntaxKind.SourceFile) {
        sourceFile = sourceFile.parent;
    }

    const packageJSON = JSON.parse(fs.readFileSync("./package.json"));

    const typeName =
        typeof type === "string"
            ? normalizeTagType(type)
            : type.class?.expression?.text ||
            type.typeExpression?.type?.getText() ||
            type.typeExpression?.type?.elementType?.typeName?.text;
    const packageName = findPackageName(ts, sourceFile, typeName, packageJSON);
    const importPath = findImportPath(
        ts,
        sourceFile,
        typeName,
        packageJSON,
        modulePath
    )?.replace(`${packageName}/`, "");

    return packageName && {
        name: typeName,
        package: packageName,
        module: importPath,
    };
};

const getType = (type) => {
    const typeName = typeof type === "string" ? normalizeTagType(type) : type?.type;

    const multiple =
        typeName?.endsWith("[]") || typeName?.startsWith("Array<");
    const name = multiple
        ? typeName?.replace("[]", "")?.replace("Array<", "")?.replace(">", "")
        : typeName;

    return typeName ? { typeName: multiple ? `Array<${name}>` : typeName, name, multiple } : undefined;
};

const commonTags = ["public", "protected", "private", "since", "deprecated"];

const allowedTags = {
    field: [...commonTags, "formEvents", "formProperty", "default"],
    slot: [...commonTags, "default"],
    event: [...commonTags, "param", "allowPreventDefault", "native"],
    eventParam: [...commonTags],
    method: [...commonTags, "param", "returns", "override"],
    class: [...commonTags, "constructor", "class", "abstract", "implements", "extends", "slot", "csspart"],
    enum: [...commonTags],
    enumMember: [...commonTags],
    interface: [...commonTags],
};
allowedTags.getter = [...allowedTags.field, "override"]

const tagMatchCallback = (tag, tagName) => {
    const currentTagName = tag.tag;

    return typeof tagName === "string"
        ? currentTagName === tagName
        : tagName.includes(currentTagName);
};

const findDecorator = (node, decoratorName) => {
    return node?.decorators?.find(
        (decorator) =>
            decorator?.expression?.expression?.text === decoratorName
    );
};

const findAllDecorators = (node, decoratorName) => {
    return (
        node?.decorators?.filter(
            (decorator) =>
                decorator?.expression?.expression?.text === decoratorName
        ) || []
    );
};

const hasTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.some((tag) => tagMatchCallback(tag, tagName));
};

const findTag = (jsDoc, tagName) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.find((tag) => tagMatchCallback(tag, tagName));
};

const findAllTags = (jsDoc, tagName) => {
    if (!jsDoc) {
        return [];
    }

    const foundTags = jsDoc?.tags?.filter((tag) => tagMatchCallback(tag, tagName));

    return foundTags || [];
};

const validateJSDocTag = (tag) => {
    const booleanTags = ["private", "protected", "public", "abstract", "allowPreventDefault", "native", "formProperty", "constructor", "override"];
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
            return !tag.type && tag.name;
        case "default":
            return !tag.type && !tag.description;
        case "class":
            return !tag.type;
        case "param":
            return !tag.type && tag.name;
        case "eventparam":
            return tag.type && tag.name;
        case "formEvents":
            return !tag.type && tag.name;
        default:
            return false;
    }
};

const validateJSDocComment = (fieldType, jsdocComment, node, moduleDoc) => {
    return !!jsdocComment?.tags?.every((tag) => {
        let isValid = false

        if (fieldType === "event" && tag?.tag === "param") {
            isValid = allowedTags[fieldType]?.includes(tag.tag) && validateJSDocTag({...tag, tag: "eventparam"});
        } else {
            isValid = allowedTags[fieldType]?.includes(tag.tag) && validateJSDocTag(tag);
        }

        if (!isValid) {
            JSDocErrors.push(
                `=== ERROR: Problem found with ${node}'s JSDoc comment in ${moduleDoc.path}: \n\t- @${tag.tag} tag is being used wrong or it's not part of ${fieldType} JSDoc tags`
            );
        }

        return !!isValid;
    });
};

const getJSDocErrors = () => {
    return JSDocErrors;
};

const formatArrays = (typeText) => {
	return typeText.replaceAll(/(\S+)\[\]/g, "Array<$1>")
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
    getTypeRefs,
    normalizeDescription,
    formatArrays,
    isClass,
    normalizeTagType
};
