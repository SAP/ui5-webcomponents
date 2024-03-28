export default {
    "mode": {
        "control": "select",
        "options": [
            "None",
            "SingleSelect",
            "SingleSelectBegin",
            "SingleSelectEnd",
            "SingleSelectAuto",
            "MultiSelect",
            "Delete"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IUploadCollectionItem>"
            }
        }
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
    "item-delete": {
        "description": "Fired when the delete button of any item is pressed.",
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
                    "description": "The `ui5-upload-collection-item` which was deleted."
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
                    "name": "selectedItems",
                    "_ui5privacy": "public",
                    "description": "An array of the selected items."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents-fiori",
    "since": "1.0.0-rc.7",
    "tagName": "ui5-upload-collection"
};
//# sourceMappingURL=argTypes.js.map