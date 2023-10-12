import fs from "fs";

const getDeprecatedStatus = (ts, jsdocComment) => {
    const deprecatedTag = jsdocComment?.tags?.find(tag => tag?.kind === ts?.SyntaxKind?.JSDocDeprecatedTag);

    return deprecatedTag ? (deprecatedTag.comment || true) : false;
}

const getSinceStatus = (ts, jsdocComment) => {
    const sinceTag = findTag(jsdocComment, "since");

    return sinceTag?.comment;
}

const getPrivacyStatus = (ts, jsdocComment) => {
    const privacyTag = findTag(jsdocComment, ["public", "private", "protected"]);

    return privacyTag?.tagName?.text || "private";
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
    const typeName = typeof type === "string" ? type : type.class?.expression?.text || type.typeExpression?.type?.getText() || type.typeExpression?.type?.elementType?.typeName?.text;

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
    field: [...commonTags, "type", "default", "readonly"],
    slot: [...commonTags, "type", "default"],
    event: [...commonTags, "param", "allowPreventDefault", "native"],
    eventParam: [...commonTags],
    method: [...commonTags, "param", "returns"],
    class: [...commonTags, "class", "abstract", "implements", "extends", "slot", "csspart"],
    enum: [...commonTags],
    enumMember: [...commonTags],
    interface: [...commonTags],
}

const tagMatchCallback = (tag, tagName, isParsedComment) => {
    const currentTagName = isParsedComment ? tag.tagName?.text : tag.tag;

    return typeof tagName === "string" ? currentTagName === tagName : tagName.includes(currentTagName);
}

const findDecorator = (node, decoratorName) => {
    return node?.decorators?.find(decorator => decorator?.expression?.expression?.text === decoratorName);
}

const findAllDecorators = (node, decoratorName) => {
    return node?.decorators?.filter(decorator => decorator?.expression?.expression?.text === decoratorName) || [];
}

const hasTag = (jsDoc, tagName, isParsedComment) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.some(tag => tagMatchCallback(tag, tagName, isParsedComment))
}

const findTag = (jsDoc, tagName, isParsedComment) => {
    if (!jsDoc) {
        return;
    }

    return jsDoc?.tags?.find(tag => tagMatchCallback(tag, tagName, isParsedComment))
}

const findAllTags = (jsDoc, tagName, isParsedComment) => {
    if (!jsDoc) {
        return [];
    }

    const foundTags = jsDoc?.tags?.filter(tag => tagMatchCallback(tag, tagName, isParsedComment))

    return foundTags || [];
}

const validateJSDocComment = (fieldType, jsdocComment, node) => {
    return !!jsdocComment.tags?.every(tag => {
        if (allowedTags[fieldType]?.includes(fieldType === "event" ? tag.tag : tag.tagName?.text)) {
            return true;
        }

        console.log(`=== ERROR: ${fieldType === "event" ? node : node.name?.text} has wrong tags. Following tags are wrong:`)
        console.log(`         - @${fieldType === "event" ? tag.tag : tag.tagName?.text} is not part of ${fieldType} JSDoc tags`)
    });
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
    findAllTags
}
