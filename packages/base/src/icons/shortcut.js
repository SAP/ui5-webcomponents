import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://shortcut";
const transform = "translate(144.5,35)";
const d = "M257 480q27 -3 45 -22.5t18 -46.5l-19 -169q0 -14 -8.5 -22t-22.5 -8q-14 2 -23 12t-7 22l10 116q-37 -17 -70.5 -36t-59 -43t-41 -54.5t-15.5 -68.5q0 -40 12 -64t32.5 -37.5t47.5 -19t56 -7.5h-2q14 0 23 -9t9 -23t-9 -23t-23 -9l-28 2q-36 4 -69 15t-58 33.5t-40 57 t-15 84.5t20 91.5t49.5 73t63 53.5t59.5 34l10 4l-114 2q-14 2 -23 11t-7 23q0 11 10 20.5t22 7.5h167v0z";

registerIcon(name, transform, d);

export default {name, transform, d};
