export default {
    "selectionMode": {
        "control": "select",
        "options": [
            "None",
            "Single",
            "SingleStart",
            "SingleEnd",
            "SingleAuto",
            "Multiple"
        ]
    },
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<UploadCollectionItem>"
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
        "description": "Fired when selection is changed by user interaction\nin `Single` and `Multiple` modes.",
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