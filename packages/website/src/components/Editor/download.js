import Tar from "tarts";
import packageJSON from "./sample/sample-package.js";
import tsConfigJSON from "./sample/sample-tsconfig.js";

const preprocessContent = (_content) => {
  let content = _content.replace("main.js", "./main.ts");
  content = content.replaceAll(`<!-- playground-fold-end -->`, "");
  content = content.replaceAll(`<!-- playground-fold -->`, "");
  content = content.replaceAll(`/* playground-hide-end */`, "");
  content = content.replaceAll(`/* playground-hide */`, "");
  content = content.replace(`import "./playground-support.js";`, "");
  return content.replace(/^\s*[\r\n]+(?=import)/, '');
}

const covertToFilesArray = (sampleFilesInfo = {}) => {
  return Object.keys(sampleFilesInfo).map(fileName => {
    const fileInfo = sampleFilesInfo[fileName];
    return {
      name: fileInfo.name,
      content: preprocessContent(fileInfo.content),
    };
  });
}

const download = (sampleFilesInfo) => {
  const sampleFiles = covertToFilesArray(sampleFilesInfo) || [];

  const tar = Tar([
    {
      name: "package.json",
      content: packageJSON,
    },
    {
      name: "tsconfig.json",
      content: tsConfigJSON,
    },
    ...sampleFiles]);

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([tar], { type: "application/tar" }));
    a.download = "ui5-webcomponents-sample.tar";
    a.click();
};

export default download;
