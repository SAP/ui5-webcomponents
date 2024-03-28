export default {
    "wrappingType": {
        "control": "select",
        "options": [
            "None",
            "Normal"
        ]
    },
    "priority": {
        "control": "select",
        "options": [
            "High",
            "Medium",
            "Low",
            "None"
        ]
    },
    "avatar": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "footnotes": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
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
    "actions": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<NotificationAction>"
            }
        }
    },
    "close": {
        "description": "Fired when the `Close` button is pressed.",
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
                    "name": "item",
                    "_ui5privacy": "public",
                    "description": "the closed item."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.8",
    "tagName": "ui5-li-notification"
};
//# sourceMappingURL=argTypes.js.map