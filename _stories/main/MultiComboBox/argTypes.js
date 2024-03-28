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
    "filter": {
        "control": "select",
        "options": [
            "StartsWithPerTerm",
            "StartsWith",
            "Contains",
            "None"
        ]
    },
    "open": {
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
                "summary": "Array<IMultiComboBoxItem>"
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
    "selection-change": {
        "description": "Fired when selection is changed by user interaction.",
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
                        "text": "Array<IMultiComboBoxItem>",
                        "references": [
                            {
                                "name": "IMultiComboBoxItem",
                                "package": "@ui5/webcomponents",
                                "module": "dist/MultiComboBox.js"
                            }
                        ]
                    },
                    "name": "items",
                    "_ui5privacy": "public",
                    "description": "an array of the selected items."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "0.11.0",
    "tagName": "ui5-multi-combobox"
};
//# sourceMappingURL=argTypes.js.map