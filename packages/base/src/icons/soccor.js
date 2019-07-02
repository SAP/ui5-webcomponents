import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://soccor";
const transform = "translate(39,35)";
const d = "M210 224l18 -94l-75 -38l-77 57l38 95zM361 415l57 -57l-39 -77l-94 20v94zM267 490q55 0 103 -21t84 -57t56.5 -84.5t20.5 -103.5t-20.5 -103t-56.5 -84t-84 -56.5t-103 -20.5q-56 0 -104.5 20.5t-84.5 56.5t-56.5 84t-20.5 103t20.5 103.5t56.5 84.5t84.5 57t104.5 21z M475 102q17 28 27.5 59t10.5 63l-33 115q-35 57 -91.5 95t-121.5 38q-48 0 -96 -23v-34l-75 -77h-44q-15 -26 -24 -55t-9 -59q0 -31 9.5 -61t26 -57t39 -50t49.5 -40h10l114 -38q35 0 68.5 12.5t63.5 32.5l-38 12l-19 57l76 77l57 -39v-28z";

registerIcon(name, transform, d);

export default {name, transform, d};
