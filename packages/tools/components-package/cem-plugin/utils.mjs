import fs from "fs";

const getDeprecatedStatus = (ts, jsdocComment) => {
    const deprecatedTag = jsdocComment?.tags?.find(tag => tag?.kind === ts?.SyntaxKind?.JSDocDeprecatedTag);

    return deprecatedTag ? (deprecatedTag.comment || true) : false;
}

const getSinceStatus = (ts, jsdocComment) => {
    const sinceTag = jsdocComment?.tags?.find(tag => tag?.tagName?.text === "since");

    return sinceTag?.comment;
}

const getPrivacyStatus = (ts, jsdocComment) => {
    const privacyTagKinds = [ts?.SyntaxKind?.JSDocPrivateTag, ts?.SyntaxKind?.JSDocPublicTag, ts?.SyntaxKind?.JSDocProtectedTag];
    const privacyTag = jsdocComment?.tags?.find(tag => privacyTagKinds.includes(tag?.kind));

    return privacyTag ? privacyTag.tagName?.text : "private";
}

const findPackageName = (ts, sourceFile, typeName, packageJSON) => {
    const localStatements = [
        ts.SyntaxKind.EnumDeclaration,
        ts.SyntaxKind.InterfaceDeclaration,
        ts.SyntaxKind.ClassDeclaration,
        ts.SyntaxKind.TypeAliasDeclaration,
    ];

    const isLocalDeclared = sourceFile.statements.find(statement => localStatements.includes(statement.kind))?.name?.text === typeName;

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

export {
    getPrivacyStatus,
    getSinceStatus,
    getDeprecatedStatus,
    getType,
    getReference
}
