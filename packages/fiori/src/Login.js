import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
// import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import Input from "@ui5/webcomponents/dist/Input.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Label from "@ui5/webcomponents/dist/Label.js";
// Template

import LoginTemplate from "./generated/templates/LoginTemplate.lit.js";

// Styles
import LoginCSS from "./generated/themes/Login.css.js";

const metadata = {
    tag: "ui5-login",
    properties: {
        email: {
            type: Boolean,
        },
        headerText: {
            type: String,
        },
        subHeaderText: {
            type: String,
        },
        disabled: {
            type: Boolean,
        },
        error: {
            type: Boolean,
        },
    },

    managedSlots: true,

    slots: {
        header: {
            type: HTMLElement,
        },
        subHeader: {
            type: HTMLElement,
        },
        errorMessageTitle: {
            type: HTMLElement,
        },
        errorMessage: {
            type: HTMLElement,
        },
    },

    events: {},
};

class Login extends UI5Element {
    constructor() {
        super();
    }

    static get metadata() {
        return metadata;
    }

    static get render() {
        return litRender;
    }

    static get template() {
        return LoginTemplate;
    }

    static get dependencies() {
        return [Input, Button, Label];
    }

    static get styles() {
        return LoginCSS;
    }

    get _displayHeader() {
        return this.header.length || this.headerText;
    }

    get _displayError() {
        return this.errorMessage.length || this.error;
    }

    displayUser() {
        const username = this.shadowRoot.querySelector("#ui5-usernameID").value;
        const password = this.shadowRoot.querySelector("#ui5-passwordID").value;

        /** 
		Checks if email property is passed,
		if so, then it checks if the username is an email address,
		if it is an email, then it checks if it is a valid email with @isValidEmail method,
		if it is not, then it sets error property to true, which displays the error message. 
		**/
        if (this.email) {
            if (isValidEmail(username) && password) {
                this.error = false;
            } else if (!isValidEmail(username) && password) {
                this.error = true;
            } else if (isValidEmail(username) && !password) {
                this.error = true;
            } else {
                this.error = true;
            }
        }

        if (!this.email) {
            if (username && password) {
                this.error = false;
            } else if (!username && password) {
                this.error = true;
            } else if (username && !password) {
                this.error = true;
            } else {
                this.error = true;
            }
        }

        function isValidEmail(emailAddress) {
            var re =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(emailAddress).toLowerCase());
        }
    }
}

Login.define();

export default Login;
