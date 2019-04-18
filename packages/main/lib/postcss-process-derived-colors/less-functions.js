const registry = require("less/lib/less/functions/function-registry");
require("less/lib/less/functions/color");
const Color = require("less/lib/less/tree/color");
const Dimension = require("less/lib/less/tree/dimension");
const lessDarken = registry.get("darken");
const lessLighten = registry.get("lighten");
const lessContrast = registry.get("contrast");
const lessFade = registry.get("fade");
const lessSaturate = registry.get("saturate");
const lessDesaturate = registry.get("desaturate");
const lessMix = registry.get("mix");
const lessSpin = registry.get("spin");

const factory = (getColorValue) => {
    const getColorInstance = colorValue => {
        return new Color(colorValue.replace("#", ""));
    };

    const darken = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessDarken(getColorInstance(colorValue), { value });
    }

    const lighten = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessLighten(getColorInstance(colorValue), { value });
    }

    const contrast = async (color, dark, light, threshold) => {
        const colorValue = await getColorValue(color);
        const darkValue = await getColorValue(dark);
        const lightValue = await getColorValue(light);
        const col1 = getColorInstance(colorValue);
        const col2 = getColorInstance(darkValue);
        const col3 = getColorInstance(lightValue);

        let thresholdValue;

        if (threshold) {
            thresholdValue = await getColorValue(threshold);
            thresholdValue = new Dimension(thresholdValue)
        }


        return lessContrast(col1, col2, col3, thresholdValue);
    }

    const fade = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessFade(getColorInstance(colorValue), {
            value
        });
    }

    const saturate = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessSaturate(getColorInstance(colorValue), {
            value
        });
    }

    const desaturate = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessDesaturate(getColorInstance(colorValue), {
            value
        });
    }

    const mix = async (color1, color2, value) => {
        const color1Value = await getColorValue(color1);
        const color2Value = await getColorValue(color2);
        const col1 = getColorInstance(color1Value);
        const col2 = getColorInstance(color2Value);
        return lessMix(col1, col2, {
            value
        });
    }

    const spin = async (col, value) => {
        const colorValue = await getColorValue(col);
        return lessSpin(getColorInstance(colorValue), {
            value
        });
    }

    const concat = async (...derivations) => {
        let result = "";

        const derivedPromises = derivations.map(derivation => getColorValue(derivation.var));

        await Promise.all(derivedPromises).then((values) => {

            values.forEach((value, i) => {
                if (i > 0) {
                    result += `, `;
                }
                result += `${derivations[i].static} ${value}`;
            })
        });

        return result;
    }

    return { darken, lighten, contrast, fade, saturate, desaturate, mix, spin, concat };
}

module.exports = factory;