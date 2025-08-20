// @ts-nocheck
// This is a basic custom support file for using Continuum's JavaScript SDK with Cypress
// Lots of functionality is already available to you here out of the box, but we encourage you to add your own custom commands!

const { Continuum, ReportManagementStrategy, ModuleManagementStrategy } = require('@continuum/continuum-javascript-professional');

window.LevelAccess_AccessContinuumConfiguration = {
  "accessEngineType": "professional",
  "ampInstanceUrl": "https://amp.levelaccess.net",
  "defaultStandardIds": [
    610, /* WCAG 2.0 Level A */
    611, /* WCAG 2.0 Level AA */
    612, /* WCAG 2.0 Level AAA */
    1387, /* WCAG 2.1 Level A */
    1388, /* WCAG 2.1 Level AA */
    1389, /* WCAG 2.1 Level AAA */
    1140, /* Section 508 and 255 (Revised 2017) */
    1471 /* WCAG 2.0 Level A & AA Baseline */
  ],
  "includePotentialAccessibilityConcerns": false,
  "ampApiToken": null,

  "proxy": {
    "host": null,
    "port": null,
    "username": null,
    "password": null
  },
  "accessibilityConcerns": {
    "includePotentialConcerns": false,
    "format": "amp"
  },
  "levelAccessPlatform": {
    "orgInstanceUrl": null,
    "apiKey": null,
    "workspaceId": null,
    "digitalPropertyId": null,
    "scanTagId": null
  }
}


const config = {
	"accessEngineType": "professional",
	"ampInstanceUrl": "https://amp.levelaccess.net",
	"defaultStandardIds": [
		610, /* WCAG 2.0 Level A */
		611, /* WCAG 2.0 Level AA */
		612, /* WCAG 2.0 Level AAA */
		1387, /* WCAG 2.1 Level A */
		1388, /* WCAG 2.1 Level AA */
		1389, /* WCAG 2.1 Level AAA */
		1140, /* Section 508 and 255 (Revised 2017) */
		1471 /* WCAG 2.0 Level A & AA Baseline */
	],
	"includePotentialAccessibilityConcerns": false,
	"ampApiToken": null,

	"proxy": {
		"host": null,
		"port": null,
		"username": null,
		"password": null
	},
	"accessibilityConcerns": {
		"includePotentialConcerns": false,
		"format": "amp"
	},
	"levelAccessPlatform": {
		"orgInstanceUrl": null,
		"apiKey": null,
		"workspaceId": null,
		"digitalPropertyId": null,
		"scanTagId": null
	}
}


