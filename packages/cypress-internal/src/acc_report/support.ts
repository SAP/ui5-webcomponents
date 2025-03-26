import 'cypress-axe'
import type { AxeResults, ImpactValue } from "axe-core";
import { Options } from "cypress-axe";

type Vialotation = {
    id: string,
    impact: ImpactValue | undefined,
    description: string
    nodes: number,
}

type TestVialotation = {
    testTitlePath: string[],
    violations: Vialotation[]
}

type TestReport = {
    testFile: string,
    errors: TestVialotation[]
}

function checkA11TerminalLog(violations: typeof AxeResults.violations) {
    const violationData = violations.map<Vialotation>(
        ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.length
        })
    )

    const report: TestReport = {
        testFile: Cypress.spec.relative,
        errors: [{
            testTitlePath: Cypress.currentTest.titlePath,
            violations: violationData,
        }]
    }

    cy.task('ui5ReportA11y', report)
}

declare global {
    namespace Cypress {
        interface Chainable {
            ui5CheckA11y(context?: string | Node | undefined, options?: Options | undefined): Cypress.Chainable<void>;
        }
    }
}

Cypress.Commands.add("ui5CheckA11y", (context?: string | Node | undefined, options?: Options | undefined) => {
    return cy.checkA11y(context || "[data-cy-root]", options, checkA11TerminalLog, false)
})

if (Cypress.env('ui5AccTasksRegistered') === true) {
    before(() => {
        cy.task('ui5ReportA11yReset', Cypress.spec.relative);
    })
}

export type {
    TestReport,
}