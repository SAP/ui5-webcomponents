export default {
    "valueState": {
        "control": "select",
        "options": [
            "None",
            "Success",
            "Warning",
            "Error",
            "Information"
        ]
    },
    "overflowPriority": {
        "control": "select",
        "options": [
            "Default",
            "NeverOverflow",
            "AlwaysOverflow"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ToolbarSelectOption>"
            }
        }
    },
    "change": {
        "description": "Fired when the selected option changes.",
        "control": {
            "type": false
        },
        "table": {
            "category": "events"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "type": {
                        "text": "HTMLElement"
                    },
                    "name": "selectedOption",
                    "_ui5privacy": "public",
                    "description": "the selected option."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.17.0",
    "tagName": "ui5-toolbar-select",
    "showDefaultStoryOnly": true
};
//# sourceMappingURL=argTypes.js.map