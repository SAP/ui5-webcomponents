import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";

import { collectionName } from "../../AllIcons.js";
import { getRegisteredNames, getIconDataSync } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";


const main = async () => {
    const names = await getRegisteredNames();
    const data = {};
    const accData = {};

    names.forEach(name => {
        const iconData = getIconDataSync(name);

        data[name] = iconData.d;
        if (iconData.accData) {
            accData[name] = iconData.accData;
        }
    });

    const result = {
        collection: collectionName,
        data,
        accData
    }

    mkdirp.sync(path.normalize("../../dist/assets/icon-collections/"));
    fs.writeFileSync(path.normalize("../../dist/assets/icon-collections/SAP-icons.json"), JSON.stringify(result, 2, 2));
}

main();
