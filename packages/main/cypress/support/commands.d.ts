type SimulationDevices = "phone"

declare namespace Cypress {
	interface Chainable {
		ui5SimulateDevice(device?: SimulationDevices): Chainable<void>
	}
}