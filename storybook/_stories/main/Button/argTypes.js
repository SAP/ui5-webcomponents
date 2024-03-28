export default {
    "design": {
        "control": "select",
        "options": [
            "Default",
            "Positive",
            "Negative",
            "Transparent",
            "Emphasized",
            "Attention"
        ]
    },
    "type": {
        "control": "select",
        "options": [
            "Button",
            "Submit",
            "Reset"
        ]
    },
    "accessibleRole": {
        "control": "select",
        "options": [
            "Button",
            "Link"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<Node>"
            }
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-button"
};
//# sourceMappingURL=argTypes.js.map