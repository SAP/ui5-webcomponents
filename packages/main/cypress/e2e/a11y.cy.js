/// <reference types="cypress" />


context('Example Tests with Continuum posting Assertions to the Level Access Platform', () => {
    before(() => {
        // Continuum only needs to be set up once per testing context;
        // the page under test can change without having to set up Continuum again
        cy.setUpContinuum('continuum/continuum.conf.js')
    })

    it('Browse levelaccess.com', () => {
        cy.visit('https://www.levelaccess.com/')
            .runAllTestsForAssertions() // this takes an optional boolean argument that determines if the contents of an iframe will be scanned
            // Configure "levelAccessPlatform" in the continuum.conf.js file and
            // uncomment the following line to send assertions to the Level Access Platform
            // .submitAssertionsToLevelAccessPlatform()
            .printAssertions()
            .failIfAnyAssertions()
    })
})

// uncomment to get accessibility concerns that can be used to report to AMP
// context('Example Tests with Continuum', () => {
//
//     // See `continuum/cypress.js` for the definitions of custom commands like `cy.setUpContinuum` and the rest
//
//     before(() => {
//         // Continuum only needs to be set up once per testing context;
//         // the page under test can change without having to set up Continuum again
//         cy.setUpContinuum('continuum/continuum.conf.js')
//     })
//
//     it('Browse levelaccess.com', () => {
//         cy.visit('https://www.levelaccess.com/')
//             .runAllAccessibilityTests() // this takes an optional boolean argument that determines if the contents of an iframe will be scanned
//             .printAccessibilityTestResults()
//             // to send these accessibility concerns from Continuum to AMP, uncomment the line below and
//             // edit the submitAccessibilityConcernsToAMP function in `continuum/cypress.js` according to our
//             // 'Sending Continuum Testing Results to AMP' support article:
//             // https://client.levelaccess.com/hc/en-us/articles/13845566877847-Send-Continuum-test-results-to-AMP
//             //.submitAccessibilityConcernsToAMP()
// 	    .get('a:visible').contains('Solutions Overview').scrollIntoView().click()
//             .runAllAccessibilityTests()
//             .printAccessibilityTestResults()
//             //.submitAccessibilityConcernsToAMP()
//             .failIfAnyAccessibilityConcerns()
//     })
// })
