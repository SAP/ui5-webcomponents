// the following script goes through all the stories in the _stories folder and generates the {ComponentName}Overview.mdx file
import fs from 'fs/promises';
import path from 'path';
const STORIES_ROOT_FOLDER_NAME = '../_stories';
// Function to split camel case string
const splitCamelCase = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
// Function to generate file content
const fileContent = (component) => `import { Meta } from "@storybook/blocks";
import * as ComponentStories from "./${component}.stories.ts";

import { componentInfo } from "./argTypes.ts";

import { Footer } from "@sb/components/footer/Footer.tsx";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from "@storybook/addon-docs";

<Meta name="${splitCamelCase(component)} Overview" of={ComponentStories} />

<header>
  <span className="sb-ui5-title">
    <Title />
  </span>
  {componentInfo.since && (
    <span className="sb-ui5-component-heading-since">
      <b>v{componentInfo.since}</b>
    </span>
  )}
</header>
<div className="sb-ui5-component-package">
  <b>{componentInfo.package}</b>
</div>
<h2 className="sb-ui5-control-tag">&lt;{componentInfo.tagName}&gt;</h2>
<Subtitle />
<Description />
<br />
<Primary />
<ArgsTable story={PRIMARY_STORY} />
{!componentInfo.showDefaultStoryOnly && <Stories />}
<Footer />
`;
// Recursive function to process each directory
const processDirectory = async (dirPath) => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            // If the entry is a directory, process it
            await processDirectory(fullPath);
        }
        else if (entry.isFile() && entry.name.endsWith('.stories.ts')) {
            // If the entry is a file and matches the criteria, generate overview file
            const componentName = entry.name.replace('.stories.ts', '');
            await fs.writeFile(path.join(dirPath, `${componentName}Overview.mdx`), fileContent(componentName));
            // remove old files if exist
            await fs.rm(path.join(dirPath, `01-${componentName}Overview.mdx`), { force: true });
            console.log(`Generated ${componentName}Overview.mdx`);
        }
    }
};
// Initial call to process the root stories directory
const main = async () => {
    const rootDir = path.join(__dirname, STORIES_ROOT_FOLDER_NAME);
    await processDirectory(rootDir);
};
main();
//# sourceMappingURL=overviews-prepare.js.map