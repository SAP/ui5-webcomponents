const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
const rimraf = require("rimraf");
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const removeMetadata = (buffer) => {
    return buffer.toString().replace(/^---[\s\S]+?---/g, "");
};

// parseNameNoNumbers: removes numbers and dots, dashes from the name
const parseNameNoNumbers = (name) =>
    capitalize(
        name
            .replace(/\.md$/, "")
            .replace(/[-0-9\.]/g, " ")
            .replace(/^\s+|\s+$/g, "")
    );

const directories = [
    {
        src: "../../../docs",
        exclude: ["README.md", "images"],
        parseName: parseNameNoNumbers,
    },
    {
        src: "../docs/changelog",
        exclude: ["changelog.md"],
        subDir: () => "99-changelog",
        parseName: (name) => capitalize(name),
    },
];

const parseMdxTitle = (filePath, parseName) => {
    // returns mdx title in the following formats:
    // - Docs/Changelog/{articleName}
    // - Docs/{{articleGroup}}/{articleName}
    // - Docs/{articleName}
    const fileName = filePath.split("/").pop();
    const articleName = parseName(fileName);

    const folderName = filePath.split("/").slice(-2, -1).pop();
    let articleGroup = null;
    if (folderName) {
        articleGroup = parseNameNoNumbers(folderName);
    }

    const articleTitle = `Docs/${
        articleGroup ? `${articleGroup}/` : ""
    }${articleName}`;

    return articleTitle;
};

const writeMDXFile = ({ destPath, articleName, articleContent }) => {
    fsPromises.writeFile(
        path.join(destPath.replace("md", "mdx")),
        `import { Meta } from '@storybook/blocks';

<Meta title="${articleName}" />

${articleContent}`
    );
};

const getFiles = async (dir) => {
    const subdirs = await fsPromises.readdir(dir);
    const files = await Promise.all(
        subdirs.map(async (subdir) => {
            const res = path.join(dir, subdir);
            return (await fsPromises.stat(res)).isDirectory()
                ? getFiles(res)
                : res;
        })
    );
    return files.reduce((a, f) => a.concat(f), []);
};

const onFile = ({ exclude, parseName, subDir, filePath, srcPath }) => {
    // handle excluded files
    if (exclude && filePath.match(new RegExp(exclude.join("|")))) {
        return;
    }

    const pathRelative = filePath.replace(srcPath, "");

    // create sub directory structure described in subDir
    let fileLocation =
        (typeof subDir === "function" ? `/${subDir()}` : "") + pathRelative;

    const mdxTitle = parseMdxTitle(fileLocation, parseName);

    fileLocation = fileLocation
        // remove last directory from path
        .replace(/\/[^/]*$/, "");

    const destPath = path.join(__dirname, "../docs/storybook", fileLocation);

    // create directory if it doesn't exist
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }

    const mdxFileDest = path.join(
        __dirname,
        "../docs/storybook",
        (typeof subDir === "function" ? `${subDir()}/` : "") +
            filePath.replace(srcPath, "")
    );

    // write mdx file
    writeMDXFile({
        destPath: mdxFileDest,
        articleName: mdxTitle,
        articleContent: removeMetadata(fs.readFileSync(filePath)),
    });
};

const prepareDocs = async () => {
    rimraf.sync(path.join(__dirname, "../docs/storybook/*"));
    const promises = directories.map(async (data) => {
        const srcPath = path.join(__dirname, data.src);
        const files = await getFiles(srcPath);

        console.log(`Process ${files.length} files inside ${srcPath}`);

        const filesPromises = files.map((filePath) =>
            onFile({
                ...data,
                filePath,
                srcPath,
            })
        );

        return Promise.all(filesPromises);
    });

    return Promise.all(promises);
};

// sort files in ../docs/storybook/99-changelog by version number
// e.g 1.3.2, 1.2.3-rc.3 1.2.3-rc.2 1.2.3-rc.1, 1.2.1, 1.2.0, rc16, rc15

const sortChangelog = () => {
    console.log("Start sorting changelog files");
    const changelogDir = path.join(__dirname, "../docs/storybook/99-changelog");
    const changelogFiles = fs.readdirSync(changelogDir);

    const changelogFilesSorted = changelogFiles.sort((a, b) => {
        const aVersion = a.replace(/\.mdx$/, "");
        const bVersion = b.replace(/\.mdx$/, "");

        const aVersionSplit = aVersion.split(".");
        const bVersionSplit = bVersion.split(".");

        const aVersionMajor = parseInt(aVersionSplit[0]);
        const bVersionMajor = parseInt(bVersionSplit[0]);

        const aVersionMinor = parseInt(aVersionSplit[1]);
        const bVersionMinor = parseInt(bVersionSplit[1]);

        const aVersionPatch = parseInt(aVersionSplit[2]);
        const bVersionPatch = parseInt(bVersionSplit[2]);

        if (aVersionMajor > bVersionMajor) {
            return -1;
        } else if (aVersionMajor < bVersionMajor) {
            return 1;
        } else {
            if (aVersionMinor > bVersionMinor) {
                return -1;
            } else if (aVersionMinor < bVersionMinor) {
                return 1;
            } else {
                if (aVersionPatch > bVersionPatch) {
                    return -1;
                } else if (aVersionPatch < bVersionPatch) {
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    });

    changelogFilesSorted.forEach((file, index) => {
        const fileDest = path.join(changelogDir, `${index + 1}-${file}`);
        const fileSrc = path.join(changelogDir, file);
        fs.renameSync(fileSrc, fileDest);
    });

    console.log("Done sorting changelog files");
};

const main = async () => {
    await prepareDocs();
    sortChangelog();

    console.log("Done processing!");
};

main();
