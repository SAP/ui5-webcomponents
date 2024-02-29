const parseDeclarationDescription = (declaration) => {
    if (!declaration.description) {
        return "";
    }
    return declaration.description
    // codeblocks format
    .replaceAll(/\`{3}[\s\S]*?\`{3}/gm, (match) => {
        return `\`\`\`${match.replaceAll("```", "").trim().replaceAll("\n", "@newLineCode@")}\`\`\``;
    })
};

const processDescription = (description) => {
    if (!description) {
        return " - "
    }

    return description
        // codeblocks format
        .replaceAll(/\`{3}[\s\S]*?\`{3}/gm, (match) => {
            return `\`\`\`${match.replaceAll("```", "").trim().replaceAll("\n", "@newLineCode@")}\`\`\``;
        })
        // lists inside description
        .replaceAll(/\n\s*-/g, "<br />-")
        // breaklines
        .replaceAll(/\n\n/g, "<br />")
        .replaceAll(/\n/g, " ");
}

const processType = (type) => {
    if (!type || !type.text) {
        return " - "
    }

    return `\`${type?.text?.replaceAll("|", "\\|")}\``
}

const getPropsTables = (declaration) => {
    let result = `## Properties`
    const properties = declaration.members?.filter(member => member.kind === "field") || [];

    if (!properties.length) {
        return `${result}
No properties available for this component.`
    }

    result += "\n" + properties.map(property => {
        let propertyResult = `### ${property.name}
|             |   |
|-------------|---|
| Description | ${processDescription(property.description)} |
| Type        | ${processType(property.type)} |`

        if (property._ui5since) {
            propertyResult += `\n| Since | ${property._ui5since} |`
        }

        if (property.deprecated) {
            propertyResult += `\n| Deprecated | ${property.deprecated} |`
        }

        return propertyResult
    }).join("\n")

    return result;
}

const getMethodsTables = (declaration) => {
    let result = `## Methods`
    const methods = declaration.members?.filter(member => member.kind === "method") || [];

    if (!methods.length) {
        return `${result}
No methods available for this component.`
    }

    result += "\n" + methods.map(method => {
        let methodResult = `### ${method.name}
|             |   |
|-------------|---|
| Description | ${processDescription(method.description)} |
| Return type | ${processType(method.return?.type)} |`

        if (method.parameters) {
            const paramsText = method.parameters.map(param => {
                let text = `**${param.name}**: ${processType(param.type)}`;

                if (param.description) {
                    text += `<br />${processDescription(param.description)}`
                }

                if (param._ui5since) {
                    text += `<br />Since:${param._ui5since}`
                }

                if (param.deprecated) {
                    text += `<br />Deprecated: ${param.deprecated}`
                }

                return text;
            }).join("\n\n");

            methodResult += `\n| Parameters | ${processDescription(paramsText)} |`
        }

        if (method._ui5since) {
            methodResult += `\n| Since | ${method._ui5since} |`
        }

        if (method.deprecated) {
            methodResult += `\n| Deprecated | ${method.deprecated} |`
        }

        return methodResult
    }).join("\n")

    return result;
}

const getEventsTables = (declaration) => {
    let result = `## Events`
    const events = declaration.events || [];

    if (!events.length) {
        return `${result}
No events available for this component.`
    }

    result += "\n" + events.map(event => {
        let eventResult = `### ${event.name}
|             |   |
|-------------|---|
| Description | ${processDescription(event.description)} |
| Type | ${processType(event.type)} |`

        if (event._ui5parameters) {
            const paramsText = event._ui5parameters.map(param => {
                let text = `**${param.name}**: ${processType(param.type)}`;

                if (param.description) {
                    text += `<br />${processDescription(param.description)}`
                }

                if (param._ui5since) {
                    text += `<br />Since:${param._ui5since}`
                }

                if (param.deprecated) {
                    text += `<br />Deprecated: ${param.deprecated}`
                }

                return text;
            }).join("\n\n");

            eventResult += `\n| Parameters | ${processDescription(paramsText)} |`
        }

        if (event._ui5since) {
            eventResult += `\n| Since | ${event._ui5since} |`
        }

        if (event.deprecated) {
            eventResult += `\n| Deprecated | ${event.deprecated} |`
        }

        return eventResult
    }).join("\n")

    return result;
}

const getSlotsTables = (declaration) => {
    let result = `## Slots`
    const slots = declaration.slots || [];

    if (!slots.length) {
        return `${result}
No slots available for this component.`
    }

    result += "\n" + slots.map(slot => {
        let slotResult = `### ${slot.name}
|             |   |
|-------------|---|
| Description | ${processDescription(slot.description)} |
| Type        | ${processType(slot._ui5type)} |`

        if (slot._ui5since) {
            slotResult += `\n| Since | ${slot._ui5since} |`
        }

        if (slot.deprecated) {
            slotResult += `\n| Deprecated | ${slot.deprecated} |`
        }

        return slotResult
    }).join("\n")

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
${cssParts.map(cssPart => `| ${cssPart.name} | ${processDescription(cssPart.description)} |`).join("\n")}`

    return result;
}



const getEnumFieldsTables = (declaration) => {
    let result = `## Enum fields`
    const enumFields = declaration.members?.filter(member => member.kind === "field") || [];

    if (!enumFields.length) {
        return `${result}
No enum fields available for this enum.`
    }

    result = `${result}
| Name | Description |
|------|-------------|
${enumFields.map(field => `| ${field.name} | ${processDescription(field.description)} |`).join("\n")}`

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
            return getEnumFieldsTables(declaration);
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
        sections.push(getTable("enum", declaration));
    } else if (declaration.kind === "interface") {
        if (!declaration._implementations || !declaration._implementations.length) {
            sections.push(`## Implementations
Interfaces doesn't have direct implementations.
`)
        } else {
            sections.push(`## Implementations
| Name | Module |
|------|--------|
${declaration._implementations.map(_implementation => `| ${_implementation.split("/").pop()} | \`${_implementation}\` |`).join("\n")}
`)
        }

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

    fileContent = fileContent.replace("<%COMPONENT_METADATA%>", metadataSections.join("\n\n"));

    return fileContent
}

export {
    parseDeclaration,
    parseComponentDeclaration,
}