const accessEngineFilePath = `../../node_modules/@continuum/continuum-javascript-professional/AccessEngine.professional.js`.replace(/^\//, '');  // versions of Cypress prior to 5 include a leading forward slash in __dirname

const setUpContinuum = (configFilePath) => (
	// Using the Continuum JavaScript SDK requires us to load the following files before invoking `Continuum.setUp`:
	// * the Continuum configuration file (continuum.conf.js) specified by `configFilePath`
	// * Access Engine (AccessEngine.professional.js), the underlying accessibility testing engine Continuum uses
	// Normally code outside the Continuum JavaScript SDK is not required to do this, but Cypress' design essentially forces our hand

	cy.wrap()
		.then(configFileContents => window.eval(config))
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

Cypress.Commands.add('setUpContinuum', setUpContinuum);

const runAllTestsForAssertions = (includeiframe = false) => (
	// We verify Access Engine is loaded, loading it again only if necessary, before running our accessibility tests using `Continuum.runAllTestsForAssertions`
	cy.window()
		.then(windowUnderTest => (
			cy.then(() => {
				if (!windowUnderTest.LevelAccess_Continuum_AccessEngine) {
					return cy.readFile(accessEngineFilePath)
						.then(accessEngineFileContents => windowUnderTest.eval(Continuum.createInjectableAccessEngineCode(accessEngineFileContents)));
				}
			})
		))
		.then(() => Continuum.runAllTestsForAssertions(includeiframe))
);

const printAssertions = () => {
	const assertions = Continuum.getAssertions();
	const failedAssertions = assertions.filter((assertion) => {
		return assertion.outcome === 'fail';
	});

	cy.log(`${failedAssertions.length} of ${assertions.length} assertions failed:`);
	cy.log(JSON.stringify(failedAssertions, null, 2));
};

const failIfAnyAssertions = () => {
	const failedAssertions = Continuum.getAssertions().filter((assertion) => {
		return assertion.outcome === 'fail';
	})
	expect(failedAssertions, 'no assertions').to.have.lengthOf(0);
}

const submitAssertionsToLevelAccessPlatform = async () => {
	const levelAccessPlatformReportingService = Continuum.LevelAccessPlatformReportingService;
	await levelAccessPlatformReportingService.openScanSession({
		sessionName: 'JS Cypress'
	});

	try {
		const assertions = Continuum.getAssertions();
		await levelAccessPlatformReportingService.submit(assertions);
	} finally {
		await levelAccessPlatformReportingService.completeScanSession();
	}
}

Cypress.Commands.add('runAllTestsForAssertions', runAllTestsForAssertions);
Cypress.Commands.add('failIfAnyAssertions', failIfAnyAssertions);
Cypress.Commands.add('submitAssertionsToLevelAccessPlatform', submitAssertionsToLevelAccessPlatform);
Cypress.Commands.add('printAssertions', printAssertions);

// uncomment to get accessibility concerns that can be used to report to AMP
// const runAllAccessibilityTests = (includeiframe = false) => (
//   // We verify Access Engine is loaded, loading it again only if necessary, before running our accessibility tests using `Continuum.runAllTests`
//
//   cy.window()
//     .then(windowUnderTest => (
//       cy.then(() => {
//         if (!windowUnderTest.LevelAccess_Continuum_AccessEngine) {
//           return cy.readFile(accessEngineFilePath)
//                    .then(accessEngineFileContents => windowUnderTest.eval(Continuum.createInjectableAccessEngineCode(accessEngineFileContents)));
//         }
//       })
//     ))
//     .then(() => Continuum.runAllTests(includeiframe))
// );
//
// const printAccessibilityTestResults = () => {
//   const accessibilityConcerns = Continuum.getAccessibilityConcerns();
//
//   if (accessibilityConcerns.length > 0) {
//     // print out some information about each accessibility concern,
//     // highlighting offending elements along the way
//     accessibilityConcerns.forEach((accessibilityConcern) => {
//       // if the element to highlight is in shadow DOM, highlight its shadow root nearest the light DOM;
//       // there's an outstanding defect preventing us from directly highlighting elements in shadow DOM: https://github.com/cypress-io/cypress/issues/8843
//       const modifiedAccessibilityConcernPath = accessibilityConcern.path?.split("|:host>")[0];  // "|:host>" in the path indicates the element is in shadow DOM
//
//       if (modifiedAccessibilityConcernPath) {
//           let originalNodeBorder;
//           cy.get(modifiedAccessibilityConcernPath).then(node => {
//               originalNodeBorder = node.css('border');
//               node.css('border', '2px solid magenta');
//           })
//               .log(`Accessibility Concern: ${accessibilityConcern.attribute} [${accessibilityConcern.bestPracticeDetailsUrl}](${accessibilityConcern.bestPracticeDetailsUrl})`)
//               .get(modifiedAccessibilityConcernPath, {log: false}).then(node => {
//               node.css('border', originalNodeBorder);
//           });
//       }
//     });
//   } else {
//     cy.log("No accessibility concerns found");
//   }
// };
//
// const failIfAnyAccessibilityConcerns = () => {
//   expect(Continuum.getAccessibilityConcerns(), 'no accessibility concerns').to.have.lengthOf(0);
// }
//
// const submitAccessibilityConcernsToAMP = () => {
//     const accessibilityConcerns = Continuum.getAccessibilityConcerns();
//     if (accessibilityConcerns.length <= 0) {
//         return;
//     }
//
//     cy.log("Submitting accessibility concerns to AMP...");
//
//     cy.title({log: false})
//       .then((pageTitle) => {
//          cy.url({log: false})
//            .then({timeout: 30000}, async (pageUrl) => {
//               const ampReportingService = Continuum.AMPReportingService;
//
//               await ampReportingService.setActiveOrganization(12345);  // ID of AMP organization to submit test results to
//               await ampReportingService.setActiveAsset(54321);  // ID of AMP asset to submit test results to
//               await ampReportingService.setActiveReportByName("Example Report");
//               await ampReportingService.setActiveModuleByName(pageTitle, pageUrl);
//               await ampReportingService.setActiveReportManagementStrategy(ReportManagementStrategy.APPEND);
//               await ampReportingService.setActiveModuleManagementStrategy(ModuleManagementStrategy.OVERWRITE);
//               await ampReportingService.submitAccessibilityConcernsToAMP(accessibilityConcerns);
//
//               cy.log(`Accessibility concerns submitted to AMP: ${ampReportingService.activeModule.getAMPUrl()}`);
//             });
//        });
// }
//
// Cypress.Commands.add('runAllAccessibilityTests', runAllAccessibilityTests);
// Cypress.Commands.add('printAccessibilityTestResults', printAccessibilityTestResults);
// Cypress.Commands.add('failIfAnyAccessibilityConcerns', failIfAnyAccessibilityConcerns);
// Cypress.Commands.add('submitAccessibilityConcernsToAMP', submitAccessibilityConcernsToAMP);