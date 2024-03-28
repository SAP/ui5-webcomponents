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
                "summary": "Array<TreeItemBase>"
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
    "walk": {
        "description": "Perform Depth-First-Search walk on the tree and run a callback on each node",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "callback",
                    "type": {
                        "text": "WalkCallback",
                        "references": [
                            {
                                "name": "WalkCallback",
                                "package": "@ui5/webcomponents",
                                "module": "dist/Tree.js"
                            }
                        ]
                    },
                    "description": "function to execute on each node of the tree with 3 arguments: the node, the level and the index",
                    "_ui5privacy": "public"
                }
            ],
            "returnValue": {
                "type": {
                    "text": "void"
                }
            }
        }
    },
    "item-toggle": {
        "description": "Fired when a tree item is expanded or collapsed.\n\n**Note:** You can call `preventDefault()` on the event object to suppress the event, if needed.\nThis may be handy for example if you want to dynamically load tree items upon the user expanding a node.\nEven if you prevented the event's default behavior, you can always manually call `toggle()` on a tree item.",
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
    "item-mouseover": {
        "description": "Fired when the mouse cursor enters the tree item borders.",
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
                    "description": "the hovered item."
                }
            ]
        }
    },
    "item-mouseout": {
        "description": "Fired when the mouse cursor leaves the tree item borders.",
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
                    "description": "the hovered item."
                }
            ]
        }
    },
    "item-click": {
        "description": "Fired when a tree item is activated.",
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
    "item-delete": {
        "description": "Fired when the Delete button of any tree item is pressed.\n\n**Note:** A Delete button is displayed on each item,\nwhen the component `mode` property is set to `Delete`.",
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
        "description": "Fired when selection is changed by user interaction\nin `SingleSelect`, `SingleSelectBegin`, `SingleSelectEnd` and `MultiSelect` modes.",
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
                },
                {
                    "type": {
                        "text": "Array"
                    },
                    "name": "previouslySelectedItems",
                    "_ui5privacy": "public",
                    "description": "An array of the previously selected items."
                },
                {
                    "type": {
                        "text": "HTMLElement"
                    },
                    "name": "targetItem",
                    "_ui5privacy": "public",
                    "description": "The item triggering the event."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.8",
    "tagName": "ui5-tree"
};
//# sourceMappingURL=argTypes.js.map