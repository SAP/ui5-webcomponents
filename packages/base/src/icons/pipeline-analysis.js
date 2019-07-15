import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://pipeline-analysis";
const viewBox = "0 0 512 512";
const d = "M64.833 448v-96h48q16 0 16-16 0-6-4.5-11t-11.5-5h-48v-64h48q16 0 16-16 0-6-4.5-11t-11.5-5h-48v-64h48q16 0 16-16t-16-16h-48V64h48q16 0 16-16 0-6-4.5-11t-11.5-5h-48q-14 0-23 9.5t-9 22.5v384q0 14 9 23t23 9h48q16 0 16-16 0-6-4.5-11t-11.5-5h-48zm406 0q10 0 8-10l-92-368q-2-6-8-6h-116q-7 0-7 6l-92 368q-2 4 .5 7t6.5 3h300zm-103-320h-94l8-32h78zm24 96h-142l16-64h110zm24 96h-190l16-64h158zm24 96h-238l16-64h206z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
