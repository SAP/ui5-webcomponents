import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://newspaper";
const transform = "translate(80.5,35)";
const d = "M416 448h32v-416q0 -14 -9.5 -23t-22.5 -9h-160h-32h-192q-14 0 -23 9t-9 23v384q0 13 9 22.5t22 9.5h320q14 0 23.5 -9.5t9.5 -22.5v-288l-96 -96h128v416zM224 128q0 13 9.5 22.5t22.5 9.5h96v256h-321l1 -384h192v96zM72 320q-8 0 -8 8v48q0 8 8 8h48q8 0 8 -8v-48 q0 -8 -8 -8h-48zM312 384q8 0 8 -8v-48q0 -8 -8 -8h-144q-8 0 -8 8v48q0 8 8 8h144zM303 225q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224zM176 159q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96z M176 96q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-96q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h96zM303 288q16 0 16 -16q0 -6 -4.5 -11t-11.5 -5h-224q-6 0 -11 5t-5 11q0 7 5 11.5t11 4.5h224z";

registerIcon(name, transform, d);

export default {name, transform, d};
