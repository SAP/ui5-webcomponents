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
    "selectedOption": {
        "control": {
            "type": false
        }
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IOption>"
            }
        }
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
    "label": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<HTMLElement>"
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
                        "text": "IOption",
                        "references": [
                            {
                                "name": "IOption",
                                "package": "@ui5/webcomponents",
                                "module": "dist/Select.js"
                            }
                        ]
                    },
                    "name": "selectedOption",
                    "_ui5privacy": "public",
                    "description": "the selected option."
                }
            ]
        }
    },
    "live-change": {
        "description": "Fired when the user navigates through the options, but the selection is not finalized,\nor when pressing the ESC key to revert the current selection.",
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
                        "text": "IOption",
                        "references": [
                            {
                                "name": "IOption",
                                "package": "@ui5/webcomponents",
                                "module": "dist/Select.js"
                            }
                        ]
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
    "since": "0.8.0",
    "tagName": "ui5-select"
};
//# sourceMappingURL=argTypes.js.map