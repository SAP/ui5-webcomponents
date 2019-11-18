import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "present";
const pathData = "M240 480q37 0 70-12t59.5-33.5T415 384t27-64h33q-8 41-29.5 76.5t-52.5 61-70.5 40T240 512q-50 0-93.5-19t-76-51.5-51.5-76T0 272q0-43 14.5-82T55 120t61-52.5T192 38v32q-34 8-63.5 27t-51 45.5T44 202t-12 70q0 43 16.5 81t45 66 66 44.5T240 480zm-16-192V144q0-7 5-11.5t11-4.5q16 0 16 16v112h144q16 0 16 16t-16 16H224zm111-64l26-79-67-49h83l26-79 26 79h83l-68 49 26 79-67-49z";


registerIcon(name, { pathData });
