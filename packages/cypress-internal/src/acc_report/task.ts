import { TestReport } from "./support.js";
// @ts-ignore
import { readFileSync, writeFileSync, mkdirSync } from "fs";
// @ts-ignore
import * as path from "path";

const outputPath = path.resolve("./cypress-logs/acc_log.json");

const findExistingReport = (fileData: TestReport[], testFile: string) => fileData.find(report => report.testFile === testFile);

const log = (currentReport: TestReport) => {
	let fileData: TestReport[] = [];

	try {
		fileData = JSON.parse(readFileSync(outputPath, { encoding: "utf-8" })) as TestReport[];
	} catch (e) { }

	const existingReport = findExistingReport(fileData, currentReport.testFile);

	if (existingReport) {
		existingReport.errors.push(...currentReport.errors)
	} else {
		fileData.push(currentReport);
	}

	fileData.forEach(file => {
		const paths = file.errors.map(error => error.testTitlePath.join(" "));
		file.errors = file.errors.filter((error, index) => paths.indexOf(error.testTitlePath.join(" ")) === index);
	})

	saveReportFile(fileData);
}

const saveReportFile = (fileData: TestReport[]) => {
	mkdirSync(path.dirname(outputPath), { recursive: true });

	writeFileSync(outputPath, JSON.stringify(fileData, undefined, 4));
};

const reset = (testFile: string) => {
	try {
		let fileData = JSON.parse(readFileSync(outputPath, { encoding: "utf-8" })) as TestReport[];
		const existingReport = findExistingReport(fileData, testFile);

		if (existingReport) {
			fileData.splice(fileData.indexOf(existingReport), 1)

			saveReportFile(fileData);
		}
	} catch (e) { }
}

function accTask(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
	if (config.env.UI5_ACC === true) {
		on('before:run', () => {
			// Reset the report file when tests are run with the `cypress run` command.
			// This event is triggered when running tests with the `cypress open` command (behind an experimental flag).
			// `config.isInteractive` helps us determine whether the tests are running in interactive mode (`cypress open`) or non-interactive mode (`cypress run`).
			if (!config.isInteractive) {
				saveReportFile([]);
			}
		});

		on('before:browser:launch', () => {
			// Reset the report file when tests are run with the `cypress open` command.
			// `config.isInteractive` helps us determine whether the tests are running in interactive mode (`cypress open`) or non-interactive mode (`cypress run`).
			if (config.isInteractive) {
				saveReportFile([]);
			}
		});

		on('task', {
			// Adds the accessibility report for the current test to the spec file logs
			ui5ReportA11y(report: TestReport) {
				log(report);

				return null;
			},

			// Removes all existing logs for the current test file when the spec file is loaded
			ui5ReportA11yReset(testFile: string) {
				reset(testFile);

				return null;
			}
		})

		config.env.ui5AccTasksRegistered = true
	}

	return config
}

export default accTask;