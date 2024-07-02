export default {
    "state": {
        "control": "select",
        "options": [
            "None",
            "Positive",
            "Critical",
            "Negative",
            "Information"
        ]
    },
    "accessibleRole": {
        "control": "select",
        "options": [
            "None",
            "Dialog",
            "AlertDialog"
        ]
    },
    "header": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "footer": {
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
                "summary": "Array<HTMLElement>"
            }
        }
    },
    "applyFocus": {
        "description": "Focuses the element denoted by `initialFocus`, if provided,\nor the first focusable element otherwise.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                },
                "description": "Promise that resolves when the focus is applied"
            }
        }
    },
    "before-close": {
        "description": "Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. **This event does not bubble.**",
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
                    "name": "escPressed",
                    "_ui5privacy": "public",
                    "description": "Indicates that `ESC` key has triggered the event."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-dialog"
};
//# sourceMappingURL=argTypes.js.map