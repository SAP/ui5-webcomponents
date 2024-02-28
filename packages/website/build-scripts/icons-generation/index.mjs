import fs from "fs";
import path from "path";

const capitalize = (str) => {
    const firstLetter = str.charAt(0)
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = str.slice(1);
    const capitalizedWord = firstLetterCap + remainingLetters
    return capitalizedWord;
}

const _generateIconsPage = (source) => {
    let imports = ``;
    let icons = ``;

    fs.readdirSync(source).forEach(function (file) {
        if (file.endsWith(".svg")) {
            const fileName = file.slice(0, -4);
            const fileNameImportName = fileName.replaceAll("-", "");

            const iconNameImport = `${fileNameImportName}SvgName`;
            const svgImport = `${capitalize(fileNameImportName)}Svg`;

        imports += `
import ${iconNameImport} from "../local-cdn/local-cdn/icons/dist/${fileName}.js";
import ${svgImport} from "../local-cdn/local-cdn/icons/dist/v5/${fileName}.svg";
`;

        icons += `
<div style={{display: "flex", alignItems: "center", flexDirection: "column", padding: "1rem"}}>
    <div style={{width: "4rem", height: "4rem"}}><${svgImport} fill="var(--ifm-font-color-base)"/></div>
    <span style={{ color: "var(--ifm-font-color-base)", textAlign: "center", marginTop: "0.5rem" }}>{${iconNameImport}}</span>
</div>`;
        }
    });

    return { imports, icons};
};

const generateIconsPage = (source) => {
   const { imports, icons} = _generateIconsPage(source);

    const content =`
import React from 'react';
import Layout from '@theme/Layout';
${imports}

    export default function Icons() {
    return (
        <Layout title="UI5 Web Components Icons" description="UI5 Web Components Icons">
            <div style={{display: "grid", padding: "5rem 2rem", columnGap: "2rem", rowGap: "2rem", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                ${icons}
            </div>
        </Layout>
    );
}`;

    const targetPath = path.resolve("./icons");
    const targetFile = path.resolve(`${targetPath}/index.js`);

    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
    }
    fs.writeFileSync(targetFile,content,{ encoding:'utf8', flag:'w' });
};


generateIconsPage(path.join(path.resolve(), "./local-cdn/local-cdn/icons/dist/v5"));
