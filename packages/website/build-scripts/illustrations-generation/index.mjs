import fs from "fs";
import path from "path";

let counter = 0;

const SAPIllustrationConfig = {
    title: "SAP Illustration",
    dir: "illustrations",
    componentName: "SAPIllustration",
    illustrationPrefix: "sapIllus",
};

const TNTIllustrationConfig = {
    title: "TNT Illustration",
    dir: "illustrations-tnt",
    componentName: "TntIllustration",
    illustrationPrefix: "tnt",
}

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
    fs.writeFileSync(targetFile, content, { encoding: 'utf8', flag: 'w' });
};

const commonImports = `
import React from 'react';
import clsx from "clsx";
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import IllustrationCard from '../src/components/IllustrationCard';
`

const _generateIllustrationsPage = (sourceDir, config) => {
    let imports = ``;
    let illustrations = ``;
    let uniqueIllustrationNames = new Set();

    fs.readdirSync(sourceDir).forEach(function (file, i, files) {
        if (file.endsWith(".svg") && file !== "sapIllus-Patterns.svg") {
            const fileName = file.slice(0, -4);
            const [prefix, size, illustrationName] = fileName.split("-");
            const fileNameImportName = replaceFirstNumber(fileName.replaceAll("-", ""));

            const svgImport = `${capitalize(fileNameImportName)}Svg`;

            uniqueIllustrationNames.add(illustrationName);

            imports += `
import ${svgImport} from "../local-cdn/local-cdn/${config.dir}/${file}";
`;

            illustrations += `
                            <${svgImport} id="${fileName}"/>`


            if (size === "Spot" && !files.some(f => f.includes(`${prefix}-Dot-${illustrationName}.svg`))) {
                illustrations += `
                            <${svgImport} id="${fileName.replace("-Spot-", "-Dot-")}"/>`
            }
        }
    });

    const classDef = `export default function ${config.componentName}() {
        const uniqueIllustrationNames = ${JSON.stringify([...uniqueIllustrationNames])};
        const prefix = "${config.illustrationPrefix}";

        return (
                <div style={{
                        padding: "2rem 2rem",
                    }}>
                    <svg style={{ display: "none" }}>
                        <defs>${illustrations}
                        </defs>
                    </svg>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Heading as="h2" style={{ marginBottom: "0.125rem" }}>${config.title}</Heading>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                        <span role="presentation"></span>
                        <input className="illustrations__search" type="search" placeholder="Filter illustrations..." aria-label="Filter illustrations" onInput={function (e) {
                            [...document.querySelectorAll("[data-illustration-name]")].forEach(illustrationWrapper => {
                                const illustrationName = illustrationWrapper.getAttribute("data-illustration-name").toLowerCase();
                                illustrationWrapper.classList.toggle("hidden", !illustrationName.includes(e.target.value))
                            })

                            document
                                .querySelector(".illustration__not__found")
                                .classList
                                .toggle("hidden", ![...document.querySelectorAll("[data-illustration-name]")].every(illustrationWrapper => illustrationWrapper.classList.contains("hidden")))
                        }} />
                    </div>
                    </div>
                    <div className="illustration__grid">
                        {
                            uniqueIllustrationNames.map(illustration => <IllustrationCard name={illustration} prefix={prefix}/>)
                        }
                    </div>
                    <div className="illustration__not__found hidden">
                        <h2>No matching illustrations found</h2>
                    </div>
                </div>
        );
    }`

    return { imports, classDef };
};

const generateIllustrationsPage = (sourceDir, config) => {
    const { imports, classDef } = _generateIllustrationsPage(sourceDir, config);

    writeFile(config.dir, `
${commonImports}
${imports}
${classDef}`);
};


generateIllustrationsPage(path.join(path.resolve(), "./local-cdn/local-cdn/illustrations"), SAPIllustrationConfig);
generateIllustrationsPage(path.join(path.resolve(), "./local-cdn/local-cdn/illustrations-tnt"), TNTIllustrationConfig);
