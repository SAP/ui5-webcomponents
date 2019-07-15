import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://per-diem";
const viewBox = "0 -32 512 512";
const d = "M189 288h37V128h-32v128h-42zM446 5q27 0 49 16l7 6v-45q-29-12-54-12-51 0-79 21t-42 66h-37l8 32h23v16h-31l8 32h28q11 38 43.5 61.5T449 222q34 0 57-14l4-2-10-39-5 4q-14 9-33 12.5t-38-.5-33.5-15.5T371 137h119l-8-32H367V89h115l-8-32H372q17-52 74-52zM34 0h192v-32H34q-14 0-23 9T2 0v416q0 13 9 22.5t23 9.5h64v32h32v-32h192v32h32v-32h64q13 0 22.5-9.5T450 416v-96h-32v32H34V0zm288 384h32v32h-32v-32zm-224 0h32v32H98v-32z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
