import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shortcut";
const viewBox = "0 -32 512 512";
const d = "M353 480q27-3 45-22.5t18-46.5l-19-169q0-14-8.5-22t-22.5-8q-14 2-23 12t-7 22l10 116q-37-17-70.5-36t-59-43-41-54.5T160 160q0-40 12-64t32.5-37.5 47.5-19 56-7.5h-2q14 0 23-9t9-23-9-23-23-9l-28 2q-36 4-69 15t-58 33.5-40 57T96 160t20 91.5 49.5 73 63 53.5 59.5 34l10 4-114 2q-14 2-23 11t-7 23q0 11 10 20.5t22 7.5h167z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
