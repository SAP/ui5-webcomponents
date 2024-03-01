import fs from "fs";
import path from "path";

let counter = 0;

const SAPIconsConfig = {
    title: "SAP Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons",
    npmPackage: "@ui5/webcomponents-icons",
    version: "v5",
    dir: "icons",
    componentName: "SAPIcons",
};

const SAPTNTIconsConfig = {
    title: "SAP TNT Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt",
    npmPackage: "@ui5/webcomponents-icons-tnt",
    version: "v3",
    dir: "icons-tnt",
    componentName: "SAPTNTIcons",
};

const SAPBSIconsConfig = {
    title: "SAP Business Suite Icons",
    npmLink: "https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite",
    npmPackage: "@ui5/webcomponents-icons-business-suite",
    version: "v2",
    dir: "icons-business-suite",
    componentName: "SAPBSIcons"
};

const replaceFirstNumber = (str) => {
    const firstLetter = str.charAt(0);
    if (!isNaN(firstLetter)) {
        return `X${++counter}${str.slice(1)}`;
    }
    return str;
}

const capitalize = (str) => {
    const firstLetter = str.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters;
    return capitalizedWord;
};

const writeFile = (targetDir, content) => {
    const targetPath = path.resolve(`./${targetDir}`);
    const targetFile = path.resolve(`${targetPath}/index.js`);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
    fs.writeFileSync(targetFile, content,{ encoding:'utf8', flag:'w' });
};

const commonImports = `
import React from 'react';
import clsx from "clsx";
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
`

const additionalImports = `
import CopySvg from "../local-cdn/local-cdn/icons/dist/v5/copy.svg";
import AcceptSvg from "../local-cdn/local-cdn/icons/dist/v5/accept.svg";
`;


const _generateIconsPage = (sourceDir, config) => {
    let imports = ``;
    let icons = ``;

    fs.readdirSync(sourceDir).forEach(function (file) {
        if (file.endsWith(".svg")) {
            const fileName = file.slice(0, -4);
            const fileNameImportName = replaceFirstNumber(fileName.replaceAll("-", ""));

            const iconNameImport = `${fileNameImportName}SvgName`;
            const svgImport = `${capitalize(fileNameImportName)}Svg`;

        imports += `
import ${iconNameImport} from "../local-cdn/local-cdn/${config.dir}/dist/${fileName}.js";
import ${svgImport} from "../local-cdn/local-cdn/${config.dir}/dist/${config.version}/${fileName}.svg";
`;

        icons += `
<div
    tabIndex="-1"
    title="Copy the icon name"
    className="icon__wrapper"
    onClick={function(e) { 
        navigator.clipboard.writeText(${iconNameImport}); 
        const target = e.target;
        target.classList.add("icon__wrapper--copied");

        setTimeout(() => {
            target.classList.remove("icon__wrapper--copied");
        }, 500)
    }}>
    <CopySvg className="icon__wrapper__copy"/>
    <div className="icon__wrapper__svg"><${svgImport} fill="var(--ifm-font-color-base)"/></div>
    <span className="icon__wrapper__title">{${iconNameImport}}</span>
</div>`;
        }
    });

    const classDef = `export default function ${config.componentName}() {
        return (
                <div style={{
                        padding: "2rem 2rem",
                    }}>
                    
                    <Heading as="h2" style={{ marginBottom: "0.125rem" }}>${config.title}</Heading>
                    <Link to="${config.npmLink}">${config.npmPackage}</Link>
    
                    <div className="icon__grid">
                        ${icons}
                    </div>
                </div>
        );
    }`

    return { imports, classDef};
};

const generateIconsPage = (sourceDir, config) => {
    const { imports, classDef} = _generateIconsPage(sourceDir, config);

    let content
    if (config.componentName === "SAPIcons" ) {
        content =`
${commonImports}
${imports}
${classDef}`;
    } else {
        content =`
${commonImports}
${additionalImports}
${imports}
${classDef}`;
    }
   
    writeFile(config.dir, content);
};


generateIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons/dist/v5"), SAPIconsConfig);
generateIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons-tnt/dist/v3"), SAPTNTIconsConfig);
generateIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons-business-suite/dist/v2"), SAPBSIconsConfig);
