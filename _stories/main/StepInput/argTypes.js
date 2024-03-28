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
    "valueStateMessage": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "value-state-change": {
        "description": "Fired before the value state of the component is updated internally.\nThe event is preventable, meaning that if it's default action is\nprevented, the component will not update the value state.",
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
                        "text": "string"
                    },
                    "name": "valueState",
                    "_ui5privacy": "public",
                    "description": "The new `valueState` that will be set."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "valid",
                    "_ui5privacy": "public",
                    "description": "Indicator if the value is in between the min and max value."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.13",
    "tagName": "ui5-step-input"
};
//# sourceMappingURL=argTypes.js.map