import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "table-chart";
const pathData = "M205 342V239H102v103h103zM102 478h103V376H102v102zm137 0h102V376H239v102zM102 205h103V103H102v102zm137 137h102V239H239v103zm0-137h102V103H239v102zm136 34v103h103V239H375zm0 137v102h103V376H375zm103-171V103H375v102h103zM17 239q17 0 17 17v69q0 17-17 17-6 0-11.5-5.5T0 325v-69q0-7 4.5-12t12.5-5zM0 462v-68q0-17 17-17t17 17v68q0 17-17 17-6 0-11.5-5T0 462zm0-274v-68q0-17 17-17t17 17v68q0 17-17 17-6 0-11.5-5T0 188zm68-85q0-15 10-24.5t24-9.5h376q14 0 24 9.5t10 24.5v375q0 14-10 24t-24 10H102q-14 0-24-9.5T68 478V103zM118 0h69q17 0 17 17 0 7-5.5 12T187 34h-69q-7 0-12-4.5T101 17q0-17 17-17zm137 0h68q17 0 17 17 0 7-5 12t-12 5h-68q-17 0-17-17t17-17zm138 0h68q17 0 17 17 0 7-5.5 12T461 34h-68q-8 0-13-4.5T375 17q0-17 18-17z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v4";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v4/table-chart";
export { pathData, ltr, accData };