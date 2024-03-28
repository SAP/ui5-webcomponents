export default {
    "growing": {
        "control": "select",
        "options": [
            "Button",
            "Scroll",
            "None"
        ]
    },
    "mode": {
        "control": "select",
        "options": [
            "None",
            "SingleSelect",
            "MultiSelect"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<ITableRow>"
            }
        }
    },
    "columns": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<TableColumn>"
            }
        }
    },
    "row-click": {
        "description": "Fired when a row in `Active` mode is clicked or `Enter` key is pressed.",
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
                    "name": "row",
                    "_ui5privacy": "public",
                    "description": "the activated row."
                }
            ]
        }
    },
    "popin-change": {
        "description": "Fired when `ui5-table-column` is shown as a pop-in instead of hiding it.",
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
                        "text": "Array"
                    },
                    "name": "poppedColumns",
                    "_ui5privacy": "public",
                    "description": "popped-in columns."
                }
            ]
        }
    },
    "selection-change": {
        "description": "Fired when selection is changed by user interaction\nin `SingleSelect` and `MultiSelect` modes.",
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
                        "text": "Array"
                    },
                    "name": "selectedRows",
                    "_ui5privacy": "public",
                    "description": "An array of the selected rows."
                },
                {
                    "type": {
                        "text": "Array"
                    },
                    "name": "previouslySelectedRows",
                    "_ui5privacy": "public",
                    "description": "An array of the previously selected rows."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-table"
};
//# sourceMappingURL=argTypes.js.map