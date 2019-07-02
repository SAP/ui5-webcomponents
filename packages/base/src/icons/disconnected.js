import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://disconnected";
const transform = "translate(80.5,35)";
const d = "M419 49l30 -29l-19 -20l-47 43l-20 -19q-26 -26 -57 -26q-32 0 -55 26l-50 47l162 162l50 -48q25 -23 25 -57t-25 -57l-8 -7zM390 94q15 13 15 34t-14 33l-28 27l-116 -116l26 -25v-1h1q14 -16 32 -16t34 16zM198 200q5 -3 5 -9t-5 -9q-5 -5 -10 -5t-8 5l-39 39l-39 -39 l-46 45q-26 26 -26 59t26 58l15 16l-71 69l23 19l67 -69l12 14q24 25 57 25q35 0 60 -25l45 -49l-38 -38l12 -11l26 -27q5 -4 5 -10.5t-5 -9.5q-4 -4 -8 -4t-8 4l-41 39l-49 -50l11 -10zM220 345l-24 26q-15 15 -37 15q-18 0 -33 -15l-47 -49q-15 -15 -17 -36q0 -20 17 -37 l23 -22z";

registerIcon(name, transform, d);

export default {name, transform, d};
