import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "clone-from-git";
const pathData = "M396 197q31 0 53 22t22 53q0 32-22 53.5T396 347q-32 0-53.5-21.5T321 272q0-21 11-40l-74-74q-6 4-12 6.5t-14 4.5v194q26 5 43 25.5t17 47.5q0 32-22 53.5T216 511q-31 0-53-21.5T141 436q0-27 17-47.5t42-25.5V169q-25-6-42-26.5T141 95q0-22 13-41l-31-31 22-23 31 32q18-12 40-12 32 0 54 22t22 53q0 11-3.5 21.5T280 135l74 75q20-13 42-13zM260 95q0-18-13-30.5T216 52q-17 0-30 13t-13 30 13 30.5 30 13.5 30.5-13.5T260 95zm136 220q18 0 30.5-12.5T439 272t-12.5-30.5T396 229q-11 0-18 4-25 13-25 39 0 18 12.5 30.5T396 315zM260 436q0-18-13.5-30.5T216 393q-18 0-30.5 12.5T173 436t13 30.5 30 12.5q18 0 31-12.5t13-30.5z";
const ltr = false;
const accData = null;
const collection = "tnt-v2";
const packageName = "@ui5/webcomponents-icons-tnt";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "tnt-v2/clone-from-git";
export { pathData, ltr, accData };