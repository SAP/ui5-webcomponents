export default {
    "default": {
        "control": {
            "type": "text"
        },
        "table": {
            "type": {
                "summary": "Array<IColorPaletteItem>"
            }
        }
    },
    "showAt": {
        "description": "Shows the ColorPalettePopover.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "opener",
                    "type": {
                        "text": "HTMLElement"
                    },
                    "description": "the element that the popover is shown at",
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
    "openPopover": {
        "description": "Shows the ColorPalettePopover.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "opener",
                    "type": {
                        "text": "HTMLElement"
                    },
                    "description": "the element that the popover is shown at",
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
    "item-click": {
        "description": "Fired when the user selects a color.",
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
                        "text": "string"
                    },
                    "name": "color",
                    "_ui5privacy": "public",
                    "description": "the selected color"
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.16",
    "tagName": "ui5-color-palette-popover"
};
//# sourceMappingURL=argTypes.js.map