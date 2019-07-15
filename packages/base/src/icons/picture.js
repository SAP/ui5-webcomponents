import { registerIcon } from "../SVGIconRegistry";

const name = "sap-icon://picture";
const viewBox = "0 0 512 512";
const d = "M448 480q14 0 23-9t9-23V64q0-13-9-22.5T448 32H64q-14 0-23 9.5T32 64v384q0 14 9 23t23 9h384zm0-32H64V128h384v320zM320 320l96-160H224zm-94-96H96v160h140q-5-11-8.5-22.5T224 336q0-20 7-38t19-32zm42 71q-5 9-8.5 19.5T256 336q0 34 23.5 57t56.5 23q34 0 57-23t23-57q0-19-8-35t-22-27l-66 109z";

registerIcon(name, viewBox, d);

export default { name, viewBox, d };
