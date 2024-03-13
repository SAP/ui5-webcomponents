# Creating Website Samples

Components features or states are demonstrated via samples.

## Run the Website

Runs project build + website start

```bash
yarn start:website
```

However, in most cases you have the project built, so faster would be
to just start the website:

```bash
cd packages/website
yarn start
```

**Note:** In case of issues with the second flow, most likely you need `yarn build` in the root.


## Create New Sample

The website app is developed in its own package `packages/website` and the samples are placed in `/packages/website/docs/_samples` folder.

For example, the Button samples can be found in `/packages/website/docs/_samples/main/Button`

A regular component sample consists of a folder with 3 files: `{sample_name}.md`, `main.js` and `sample.html`:

- in the `main.js` file, we import the components and assets (icons, illustration) required by the sample.

- in the `sample.html` file, we use the web components as in regular HTML page

- in the `.md` file we instantiate the `Editor` component (file editor + preview) that will display your sample and show the code behind it.

Just copy and paste this:
```md
import html from '!!raw-loader!./sample.html';
import js from '!!raw-loader!./main.js';

<Editor html={html} js={js} />
```


## Show the Sample in the Website

In the previous step we have created our sample. Now it's time to show and document it.


- Open the `packages/website/docs/_components_pages` folder

- Find your component's `.mdx` file.

For example, `packages/website/docs/_components_pages/main/Button.mdx`

- Import the newly created sample

For example, `import Basic from "../../_samples/main/Button/MyNewSample/MyNewSample.md";`

- Instantiate the sample and add title + description

For example:
```.md
### My New Sample
The Button supports several designs to indicate the priority or the nature of the action.

<MyNewSample />

```

**Note:** Changes in the sample files (`.md`, `.html`, `.js`) are detected and the app reloads. However, changes in the `.mdx` file are not watched - restart of the app is needed.

### Conventions 

#### Sample Name
- The sample name and the folder that includes the sample files should match the `.md` file name. 

For example, `packages/website/docs/_samples/main/Button/IconOnly/IconOnly.md` (`IconOnly` as folder and `IconOnly.md` file).

- Regarding the naming, it's best to consult with KM and use existing ones as reference.

#### Sample Title and Description
The title ("My New Sample") and the description ("The Button..") will be displayed on top of the sample itself. Adding title and description is recommended -  they help viewers better understand what they are looking at.


#### Sample Order
Add new samples in the "More Samples" section where it best fits among the existing samples.


#### The "Basic" Sample
All components have sample, called "Basic" and it's used as the first sample, displayed right-after the component's overview. Don't use "Basic" for other samples.
