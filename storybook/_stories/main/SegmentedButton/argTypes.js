export default {
    "mode": {
        "control": "select",
        "options": [
            "SingleSelect",
            "MultiSelect"
        ]
    },
    "selectedItem": {
        "control": {
            "type": false
        }
    },
    "selectedItems": {
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
                "summary": "Array<ISegmentedButtonItem>"
            }
        }
    },
    "selection-change": {
        "description": "Fired when the selected item changes.",
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
                        "text": "ISegmentedButtonItem",
                        "references": [
                            {
                                "name": "ISegmentedButtonItem",
                                "package": "@ui5/webcomponents",
                                "module": "dist/SegmentedButton.js"
                            }
                        ]
                    },
                    "name": "selectedItem",
                    "_ui5privacy": "public",
                    "description": "the pressed item.",
                    "deprecated": "deprecated since 1.14.0 and will be removed in the next major release, use the `selectedItems` parameter instead."
                },
                {
                    "type": {
                        "text": "Array<ISegmentedButtonItem>",
                        "references": [
                            {
                                "name": "ISegmentedButtonItem",
                                "package": "@ui5/webcomponents",
                                "module": "dist/SegmentedButton.js"
                            }
                        ]
                    },
                    "name": "selectedItems",
                    "_ui5privacy": "public",
                    "description": "an array of selected items.",
                    "_ui5since": "1.14.0"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.6",
    "tagName": "ui5-segmented-button"
};
//# sourceMappingURL=argTypes.js.map