export default {
    "dateValue": {
        "control": {
            "type": false
        }
    },
    "dateValueUTC": {
        "control": {
            "type": false
        }
    },
    "startDateValue": {
        "control": {
            "type": false
        }
    },
    "endDateValue": {
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
    "primaryCalendarType": {
        "control": "select",
        "options": [
            "Gregorian",
            "Islamic",
            "Japanese",
            "Buddhist",
            "Persian"
        ]
    },
    "secondaryCalendarType": {
        "control": "select",
        "options": [
            "Gregorian",
            "Islamic",
            "Japanese",
            "Buddhist",
            "Persian"
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
    "isValid": {
        "description": "Checks if a value is valid against the current date format of the DatePicker.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "value",
                    "type": {
                        "text": "string"
                    },
                    "description": "A value to be tested against the current date format",
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
    "isInValidRange": {
        "description": "Checks if a date is between the minimum and maximum date.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "parameters": [
                {
                    "name": "value",
                    "type": {
                        "text": "string"
                    },
                    "description": "A value to be checked",
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
    "formatValue": {
        "description": "Formats a Java Script date object into a string representing a locale date\naccording to the `formatPattern` property of the DatePicker instance",
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
                "description": "The date as string"
            }
        }
    },
    "closePicker": {
        "description": "Closes the picker.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "void"
                }
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
    "isOpen": {
        "description": "Checks if the picker is open.",
        "table": {
            "category": "methods"
        },
        "UI5CustomData": {
            "returnValue": {
                "type": {
                    "text": "boolean"
                },
                "description": "true if the picker is open, false otherwise"
            }
        }
    },
    "change": {
        "description": "Fired when the input operation has finished by pressing Enter or on focusout.",
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
        "description": "Fired when the value of the component is changed at each key stroke.",
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
    "value-state-change": {
        "description": "Fired before the value state of the component is updated internally.\nThe event is preventable, meaning that if it's default action is\nprevented, the component will not update the value state.",
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
                    "name": "valueState",
                    "_ui5privacy": "public",
                    "description": "The new `valueState` that will be set."
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
    "since": "1.0.0-rc.8",
    "tagName": "ui5-daterange-picker"
};
//# sourceMappingURL=argTypes.js.map