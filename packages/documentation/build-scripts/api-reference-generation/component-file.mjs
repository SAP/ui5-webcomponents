import sanitizeHtml from "sanitize-html";

const parseDeclarationDescription = (declaration) => {
    if (!declaration.description) {
        return "";
    }
    return escapeText(declaration.description)
};

const processTitles = (text) => {
    const matches = text.matchAll(/<h(\d).*?>(.+)<\/.*h\d+.*>/g);

    for (const match of matches) {
        if (match[2].trim().startsWith("Overview")) {
            text = text.replace(match[0], "")
        } else {
            text = text.replace(match[0], `${"#".repeat(match[1])} ${match[2]}`)
        }
    }

    return text;
}

const escapeText = (text) => {
    if (!text) {
        return "";
    }

    const hasTitle = /<h\d.+?>/.test(text);

    if (hasTitle) {
        text = processTitles(text);
    }

    return sanitizeHtml(text);
}

const escapeTextDescription = (text) => {
    if (!text) {
        return "";
    }

    return escapeText(text).replaceAll(/<\s*br\s*>|<\s*br\s*\/>|<\/\s*br\s*>/g, "\n").replaceAll(/[^>]\n{2,}/g, "<br />").replaceAll("\n", "")
}



const parseEnumDeclarationFields = (declaration) => {
    const fields = declaration.members?.filter(member => member.kind === "field")

    if (!fields?.length) {
        return "";
    }

    return `| Name | Description |
| ---- | ----------- |
${fields
            .map(member => {
                return `| ${member.name} | ${escapeTextDescription(member.description)} |`
            })
            .join("\n")
        }
`
}

const getTable = (kind) => {
    switch (kind) {
        case "field":
            return `## Properties\n<PropsTable declaration={declarationJSON} />`;
        case "method":
            return `## Methods\n<MethodsTable declaration={declarationJSON} />`;
        case "event":
            return `## Events\n<EventsTable declaration={declarationJSON} />`;
        case "cssPart":
            return `## CSS Parts\n<CssPartsTable declaration={declarationJSON} />`;
        case "slot":
            return `## Slots\n<SlotsTable declaration={declarationJSON} />`;
        case "enum":
            return `## Enum fields\n<EnumFieldsTable declaration={declarationJSON} />`;
        default:
            return "";
    }
}


const parseDeclaration = (declaration) => {
    if (!declaration) {
        return "";
    }

    let sections = [
        parseDeclarationDescription(declaration)
    ]

    if (declaration.kind === "enum") {
        sections.push(`import declarationJSON from "./_${declaration.name}Declaration.json";`);
        sections.push(getTable("enum"));
    }

    return sections.join("\n\n")
}


const parseComponentDeclaration = (declaration, fileContent) => {
    if (!declaration || !fileContent) {
        return "";
    }

    fileContent = fileContent.replace("<%COMPONENT_OVERVIEW%>", parseDeclarationDescription(declaration))

    const metadataSections = [
        "field",
        "slot",
        "event",
        "method",
        "cssPart"
    ].map(fieldType => getTable(fieldType))

    metadataSections.unshift(`import declarationJSON from "./_${declaration.name}Declaration.json";`)

    fileContent = fileContent.replace("<%COMPONENT_METADATA%>", metadataSections.join("\n\n"));

    return fileContent
}

export {
    parseDeclaration,
    parseComponentDeclaration,
}