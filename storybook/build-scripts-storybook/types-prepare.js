import fs from "fs/promises";
import path from "path";
const FIORI_INTERFACES_FILE_NAME = '../_stories/fiori/Interfaces.mdx';
const MAIN_INTERFACES_FILE_NAME = '../_stories/main/Interfaces.mdx';
const FIORI_ENUM_FILE_NAME = '../_stories/fiori/Enums.mdx';
const MAIN_ENUM_FILE_NAME = '../_stories/main/Enums.mdx';
const interfaceDeclarations = new Map();
const enumDeclarations = [];
const generateFileContent = (content, kind) => {
    return `import { Meta } from "@storybook/blocks";

import { Footer } from "@sb/components/footer/Footer.tsx";
import {
	Title
} from "@storybook/addon-docs";

<Meta name="${kind}" />

<header>
	<span className="sb-ui5-title">
	<Title>${kind}</Title>
	</span>
</header>

${content}

<Footer />`;
};
const registerDeclaration = (declaration) => {
    const declarationName = `${declaration._ui5package}/${declaration.name}`;
    declaration.implementations = [];
    interfaceDeclarations.set(declarationName, declaration);
};
const processDeclaration = (classDeclaration, reference) => {
    const declarationName = `${reference.package}/${reference.name}`;
    const declaration = interfaceDeclarations.get(declarationName);
    if (declaration) {
        declaration.implementations?.push(`${classDeclaration._ui5package}/${classDeclaration.name}`);
    }
};
const prepareTypes = async () => {
    const api = JSON.parse((await fs.readFile(`./.storybook/custom-elements.json`)).toString());
    api.modules.map(moduleDoc => {
        moduleDoc.declarations?.forEach(declaration => {
            if (declaration.kind === "interface") {
                registerDeclaration(declaration);
            }
            if (declaration.kind === "enum") {
                enumDeclarations.push(declaration);
            }
        });
        return moduleDoc;
    })
        .map(moduleDoc => {
        moduleDoc.declarations?.forEach(declaration => {
            if (declaration.kind === "class" && declaration._ui5implements) {
                declaration._ui5implements.forEach(interfaceDeclaration => processDeclaration(declaration, interfaceDeclaration));
            }
        });
        return moduleDoc;
    });
};
const generateInterfacesSection = (interfaces) => {
    let content = "";
    if (interfaces.length) {
        content += `| Name | Description | Implementations |
| --- | --- | --- |
${interfaces.map((interfaceE) => {
            return `| <b>${interfaceE.name}</b> | ${interfaceE.description}${renderSince(interfaceE._ui5since)}${renderDeprecated(interfaceE.deprecated)} | ${interfaceE.implementations?.join("<br /><br />")}`;
        }).join("\n")}`;
    }
    return content;
};
const renderDeprecated = (deprecated) => {
    if (!deprecated) {
        return "";
    }
    return typeof deprecated === "string" ? `<br /><b>Deprecated:</b> ${deprecated}` : "<br /><b>Deprecated:</b> This field is deprecated";
};
const renderSince = (since) => {
    if (!since) {
        return "";
    }
    return `<br /><b>Since:</b> ${since}`;
};
const renderDescription = (description) => {
    if (!description) {
        return "";
    }
    return description ? `<br />${description.trim().replaceAll(/\n/g, "<br />")}` : "";
};
const generateEnumsSection = (enums) => {
    let content = "";
    if (enums.length) {
        content += `| Name | Description | Available fields |
| --- | --- | --- |
`;
        content += enums.map((enumDeclaration) => {
            return `| <b>${enumDeclaration.name}</b> | ${enumDeclaration.description}${renderSince(enumDeclaration._ui5since)}${renderDeprecated(enumDeclaration.deprecated)} | <ul>${enumDeclaration.members?.map(member => { return `<li>${enumDeclaration.name}.<b>${member.name}</b>${renderDescription(member.description)}${renderSince(member._ui5since)}${renderDeprecated(member.deprecated)}</li>`; }).join(" ")}</ul> |`;
        }).join("\n");
    }
    return content;
};
const generateContent = async () => {
    const mainInterfaces = [...interfaceDeclarations.values()].filter(declaration => declaration._ui5package === "@ui5/webcomponents");
    const fioriInterfaces = [...interfaceDeclarations.values()].filter(declaration => declaration._ui5package === "@ui5/webcomponents-fiori");
    const mainEnums = enumDeclarations.filter(declaration => declaration._ui5package === "@ui5/webcomponents");
    const fioriEnums = enumDeclarations.filter(declaration => declaration._ui5package === "@ui5/webcomponents-fiori");
    if (mainInterfaces.length) {
        await fs.writeFile(path.join(__dirname, MAIN_INTERFACES_FILE_NAME), generateFileContent(generateInterfacesSection(mainInterfaces), "Interfaces"));
    }
    if (mainEnums.length) {
        await fs.writeFile(path.join(__dirname, MAIN_ENUM_FILE_NAME), generateFileContent(generateEnumsSection(mainEnums), "Enums"));
    }
    if (fioriInterfaces.length) {
        await fs.writeFile(path.join(__dirname, FIORI_INTERFACES_FILE_NAME), generateFileContent(generateInterfacesSection(fioriInterfaces), "Interfaces"));
    }
    if (fioriEnums.length) {
        await fs.writeFile(path.join(__dirname, FIORI_ENUM_FILE_NAME), generateFileContent(generateEnumsSection(fioriEnums), "Enums"));
    }
};
prepareTypes().then(generateContent).then(() => console.log("Enums/interfaces documentation pages are generated"));
//# sourceMappingURL=types-prepare.js.map