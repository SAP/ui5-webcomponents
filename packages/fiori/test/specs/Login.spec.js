const assert = require("chai").assert;
const PORT = require("./_port.js");

describe("Login", () => {
    before(async () => {
        await browser.url(
            `http://localhost:${PORT}/test-resources/pages/Login.html`
        );
    });

    it("Login form in a dialog button (with email instead of username), and checks if it shows error message if wrong credentials are passed", async () => {
        const dialogBtn = await $("#openDialogButton");
        const loginForm = await $("#ui5-loginForm");
        const loginBtn = await loginForm.shadow$("#ui5-login-btn");

        dialogBtn.click();
        browser.pause(1000);
        const usernameLogin = await loginForm.shadow$("#ui5-usernameID");
        const passwordLogin = await loginForm.shadow$("#ui5-passwordID");
        // await usernameLogin.addValue('wrong');
        // await passwordLogin.addValue('wrong');
        await usernameLogin.click();
        await usernameLogin.keys("a");
        await usernameLogin.keys("b");
        await usernameLogin.keys("c");
        await passwordLogin.click();
        await passwordLogin.keys("a");
        await passwordLogin.keys("b");
        await passwordLogin.keys("c");
        await loginBtn.click();
        const errorMsg = await loginForm.shadow$(".ui5-error");
        await expect(errorMsg).toHaveElementClass("ui5-error");
        // await browser.pause(1000);

        // expect(await $('#ui5-error').toExist());
    });

    it("Check if login component exists", async () => {
        const login = await $("#basicLogin");
        await expect(login).toExist();
    });

    it("Login component with header and subHeader", async () => {
        const loginWithHeader = await $("#loginWithHeader");
        const header = await loginWithHeader.shadow$("#ui5-header");
        const subHeader = await loginWithHeader.shadow$("#ui5-sub-header");
        expect(header).toExist();
        expect(subHeader).toExist();
    });

    it("Checks if the login from is disabled", async () => {
        const loginDisabled = await $("#loginDisabled");
        const username = await loginDisabled.shadow$("#ui5-usernameID");
        const password = await loginDisabled.shadow$("#ui5-passwordID");

        expect(loginDisabled).toBeDisabled();
        expect(username).not.toBeClickable();
        expect(password).not.toBeClickable();
    });
});
