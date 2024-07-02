export default {
    "selectionMode": {
        "control": "select",
        "options": [
            "None",
            "Single",
            "SingleStart",
            "SingleEnd",
            "SingleAuto",
            "Multiple",
            "Delete"
        ]
    },
    "separators": {
        "control": "select",
        "options": [
            "All",
            "Inner",
            "None"
        ]
    },
    "growing": {
        "control": "select",
        "options": [
            "Button",
            "Scroll",
            "None"
        ]
    },
    "accessibleRole": {
        "control": "select",
        "options": [
            "List",
            "Menu",
            "Tree",
            "ListBox"
        ]
    },
    "listItems": {
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
                "summary": "Array<ListItemBase | ListItemGroup>"
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
    "item-click": {
        "description": "Fired when an item is activated, unless the item's `type` property\nis set to `Inactive`.",
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
                    "description": "The clicked item."
                }
            ]
        }
    },
    "item-close": {
        "description": "Fired when the `Close` button of any item is clicked\n\n**Note:** This event is only applicable to list items that can be closed (such as notification list items),\nnot to be confused with `item-delete`.",
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
                    "description": "the item about to be closed."
                }
            ]
        }
    },
    "item-toggle": {
        "description": "Fired when the `Toggle` button of any item is clicked.\n\n**Note:** This event is only applicable to list items that can be toggled (such as notification group list items).",
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
                    "description": "the toggled item."
                }
            ]
        }
    },
    "item-delete": {
        "description": "Fired when the Delete button of any item is pressed.\n\n**Note:** A Delete button is displayed on each item,\nwhen the component `selectionMode` property is set to `Delete`.",
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
                    "description": "the deleted item."
                }
            ]
        }
    },
    "selection-change": {
        "description": "Fired when selection is changed by user interaction\nin `Single`, `SingleStart`, `SingleEnd` and `Multiple` selection modes.",
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
                        "text": "Array<ListItemBase>",
                        "references": [
                            {
                                "name": "ListItemBase",
                                "package": "@ui5/webcomponents",
                                "module": "dist/ListItemBase.js"
                            }
                        ]
                    },
                    "name": "selectedItems",
                    "_ui5privacy": "public",
                    "description": "An array of the selected items."
                },
                {
                    "type": {
                        "text": "Array<ListItemBase>",
                        "references": [
                            {
                                "name": "ListItemBase",
                                "package": "@ui5/webcomponents",
                                "module": "dist/ListItemBase.js"
                            }
                        ]
                    },
                    "name": "previouslySelectedItems",
                    "_ui5privacy": "public",
                    "description": "An array of the previously selected items."
                }
            ]
        }
    },
    "move-over": {
        "description": "Fired when a movable list item is moved over a potential drop target during a dragging operation.\n\nIf the new position is valid, prevent the default action of the event using `preventDefault()`.",
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
                        "text": "object"
                    },
                    "name": "source",
                    "_ui5privacy": "public",
                    "description": "Contains information about the moved element under `element` property."
                },
                {
                    "type": {
                        "text": "object"
                    },
                    "name": "destination",
                    "_ui5privacy": "public",
                    "description": "Contains information about the destination of the moved element. Has `element` and `placement` properties."
                }
            ]
        }
    },
    "move": {
        "description": "Fired when a movable list item is dropped onto a drop target.\n\n**Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.",
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
                        "text": "object"
                    },
                    "name": "source",
                    "_ui5privacy": "public",
                    "description": "Contains information about the moved element under `element` property."
                },
                {
                    "type": {
                        "text": "object"
                    },
                    "name": "destination",
                    "_ui5privacy": "public",
                    "description": "Contains information about the destination of the moved element. Has `element` and `placement` properties."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "tagName": "ui5-list"
};
//# sourceMappingURL=argTypes.js.map