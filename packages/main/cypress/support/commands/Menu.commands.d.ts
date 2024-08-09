declare namespace Cypress {
	interface Chainable {
		ui5MenuOpen(options?: { opener?: string }): Chainable<void>
		ui5MenuOpened(): Chainable<void>
		ui5MenuItemClick(): Chainable<void>
		ui5MenuItemPress(key: string): Chainable<void>
	}
}