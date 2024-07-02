export default {
    "design": {
        "control": "select",
        "options": [
            "Set1",
            "Set2",
            "Set3",
            "Neutral",
            "Information",
            "Positive",
            "Negative",
            "Critical"
        ]
    },
    "wrappingType": {
        "control": "select",
        "options": [
            "None",
            "Normal"
        ]
    },
    "size": {
        "control": "select",
        "options": [
            "S",
            "L"
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
    },
    "icon": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IIcon>"
            }
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "2.0.0",
    "tagName": "ui5-tag"
};
//# sourceMappingURL=argTypes.js.map