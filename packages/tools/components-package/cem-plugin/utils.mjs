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

export {
    getPrivacyStatus,
    getSinceStatus,
    getDeprecatedStatus
}
