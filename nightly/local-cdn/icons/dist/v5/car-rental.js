import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "car-rental";
const pathData = "M139 256q17 0 30 13t13 30-13 30-30 13-30-13-13-30 13-30 30-13zm373 198q0 11-7.5 18.5T486 480h-28q-11 0-18.5-7.5T432 454v-19H80v19q0 11-7.5 18.5T54 480H26q-11 0-18.5-7.5T0 454V198q0-3 2-9l35-98q10-26 33-42.5T122 32h264q27 0 49.5 15T469 88l41 100q1 3 1.5 5.5t.5 5.5v255zM373 256q17 0 30 13t13 30-13 30-30 13-30-13-13-30 13-30 30-13zM122 83q-12 0-22 7t-14 18l-24 65h386l-27-66q-5-11-14-17.5T386 83H122zM51 384h410V224H51v160z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/car-rental";
export { pathData, ltr, accData };