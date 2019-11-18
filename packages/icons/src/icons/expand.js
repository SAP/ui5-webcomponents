import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "expand";
const pathData = "M256 128v112H144v32h112v112h32V272h112v-32H288V128h-32zm208-96H208v32h256v384H80V320H48v128q0 13 9 22.5t23 9.5h384q13 0 22.5-9.5T496 448V64q0-14-9.5-23T464 32zM23 28Q11 17 23 5q5-5 11-5t11 5l92 99q9 10 9 23t-9 22L45 250q-5 5-11.5 5T22 250t-5-11.5 5-11.5l87-95q6-5 0-11z";


registerIcon(name, { pathData });
