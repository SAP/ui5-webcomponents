export default {
    "dateValue": {
        "control": {
            "type": false
        }
    },
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
    "openPicker": {
        "description": "Opens the picker.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                },
                "description": "Resolves when the picker is open"
            }
        }
    },
    "closePicker": {
        "description": "Closes the picker",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "Promise<void>"
                },
                "description": "Resolves when the picker is closed"
            }
        }
    },
    "isOpen": {
        "description": "Checks if the picker is open",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "boolean"
                }
            }
        }
    },
    "formatValue": {
        "description": "Formats a Java Script date object into a string representing a locale date and time\naccording to the `formatPattern` property of the TimePicker instance",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "date",
                    "type": {
                        "text": "Date"
                    },
                    "description": "A Java Script date object to be formatted as string",
                    "_ui5privacy": "public"
                }
            ],
            "returnValue": {
                "type": {
                    "text": "string"
                },
                "description": "formatted value"
            }
        }
    },
    "isValid": {
        "description": "Checks if a value is valid against the current `formatPattern` value.\n\n**Note:** an empty string is considered as valid value.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "value",
                    "type": {
                        "text": "string | undefined"
                    },
                    "description": "The value to be tested against the current date format",
                    "_ui5privacy": "public"
                }
            ],
            "returnValue": {
                "type": {
                    "text": "boolean"
                }
            }
        }
    },
    "change": {
        "description": "Fired when the input operation has finished by clicking the \"OK\" button or\nwhen the text in the input field has changed and the focus leaves the input field.",
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
                    "name": "value",
                    "_ui5privacy": "public",
                    "description": "The submitted value."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "valid",
                    "_ui5privacy": "public",
                    "description": "Indicator if the value is in correct format pattern and in valid range."
                }
            ]
        }
    },
    "input": {
        "description": "Fired when the value of the `ui5-time-picker` is changed at each key stroke.",
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
                    "name": "value",
                    "_ui5privacy": "public",
                    "description": "The current value."
                },
                {
                    "type": {
                        "text": "boolean"
                    },
                    "name": "valid",
                    "_ui5privacy": "public",
                    "description": "Indicator if the value is in correct format pattern and in valid range."
                }
            ]
        }
    }
};
export const componentInfo = {
    "package": "@ui5/webcomponents",
    "since": "1.0.0-rc.6",
    "tagName": "ui5-time-picker"
};
//# sourceMappingURL=argTypes.js.map