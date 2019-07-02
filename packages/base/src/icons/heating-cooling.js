import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://heating-cooling";
const transform = "translate(59.5,35)";
const d = "M208 471l22 -87v-54q-39 -6 -65 -37t-26 -73t26 -72.5t65 -37.5v-53l-26 -87l-21 139l-114 -71l70 117l-139 11l120 54l-120 67h139l-70 115l117 -70zM230 153q-22 6 -38 26.5t-16 44.5q0 26 16 46.5t38 26.5v-144zM491 203h-37l19 -52h-39l-17 52h-49l-11 -21l24 -17 l18 -38h-37l-26 18l-11 -17l25 -43h51l18 -30h-51l19 -34l-7 -25l-25 6l-19 34l-24 -37l-17 33l22 34l-24 43h-38v37h32l45 74l-45 75h-32v37h38l24 42l-22 33l18 34l24 -36l18 34l26 6l6 -26l-19 -32h42l-18 -34l-42 3l-25 -44l10 -17l27 18h38l-19 -37l-24 -17l11 -21h49 l17 38h39l-19 -38h37l19 -18zM287 220l-31 -36v72z";

registerIcon(name, transform, d);

export default {name, transform, d};
