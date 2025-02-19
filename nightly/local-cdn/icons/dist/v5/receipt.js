import { registerIcon } from "@ui5/webcomponents-base/dist/asset-registries/Icons.js";

const name = "receipt";
const pathData = "M230 333q11 0 18.5 7t7.5 18-7.5 18.5T230 384h-44q-11 0-18.5-7.5T160 358t7.5-18 18.5-7h44zm0-205q11 0 18.5 7.5T256 154t-7.5 18-18.5 7h-44q-11 0-18.5-7t-7.5-18 7.5-18.5T186 128h44zm0 109q11 0 18.5 7t7.5 18-7.5 18.5T230 288h-44q-11 0-18.5-7.5T160 262t7.5-18 18.5-7h44zM422 45q11 0 18.5 7t7.5 18v416q0 11-7.5 18.5T422 512h-77q-9 0-18-7l-27-26-19 24q-7 9-20 9h-88q-15 0-22-13l-19-32H90q-11 0-18.5-7T64 442V26q0-11 7.5-18.5T90 0h83q11 0 19 8l22 25 23-25q8-8 19-8h83q11 0 19 8l34 37h30zM320 192q-13 0-22.5-9.5T288 160t9.5-22.5T320 128t22.5 9.5T352 160t-9.5 22.5T320 192zm0 38q13 0 22.5 9.5T352 262t-9.5 22.5T320 294t-22.5-9.5T288 262t9.5-22.5T320 230zm0 96q13 0 22.5 9.5T352 358t-9.5 22.5T320 390t-22.5-9.5T288 358t9.5-22.5T320 326zm77-230h-16q-11 0-19-8l-34-37h-61l-34 37q-8 8-19 8-12 0-18-8l-34-37h-47v365h31q16 0 22 13l19 32h62l29-36q6-7 18-9 12 0 19 7l40 38h42V96z";
const ltr = false;
const accData = null;
const collection = "SAP-icons-v5";
const packageName = "@ui5/webcomponents-icons";

registerIcon(name, { pathData, ltr, collection, packageName });

export default "SAP-icons-v5/receipt";
export { pathData, ltr, accData };