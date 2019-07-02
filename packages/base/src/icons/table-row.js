import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://table-row";
const transform = "translate(80.5,35)";
const d = "M416 448q14 0 23 -9t9 -23v-384q0 -14 -9 -23t-23 -9h-384q-13 0 -22.5 9t-9.5 23v384q0 14 9.5 23t22.5 9h384zM136 136h-104v-104h104v104zM136 416h-104v-107h104v107zM280 136h-112v-104h112v104zM280 416h-112v-107h112v107zM416 136h-104v-104h104v104zM416 416 h-104v-107h104v107z";

registerIcon(name, transform, d);

export default {name, transform, d};
