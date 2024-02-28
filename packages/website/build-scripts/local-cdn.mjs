import { cp, readdir, rm } from "fs/promises";
import path from "path";

await Promise.all([
    cp("../base/dist", "local-cdn/local-cdn/base/dist", {recursive: true}),
    cp("../main/dist", "local-cdn/local-cdn/main/dist", {recursive: true}),
    cp("../fiori/dist", "local-cdn/local-cdn/fiori/dist", {recursive: true}),
    cp("../icons/dist", "local-cdn/local-cdn/icons/dist", {recursive: true}),
    cp("../theming/dist", "local-cdn/local-cdn/theming/dist", {recursive: true}),
    cp("../localization/dist", "local-cdn/local-cdn/localization/dist", {recursive: true}),
    cp("../../node_modules/lit-html", "local-cdn/local-cdn/lit-html", {recursive: true}),
]);

const files = await readdir("local-cdn", {recursive: true, withFileTypes: true});
const filesToDelete = files.filter(f => {
    return f.isFile() && !f.name.endsWith(".js") && !f.name.endsWith(".svg")
});
filesToDelete.map(f => rm(path.join(f.path, f.name)));