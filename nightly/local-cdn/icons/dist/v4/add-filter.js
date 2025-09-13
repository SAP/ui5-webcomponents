import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";
import { ICON_ADD_FILTER } from "../generated/i18n/i18n-defaults.js";

const name = "add-filter";
const pathData = "M512 383.963v31.996h-95.99v95.991h-31.997v-95.99h-95.991v-31.997h95.99v-95.991h31.997v95.99H512zM352.016 31.997q19.998 0 28.997 16.998t-2 32.997L266.024 211.979q-9.999 10-9.999 21.998v117.989l-99.99 90.99q-7 5-12 5-5.998 0-10.998-4.5t-5-11.498v-197.98q0-13-8.999-21.999-31.996-36.996-56.994-64.993L23.548 102.99 6.049 81.992q-10.999-15.998-2-32.997t27.998-16.998h319.969zM243.026 189.98l4.5-5 11.999-13.998 17.498-20.498 19.998-23.497q23.998-27.998 54.995-62.994H32.046h1l8 9.499L61.044 96.99l26.497 30.497 26.998 30.497 20.498 22.997 7.999 9q16.998 18.998 16.998 43.995v161.984l63.994-58.994v-102.99q0-24.997 18.998-43.996z";
const ltr = false;
const accData = ICON_ADD_FILTER;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, accData, collection, packageName });

export default "SAP-icons-v4/add-filter";
export { pathData, ltr, accData };