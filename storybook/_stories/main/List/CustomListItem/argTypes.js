export default {
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
    "tagName": "ui5-li-custom",
    "showDefaultStoryOnly": true
};
//# sourceMappingURL=argTypes.js.map