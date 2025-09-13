import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_DISPLAY } from "../generated/i18n/i18n-defaults.js";

const name = "display";
const pathData = "M490 334q10 14 16 30.5t6 35.5q0 23-9 43.5T479 479t-35.5 24-43.5 9-43.5-9-35.5-24-24-35.5-9-43.5q0-6 1-9-8-3-16-5t-17-2q-16 0-33 7 0 2 .5 4.5t.5 4.5q0 23-9 43.5T191 479t-35.5 24-43.5 9-43.5-9T33 479 9 443.5 0 400q0-38 22-66l74-161q2-4 6.5-11.5T113 147t13.5-12.5T143 128q22-2 33.5 5.5T193 150q6 11 7 25 2 6-1.5 11t-8.5 7q-8 4-14-2-3-3-5-6l-1-2q-2-2-2-6-1-4-2-7-3-10-14-10-13 0-19 10.5t-8 15.5L75 295q9-3 18-5t19-2q35 0 63 20t41 51q9-3 19-5t21-2 20.5 2 19.5 5q12-31 40-51t64-20q17 0 36 7l-50-109q-2-5-8-15.5T360 160q-10 0-15 10-1 3-2 7l-2 8q-2 3-5 6-6 6-14 2-13-5-11-18 1-14 7-25 5-9 17-16.5t34-5.5q8 1 16 6.5t14 12.5 10.5 14.5T416 173zM112 480q33 0 56.5-23.5T192 400t-23.5-56.5T112 320t-56.5 23.5T32 400t23.5 56.5T112 480zm288 0q33 0 56.5-23.5T480 400t-23.5-56.5T400 320t-56.5 23.5T320 400t23.5 56.5T400 480z";
const ltr = false;
const accData = ICON_DISPLAY;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/display";
export { pathData, ltr, accData };