const fs = require('fs');
const Ajv = require('ajv');
const path = require('path');

// Load your JSON schema
const extenalSchema = require('./schema.json');
const internalSchema = require('./schema-internal.json');

// Load your JSON data from the input file
const inputFilePath = path.join(process.cwd(), "dist/custom-elements.json"); // Update with your file path
const customManifest = fs.readFileSync(inputFilePath, 'utf8');
const inputDataInternal = JSON.parse(customManifest);

const clearProps = (data) => {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] === "object") {
                if (["enum", "interface"].includes(data[i].kind)) {
                    data.splice(i, 1);
                    i--;
                } else {
                    clearProps(data[i]);
                }
            }
        }
    } else if (typeof data === "object") {
        Object.keys(data).forEach(prop => {
            if (prop.startsWith("_ui5")) {
                delete data[prop];
            } else if (typeof data[prop] === "object") {
                clearProps(data[prop]);
            }
        });
    }

    return data;
}

const inputDataExternal = clearProps(JSON.parse(JSON.stringify(inputDataInternal)));

const ajv = new Ajv({ allowUnionTypes: true, allError: true })

let validate = ajv.compile(internalSchema)

// Validate the JSON data against the schema
if (validate(inputDataInternal)) {
    console.log('Validation internal custom-elements successful');
} else {
    console.error('Validation of internal custom-elements failed:', ajv.errorsText(validate.errors));
    throw new Error("Validation of internal custom-elements failed");
}

validate = ajv.compile(extenalSchema)

// Validate the JSON data against the schema
if (validate(inputDataExternal)) {
    console.log('Validation external custom-elements successful');
    fs.writeFileSync(inputFilePath, JSON.stringify(inputDataExternal, null, 2), 'utf8');
    fs.writeFileSync(inputFilePath.replace("custom-elements", "custom-elements-internal"), JSON.stringify(inputDataInternal, null, 2), 'utf8');
} else {
    console.error('Validation of external custom-elements failed:', ajv.errorsText(validate.errors));
    throw new Error("Validation of external custom-elements failed");
}