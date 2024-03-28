import { DocsGenerator } from "./docs/DocsGenerator";
import { DocsReader } from "./docs/DocsReader";
import { DocsWriter } from "./docs/DocsWriter";
import { DirectoryUtils } from "./DirectoryUtils";
import { MDXParser, MetadataParser, LinksParser } from "./docs/parsers";
import { ChangelogSorter } from "./docs/sorters";
const directoryUtils = new DirectoryUtils();
const docsGenerator = new DocsGenerator({
    reader: new DocsReader({
        directoryUtils,
        src: directoryUtils.joinPath("../../../docs/**/*.md"),
        ignore: ["/**/*/README.md", "/**/*/images", "/**/*/changelog", "/**/*/internal"],
    }),
    parsers: [
        new MetadataParser(),
        new MDXParser({ subTitle: "Docs" }),
        new LinksParser(),
    ],
    writer: new DocsWriter({
        directoryUtils,
        dest: directoryUtils.joinPath("../docs/storybook"),
    }),
});
const changelogGenerator = new DocsGenerator({
    reader: new DocsReader({
        directoryUtils,
        src: directoryUtils.joinPath("../docs/changelog/**/*.md"),
        ignore: ["/**/*/changelog.md"],
    }),
    parsers: [
        new MetadataParser(),
        new MDXParser({ subTitle: "Docs/Changelog" }),
    ],
    sorters: [new ChangelogSorter()],
    writer: new DocsWriter({
        directoryUtils,
        dest: directoryUtils.joinPath("../docs/storybook/99-changelog"),
    }),
});
const main = async () => {
    await docsGenerator.generate();
    await changelogGenerator.generate();
};
main();
//# sourceMappingURL=documentation-prepare.js.map