import fs from "fs";
import path from "path";
let counter = 0;

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
}

const commonImports = `
import React from 'react';
import clsx from "clsx";
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
`

const _generateIconsPage = (sourceDir, collection, version) => {
    let imports = ``;
    let icons = ``;

    fs.readdirSync(sourceDir).forEach(function (file) {
        if (file.endsWith(".svg")) {
            const fileName = file.slice(0, -4);
            const fileNameImportName = replaceFirstNumber(fileName.replaceAll("-", ""));

            const iconNameImport = `${fileNameImportName}SvgName`;
            const svgImport = `${capitalize(fileNameImportName)}Svg`;

        imports += `
import ${iconNameImport} from "../local-cdn/local-cdn/${collection}/dist/${fileName}.js";
import ${svgImport} from "../local-cdn/local-cdn/${collection}/dist/${version}/${fileName}.svg";
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

    return { imports, icons};
};

const generateIconsPage = (sourceDir, collection, version) => {
   const { imports, icons} = _generateIconsPage(sourceDir, collection, version);

    const content =`
${commonImports}

${imports}

export default function SAPIcons() {
    return (
            <div style={{ padding: "2rem 2rem" }}>
                
                <Heading as="h2" style={{ marginBottom: "0.125rem" }}>SAP Icons</Heading>
                <Link to="https://www.npmjs.com/package/@ui5/webcomponents-icons">@ui5/webcomponents-icons</Link>

                <div className="icon__grid">
                    ${icons}
                </div>
            </div>
    );
}`;

    const targetPath = path.resolve(`./${collection}`);
    const targetFile = path.resolve(`${targetPath}/index.js`);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
    fs.writeFileSync(targetFile,content,{ encoding:'utf8', flag:'w' });
};

const generateTNTIconsPage = (sourceDir, collection, version) => {
    const { imports, icons} = _generateIconsPage(sourceDir, collection, version);
 
     const content =`
${commonImports}
import CopySvg from "../local-cdn/local-cdn/icons/dist/v5/copy.svg";

${imports}
 
 export default function SAPTNTIcons() {
     return (
             <div style={{
                     padding: "2rem 2rem",
                 }}>
                 
                 <Heading as="h2" style={{ marginBottom: "0.125rem" }}>SAP TNT Icons</Heading>
                 <Link to="https://www.npmjs.com/package/@ui5/webcomponents-icons-tnt">@ui5/webcomponents-icons-tnt</Link>
 
                 <div className="icon__grid">
                     ${icons}
                 </div>
             </div>
     );
 }`;
 
     const targetPath = path.resolve(`./${collection}`);
     const targetFile = path.resolve(`${targetPath}/index.js`);
 
     if (!fs.existsSync(targetPath)) {
         fs.mkdirSync(targetPath, { recursive: true });
     }
     fs.writeFileSync(targetFile, content,{ encoding:'utf8', flag:'w' });
};

const generateBSIconsPage = (sourceDir, collection, version) => {
    const { imports, icons} = _generateIconsPage(sourceDir, collection, version);
 
     const content =`
${commonImports}
 
import CopySvg from "../local-cdn/local-cdn/icons/dist/v5/copy.svg";
${imports}
 
 export default function SAPBSIcons() {
     return (
             <div style={{
                     padding: "2rem 2rem",
                 }}>
                 
                 <Heading as="h2" style={{ marginBottom: "0.125rem" }}>SAP Business Suite Icons</Heading>
                 <Link to="https://www.npmjs.com/package/@ui5/webcomponents-icons-business-suite">@ui5/webcomponents-icons-business-suite</Link>
 
                 <div className="icon__grid">
                     ${icons}
                 </div>
             </div>
     );
 }`;
 
     const targetPath = path.resolve(`./${collection}`);
     const targetFile = path.resolve(`${targetPath}/index.js`);
 
     if (!fs.existsSync(targetPath)) {
         fs.mkdirSync(targetPath, { recursive: true });
     }
     fs.writeFileSync(targetFile, content,{ encoding:'utf8', flag:'w' });
};

generateIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons/dist/v5"), "icons", "v5");
generateTNTIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons-tnt/dist/v3"), "icons-tnt", "v3");
generateBSIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons-business-suite/dist/v2"), "icons-business-suite", "v2");
