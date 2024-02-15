import sanitizeHtml from 'sanitize-html';

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

    return sanitizeHtml(text).replaceAll("{", "\\{").replaceAll("}", "\\}")
}

const escapeTextDescription = (text) => {
    if (!text) {
        return "";
    }

    return escapeText(text).replaceAll(/<\s*br\s*>|<\s*br\s*\/>|<\/\s*br\s*>/g, "\n").replaceAll(/[^>]\n{2,}/g, "<br />").replaceAll("\n", "")
}

const parseDeclarationFields = (declaration) => {
    const fields = declaration.members?.filter(member => member.kind === "field")

    if (!fields?.length) {
        return "";
    }

    return `| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
${fields
            .map(member => {
                return `| ${member.name} ${member.readonly ? "(readonly)" : ""} | \`${member.type?.text.replaceAll("|","\\|") || " - "} \` | ${escapeText(member.default)} | ${escapeTextDescription(member.description)} |`
            })
            .join("\n")
        }
`
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

const parseDeclarationMethods = (declaration) => {
    const methods = declaration.members?.filter(member => member.kind === "method")

    if (!methods?.length) {
        return "";
    }

    return `| Name | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
${methods
            .map(member => {
                return `| ${member.name} | \`${member.type?.text.replaceAll("|","") || " - "}\` | ${escapeText(member.default)} | ${escapeTextDescription(member.description)} |`
            })
            .join("\n")
        }
`
}

const parseDeclarationSlots = (declaration) => {
    if (!declaration.slots?.length) {
        return "";
    }

    return `| Name | Type | Description |
| ---- | ---- | ----------- |
${declaration.slots.map(member => {
        return `| ${member.name} | \`${member._ui5type?.text.replaceAll("|","") || " - "}\` | ${escapeTextDescription(member.description)} |`
    }).join("\n")
        }
`
}

const parseDeclarationEvents = (declaration) => {
    if (!declaration.events?.length) {
        return "";
    }

    return `| Name | Type | Description |
| ---- | ---- | ----------- |
${declaration.events.map(member => {
        return `| ${member.name} | \`${member.type?.text.replaceAll("|","") || " - "}\` | ${escapeTextDescription(member.description)} |`
    }).join("\n")
        }
`
}

const parseDeclarationCssParts = (declaration) => {
    if (!declaration.cssParts?.length) {
        return "";
    }

    return `<h2> CSS Parts</h2>

| Name | Description |
| ---- | ----------- |
${declaration.cssParts.map(member => {
        return `| ${member.name} | ${escapeTextDescription(member.description)} |`
    }).join("\n")
        }
`
}


const parseDeclaration = (declaration) => {
    if (!declaration) {
        return "Test description";
    }

    switch (declaration.kind) {
        case "interface":
            return [
                parseDeclarationDescription(declaration),
            ]
                .filter(Boolean)
                .join("\n")
        case "enum":
            return [
                parseDeclarationDescription(declaration),
                parseEnumDeclarationFields(declaration),
            ]
                .filter(Boolean)
                .join("\n")
        default:
            const tabs = [
                { label: 'Fields', value: 'fields', content: parseDeclarationFields(declaration) },
                { label: 'Slots', value: 'slots', content: parseDeclarationSlots(declaration) },
                { label: 'Events', value: 'events', content: parseDeclarationEvents(declaration) },
                { label: 'Css Parts', value: 'cssParts', content: parseDeclarationCssParts(declaration) },
                { label: 'Methods', value: 'methods', content: parseDeclarationMethods(declaration) },
            ].filter(tab => !!tab.content)

            return [
                `import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`,

parseDeclarationDescription(declaration),

`

## Metadata
<Tabs
                    values={${JSON.stringify(tabs.map(tab => {
                    return { label: tab.label, value: tab.value }
                })
                )}}>

                ${tabs.map(tab => {
                    return `<TabItem value="${tab.value}">
                    ${tab.content}
                    </TabItem>`
                }).join("\n")}
                </Tabs>`,
            ]
                .filter(Boolean)
                .join("\n")
    }
}

export default parseDeclaration