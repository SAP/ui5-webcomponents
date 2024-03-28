export default {
    "design": {
        "control": "select",
        "options": [
            "Default",
            "Subtle",
            "Emphasized"
        ]
    },
    "wrappingType": {
        "control": "select",
        "options": [
            "None",
            "Normal"
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
    "click": {
        "description": "Fired when the component is triggered either with a mouse/tap\nor by using the Enter key.",
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
                        "text": "boolean"
                    },
                    "name": "altKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"ALT\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "ctrlKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"CTRL\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "metaKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"META\" key was pressed when the event was triggered."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "shiftKey",
                    "_ui5privacy": "public",
                    "description": "Returns whether the \"SHIFT\" key was pressed when the event was triggered."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-link"
};
//# sourceMappingURL=argTypes.js.map