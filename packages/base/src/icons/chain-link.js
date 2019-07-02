import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://chain-link";
const transform = "translate(80,35)";
const d = "M417 412q13 -13 19 -29t6 -33t-6 -33.5t-19 -29.5l-118 -117q-26 -26 -62 -26q-17 0 -33 6.5t-29 19.5l-11 11q-3 3 -5 6l-4 6l21 21l21 -21l1 -1q16 -16 39 -16q22 0 40 16l117 118q17 17 17 39.5t-17 39.5l-11 12q-16 16 -40 16q-23 0 -39 -16l-75 -76h-45l97 98 q13 13 29 19.5t33 6.5q37 0 63 -26zM201 104h45l-78 -78q-25 -25 -62 -25q-17 0 -33 6t-29 19l-11 12q-26 26 -26 62t26 62l100 101q13 13 29 19t33 6q37 0 63 -25l11 -12l2 -2l-22 -22l-26 22q-11 7 -28 7q-24 0 -39 -16l-101 -100q-16 -18 -16 -40t16 -40l12 -11 q16 -16 39 -16q22 0 40 16z";

registerIcon(name, transform, d);

export default {name, transform, d};
