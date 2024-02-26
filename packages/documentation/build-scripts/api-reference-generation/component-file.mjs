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

const getPropsTables = (declaration) => {
    let result = `## Properties`
    const properties = declaration.members?.filter(member => member.kind === "field") || [];

    if (!properties.length) {
        return `${result}
No properties available for this component.`
    }

    result += "\n\n" + properties.map(property => {
        return `### ${property.name}

<PropsTable property={${JSON.stringify(property)}} />
`}).join("\n")

    return result;
}

const getMethodsTables = (declaration) => {
    let result = `## Methods`
    const methods = declaration.members?.filter(member => member.kind === "method") || [];

    if (!methods.length) {
        return `${result}
No methods available for this component.`
    }

    result += "\n\n" + methods.map(method => {
        return `### ${method.name}

<MethodsTable method={${JSON.stringify(method)}} />
`}).join("\n")

    return result;
}

const getEventsTables = (declaration) => {
    let result = `## Events`
    const events = declaration.events || [];

    if (!events.length) {
        return `${result}
No events available for this component.`
    }

    result += "\n\n" + events.map(event => {
        return `### ${event.name}

<EventsTable event={${JSON.stringify(event)}} />
`}).join("\n")

    return result;
}

const getSlotsTables = (declaration) => {
    let result = `## Slots`
    const slots = declaration.slots || [];

    if (!slots.length) {
        return `${result}
No slots available for this component.`
    }

    result += "\n\n" + slots.map(slot => {
        return `### ${slot.name}

<SlotsTable slot={${JSON.stringify(slot)}} />
`}).join("\n")

    return result;
}

const getCssPartsTable = (declaration) => {
    let result = `## CSS Parts`
    const cssParts = declaration.cssParts || [];

    if (!cssParts.length) {
        return `${result}
No CSS parts available for this component.`
    }

    result = `${result}
| Name | Description |
|------|-------------|
${cssParts.map(cssPart => `| ${cssPart.name} | ${cssPart.description.replaceAll("\n", " ")} |`).join("\n")}`

    return result;
}

const getTable = (kind, declaration) => {
    switch (kind) {
        case "field":
            return getPropsTables(declaration);
        case "method":
            return getMethodsTables(declaration);
        case "event":
            return getEventsTables(declaration);
        case "cssPart":
            return getCssPartsTable(declaration);
        case "slot":
            return getSlotsTables(declaration);
        case "enum":
            return `## Enum fields\n<EnumFieldsTable declaration={declarationJSON} />`;
        default:
            return "";
    }
}


const parseDeclaration = (declaration, packageName) => {
    if (!declaration) {
        return "";
    }

    let sections = [
        parseDeclarationDescription(declaration)
    ]

    if (packageName === "main") {
        sections.unshift(`---
slug: ../../${declaration.kind}s/${declaration.name}
---`)
    }

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
    ].map(fieldType => getTable(fieldType, declaration))

    metadataSections.unshift(`import declarationJSON from "./_${declaration.name}Declaration.json";`)

    fileContent = fileContent.replace("<%COMPONENT_METADATA%>", metadataSections.join("\n\n"));

    return fileContent
}

export {
    parseDeclaration,
    parseComponentDeclaration,
}