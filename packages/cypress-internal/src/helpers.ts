declare global {
    function ui5AccDescribe(title: string, fn: (this: Mocha.Suite) => void, page?: string): Mocha.Suite | void;
}

globalThis.ui5AccDescribe = (title: string, fn: (this: Mocha.Suite) => void, page?: string): Mocha.Suite | void => {
    if (Cypress.env('ui5AccTasksRegistered') === "axe") {
         return describe.only(`${title}`, function (this: Mocha.Suite) {
             before(() => {
                if (page) {
                    cy.visit(page);
                }
                cy.injectAxe({ axeCorePath: "../../node_modules/axe-core/axe.min.js" });
             });
             fn.call(this);
         });
     } else if (Cypress.env('ui5AccTasksRegistered') === "continuum") {
         return describe.only(`${title}`, function (this: Mocha.Suite) {
             before(() => {
                 cy.setUpContinuum("../../packages/cypress-internal/src/continuum/continuum.conf.js");
                if (page) {
                    cy.visit(page);
                }
             });
             fn.call(this);
         });
     };
};

export { }