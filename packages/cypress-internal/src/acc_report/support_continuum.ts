// @ts-ignore
import {Continuum, ReportManagementStrategy, ModuleManagementStrategy} from '@continuum/continuum-javascript-professional';

// const accessEngineFilePath = `${__dirname}/../node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(/^\//, '');  // versions of Cypress prior to 5 include a leading forward slash in __dirname
const accessEngineFilePath = `../../node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(/^\//, '');  // versions of Cypress prior to 5 include a leading forward slash in __dirname

const setUpContinuum = (configFilePath: string) => (
    // Using the Continuum JavaScript SDK requires to load the following files before invoking `Continuum.setUp`:
    // * the Continuum configuration file (continuum.conf.js) specified by `configFilePath`
    // * Access Engine (AccessEngine.professional.js), the underlying accessibility testing engine Continuum uses

    cy.readFile(configFilePath)
        .then(configFileContents => window.eval(configFileContents))
        .window()
        .then(windowUnderTest => (
            cy.readFile(accessEngineFilePath)
                .then(accessEngineFileContents => {
                    Continuum.accessEngineCode = Continuum.createInjectableAccessEngineCode(accessEngineFileContents);
                    windowUnderTest.eval(Continuum.accessEngineCode);
                })
                .then(() => Continuum.setUp(null, configFilePath, windowUnderTest))
        ))
);
const runAllTestsForAssertions = (includeiframe = false) => (
    // We verify Access Engine is loaded, loading it again only if necessary, before running accessibility tests using `Continuum.runAllTestsForAssertions`
    cy.window()
        .then(windowUnderTest => (
            cy.then(() => {
                // @ts-ignore
                if (!windowUnderTest.LevelAccess_Continuum_AccessEngine) {
                    return cy.readFile(accessEngineFilePath)
                        .then(accessEngineFileContents => windowUnderTest.eval(Continuum.createInjectableAccessEngineCode(accessEngineFileContents)));
                }
            })
        ))
        .then(() => Continuum.runAllTests().then(function (accessibilityConcerns: any) {
            if (accessibilityConcerns?.length > 0) {
                cy.log(`Accessibility concerns found: ${accessibilityConcerns.length}`);
                // print out some information about each accessibility concern,
                // highlighting offending elements along the way
                accessibilityConcerns.forEach((accessibilityConcern: any) => {
                // if the element to highlight is in shadow DOM, highlight its shadow root nearest the light DOM;
                // there's an outstanding defect preventing us from directly highlighting elements in shadow DOM: https://github.com/cypress-io/cypress/issues/8843
                const modifiedAccessibilityConcernPath = accessibilityConcern.path?.split("|:host>")[0];  // "|:host>" in the path indicates the element is in shadow DOM

                if (modifiedAccessibilityConcernPath) {
                    let originalNodeBorder: any;
                    cy.get(modifiedAccessibilityConcernPath).then(node => {
                        originalNodeBorder = node.css('border');
                        node.css('border', '2px solid magenta');
                    })  
                        .log(`Accessibility Concern: ${accessibilityConcern.attribute} ${accessibilityConcern.element}`)
                        .get(modifiedAccessibilityConcernPath, {log: false}).then(node => {
                        node.css('border', originalNodeBorder);
                    });
                }
                });

            } else {
                cy.log("No accessibility concerns found");
            }
            expect(accessibilityConcerns).to.have.lengthOf(0);
        }).catch(function (oError: any) {
        })
    )
);

Cypress.Commands.add("setUpContinuum", setUpContinuum);

Cypress.Commands.add('runAllTestsForAssertions', runAllTestsForAssertions);

declare global {
    namespace Cypress {
        interface Chainable {
            setUpContinuum(configFilePath: string): Chainable<void>;
            runAllTestsForAssertions(includeiframe?: boolean): Chainable<void>;
        }
    }
}
