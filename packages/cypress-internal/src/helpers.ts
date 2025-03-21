declare global {
    function ui5AccDescribe(title: string, fn: (this: Mocha.Suite) => void): Mocha.Suite | void;
}

globalThis.ui5AccDescribe = (title: string, fn: (this: Mocha.Suite) => void): Mocha.Suite | void => {
    if (Cypress.env('ui5AccTasksRegistered') === true) {
        return describe.only(`${title}`, function (this: Mocha.Suite) {
            before(() => {
                cy.injectAxe({ axeCorePath: "../../node_modules/axe-core/axe.min.js" });
            });
            fn.call(this);
        });
    }
};

export { }