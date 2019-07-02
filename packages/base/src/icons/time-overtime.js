import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://time-overtime";
const transform = "translate(50.5,35)";
const d = "M95 126q38 -10 52.5 -25t14.5 -38q0 -29 -19 -46t-48 -22v-27h-24v25q-30 6 -46 21t-21 45l43 4q3 -22 24 -34v61q-33 11 -46.5 27t-13.5 40q0 49 60 60v14h24v-14q54 -11 60 -52l-41 -6q-2 10 -6.5 15t-12.5 10v-58zM71 184q-9 -4 -15 -11t-6 -15q0 -16 21 -26v52z M114 37q8 8 8 20q0 11 -6.5 17t-20.5 11v-58q15 3 19 10zM416 208q0 -16 -16 -16h-144h-16h-16v16v16v112q0 16 16 16t16 -16v-112h144q16 0 16 -16zM256 480q53 0 99.5 -20t81.5 -55t55 -81.5t20 -99.5q0 -49 -17.5 -92.5t-47.5 -77.5t-71 -56t-88 -28v32q40 6 75.5 25.5 t61 49t40.5 67.5t15 80q0 46 -17.5 87t-48 71.5t-71.5 48t-87 17.5q-38 0 -72.5 -12t-62.5 -33.5t-49 -51t-31 -63.5h-33q11 41 34.5 76.5t56 61t72.5 40t85 14.5z";

registerIcon(name, transform, d);

export default {name, transform, d};
