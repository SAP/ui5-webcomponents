export default {
    "additionalTextState": {
        "control": "select",
        "options": [
            "None",
            "Success",
            "Warning",
            "Error",
            "Information"
        ]
    },
    "type": {
        "control": "select",
        "options": [
            "Inactive",
            "Active",
            "Detail",
            "Navigation"
        ]
    },
    "highlight": {
        "control": "select",
        "options": [
            "None",
            "Success",
            "Warning",
            "Error",
            "Information"
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
    "imageContent": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "deleteButton": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IButton>"
            }
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-li",
    "showDefaultStoryOnly": true
};
//# sourceMappingURL=argTypes.js.map