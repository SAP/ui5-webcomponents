import { TestReport } from "./support.js";
// @ts-expect-error
import { readFileSync, writeFileSync, mkdirSync } from "fs";
// @ts-expect-error
import * as path from "path";
// @ts-expect-error
import { fileURLToPath } from 'node:url';

// @ts-expect-error
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.resolve("./cypress-logs/acc_logs.json");
const outputPathIndex = path.resolve("./cypress-logs/index.html");

const findExistingReport = (reportData: TestReport[], testFile: string) => reportData.find(report => report.testFile === testFile);

const readReportFile = (): TestReport[] => {
	try {
		return JSON.parse(readFileSync(outputPath, { encoding: "utf-8" })) as TestReport[];
	} catch (e) {
		return [];
	}
}

const log = (currentReport: TestReport) => {
	let reportData = readReportFile();

	const existingReport = findExistingReport(reportData, currentReport.testFile);

	if (existingReport) {
		existingReport.errors.push(...currentReport.errors)
	} else {
		reportData.push(currentReport);
	}

	reportData.forEach(file => {
		const paths = file.errors.map(error => error.testTitlePath.join(" "));
		file.errors = file.errors.filter((error, index) => paths.indexOf(error.testTitlePath.join(" ")) === index);
	})

	saveReportFile(reportData);
}

const saveReportFile = (reportData: TestReport[]) => {
	mkdirSync(path.dirname(outputPath), { recursive: true });

	writeFileSync(outputPath, JSON.stringify(reportData, undefined, 4));
};

const reset = (testFile: string) => {
	let reportData = readReportFile();
	const existingReport = findExistingReport(reportData, testFile);

	if (existingReport) {
		reportData.splice(reportData.indexOf(existingReport), 1)

		saveReportFile(reportData);
	}
}

const prepare = () => {
	const indexTemplate = readFileSync(path.join(__dirname, "index"), { encoding: "utf-8" });
	saveReportFile([]);

	// Add log visualizer page.
	writeFileSync(outputPathIndex, indexTemplate);
}

function accTask(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
	if (config.env.UI5_ACC === true) {
		on('before:run', () => {
			// Reset the report file when tests are run with the `cypress run` command.
			// This event is triggered when running tests with the `cypress open` command (behind an experimental flag).
			// `config.isInteractive` helps us determine whether the tests are running in interactive mode (`cypress open`) or non-interactive mode (`cypress run`).
			if (!config.isInteractive) {
				prepare();
			}
		});

		on('before:browser:launch', () => {
			// Reset the report file when tests are run with the `cypress open` command.
			// `config.isInteractive` helps us determine whether the tests are running in interactive mode (`cypress open`) or non-interactive mode (`cypress run`).
			if (config.isInteractive) {
				prepare();
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