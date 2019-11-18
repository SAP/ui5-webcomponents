import { registerIcon } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

const name = "locked";
const pathData = "M416 233q14 8 23 22.5t9 32.5v159q0 27-19 45.5T384 511H128q-27 0-45.5-18.5T64 447V288q0-18 8.5-32.5T95 233v-25l.5-28.5.5-24V143q0-30 12.5-56t34-45.5 51-31T256-1t62 11.5 51 31T403.5 87t12.5 56v90zm-256-90v10.5l-.5 20.5-.5 25.5V224h193v-81q0-33-28-56.5T256 63t-68 23.5-28 56.5zm256 145q0-14-9.5-23.5T384 255H128q-14 0-23 9.5T96 288v159q0 14 9 23.5t23 9.5h256q13 0 22.5-9.5T416 447V288zm-111 49q0 15-8 27t-21 18l44 65H192l43-65q-13-6-21-18t-8-27q0-20 14.5-34.5T256 288q20 0 34.5 14.5T305 337z";


registerIcon(name, { pathData });
