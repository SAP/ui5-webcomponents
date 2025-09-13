import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "vertical-bar-chart";
const pathData = "M454 384q-11 0-18-7.5t-7-18.5V58q0-11 7-18.5t18-7.5 18.5 7.5T480 58v300q0 11-7.5 18.5T454 384zm-204 0q-11 0-18.5-7.5T224 358V122q0-11 7.5-18.5T250 96t18 7.5 7 18.5v236q0 11-7 18.5t-18 7.5zm-96 0q-11 0-18.5-7.5T128 358V186q0-11 7.5-18.5T154 160t18 7.5 7 18.5v172q0 11-7 18.5t-18 7.5zm204 0q-11 0-18-7.5t-7-18.5V186q0-11 7-18.5t18-7.5 18.5 7.5T384 186v172q0 11-7.5 18.5T358 384zm-300 0q-11 0-18.5-7.5T32 358V250q0-11 7.5-18.5T58 224t18 7.5 7 18.5v108q0 11-7 18.5T58 384zm396 96H58q-11 0-18.5-7.5T32 454t7.5-18 18.5-7h396q11 0 18.5 7t7.5 18-7.5 18.5T454 480z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/vertical-bar-chart";
export { pathData, ltr, accData };