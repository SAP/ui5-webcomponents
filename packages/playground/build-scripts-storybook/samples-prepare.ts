import path from "path";
import { StorybookApiGenerator } from "./api/StorybookApiGenerator";

const apiJsonFiles = [
    path.join(__dirname, "../../base/dist/api.json"),
    path.join(__dirname, "../../main/dist/api.json"),
    path.join(__dirname, "../../fiori/dist/api.json"),
];

const storiesFiles = [
    path.join(__dirname, "../_stories/main"),
    path.join(__dirname, "../_stories/fiori"),
];

const STORIES_WRITE_FOLDER_NAME = "../_stories";

const storybookApiGenerator = new StorybookApiGenerator();
storybookApiGenerator.generate(
    apiJsonFiles,
    storiesFiles,
    path.join(__dirname, STORIES_WRITE_FOLDER_NAME)
);
