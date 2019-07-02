import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://undo";
const transform = "translate(80.5,35)";
const d = "M447 176q4 -36 -7.5 -68t-33 -56t-52.5 -38t-66 -14h-256q-13 0 -22.5 9t-9.5 23q0 13 9.5 22.5t22.5 9.5h253q35 0 63 21t34 56q4 23 -1.5 44t-19 36.5t-32.5 25t-41 9.5h-180l75 -74q9 -9 9 -22.5t-9 -22.5q-10 -10 -23 -10t-23 10l-128 128q-9 9 -9 22.5t9 22.5 l129 128q10 10 23 10t22 -10q10 -9 10 -22t-10 -23l-74 -73h172q31 0 60 -11t51.5 -30t37 -45.5t17.5 -57.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
