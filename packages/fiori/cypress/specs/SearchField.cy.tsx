import SearchField from "../../src/SearchField.js";
import SearchScope from "../../src/SearchScope.js";
import {
	SEARCH_FIELD_SCOPE_SELECT_LABEL,
	SEARCH_FIELD_CLEAR_ICON,
	SEARCH_FIELD_SEARCH_ICON,
	SEARCH_FIELD_LABEL
} from "../../src/generated/i18n/i18n-defaults.js";

describe("SearchField general interaction", () => {
	describe("Attribute propagation", () => {
		it("should pass placeholder to inner input", () => {
			const attributeValue = "test";

			cy.mount(<SearchField placeholder={attributeValue}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.attr", "placeholder", attributeValue);
		});

		it("Value attribute is propagated properly", () => {
			const attributeValue = "test";

			cy.mount(<SearchField value={attributeValue}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.value", attributeValue);
		});

		it("accessibleName to aria-label", () => {
			const attributeValue = "test";

			cy.mount(<SearchField accessibleName={attributeValue}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-label", attributeValue);
		});

		it("accessibleDescription should have default value if not set", () => {
			cy.mount(<SearchField></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-label", SEARCH_FIELD_LABEL.defaultText);
		});

		it("accessibleDescription should propagate if set", () => {
			cy.mount(<SearchField accessibleDescription="Test"></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.attr", "aria-description", "Test");
		});
	});

	describe("Collapsed Search Field", () => {
		it("collapsed search field button accessibility", () => {
			cy.mount(<SearchField collapsed={true} placeholder="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-button]")
				.shadow()
				.find("button")
				.as("inner-button");

			cy.get("@inner-button")
				.should("have.attr", "aria-expanded", "false");

			cy.get("@inner-button")
				.should("have.attr", "title", SEARCH_FIELD_SEARCH_ICON.defaultText);
			cy.get("@inner-button")
				.should("have.attr", "aria-label", SEARCH_FIELD_SEARCH_ICON.defaultText);
		});

		it("should fire search search on search icon click", () => {
			cy.mount(<SearchField value="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			// click on search icon
			cy.get("@searchfield")
				.shadow()
				.find("[ui5-icon][name='search']")
				.realClick();

			// search should be called
			cy.get("@searched")
				.should("have.been.calledOnce");
		});
	});

	describe("Expanded Search Field", () => {
		it("input field should be rendered as an expanded search field", () => {
			cy.mount(<SearchField placeholder="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-button]")
				.should("not.exist");

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("exist");
		});

		it("expanded empty search field button accessibility", () => {
			cy.mount(<SearchField placeholder="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-icon]")
				.shadow()
				.find("svg")
				.as("search-icon");

			cy.get("@search-icon")
				.find("title")
				.should("contain.text", SEARCH_FIELD_SEARCH_ICON.defaultText);
			cy.get("@search-icon")
				.should("have.attr", "aria-label", SEARCH_FIELD_SEARCH_ICON.defaultText);

			cy.get("[ui5-search-field]")
				.shadow()
				.find(".ui5-search-field-root")
				.should("have.attr", "role", "search");

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.should("have.attr", "role", "searchbox");
		});

		it("expanded search field button accessibility", () => {
			cy.mount(<SearchField value="text"></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-icon]")
				.shadow()
				.find("svg")
				.as("search-icon");

			cy.get("@search-icon")
				.find("title")
				.should("contain.text", SEARCH_FIELD_SEARCH_ICON.defaultText);
			cy.get("@search-icon")
				.should("have.attr", "aria-label", SEARCH_FIELD_SEARCH_ICON.defaultText);
		});
	});

	describe("Expanded Search Field with clear icon", () => {
		it("clear icon should not be visible when input value is empty", () => {
			cy.mount(<SearchField placeholder="test" showClearIcon={true}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.should("not.exist");
		});

		it("clear icon should be visible when input value is not empty", () => {
			cy.mount(<SearchField value="test" showClearIcon={true}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.should("exist");
		});

		it("clear icon accessibility", () => {
			cy.mount(<SearchField value="test" showClearIcon={true}></SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("input")
				.realClick();

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.shadow()
				.find("svg")
				.as("clear-icon");

			cy.get("@clear-icon")
				.find("title")
				.should("contain.text", SEARCH_FIELD_CLEAR_ICON.defaultText);
			cy.get("@clear-icon")
				.should("have.attr", "aria-label", SEARCH_FIELD_CLEAR_ICON.defaultText);
		});
	});

	describe("Events", () => {
		it("fires search event on Enter", () => {
			cy.mount(<SearchField value="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("input")
				.realClick();

			cy.get("@searchfield")
				.should("be.focused");

			cy.get("@searchfield")
				.realPress("Enter");

			cy.get("@searched")
				.should("have.been.calledOnce");
		});

		it("fires search event search icon click", () => {
			cy.mount(<SearchField value="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-icon][name='search']")
				.realClick();

			cy.get("@searched")
				.should("have.been.calledOnce");
		});

		it("should not fire search event when value is empty", () => {
			cy.mount(<SearchField></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-search", cy.stub().as("searched"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("input")
				.realClick();

			cy.get("@searchfield")
				.should("be.focused");

			cy.get("@searchfield")
				.realPress("Enter");

			cy.get("@searched")
				.should("not.be.called");
		});

		it("fires input event on typing", () => {
			cy.mount(<SearchField></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("input")
				.realClick();

			cy.get("@searchfield")
				.should("be.focused");

			cy.get("@searchfield")
				.realPress("a")
				.realPress("b")
				.realPress("c");

			cy.get("@input")
				.should("have.been.calledThrice");
		});

		it("fires input event on clear icon press", () => {
			cy.mount(<SearchField value="test" showClearIcon={true}></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-input", cy.stub().as("input"));
				});

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-icon][name='decline']")
				.realClick();

			cy.get("@input")
				.should("have.been.calledOnce");
		});
	});

	describe("Scoped Search Field", () => {
		it("ui5-select should not be rendered on Default Search Field", () => {
			cy.mount(<SearchField value="test"></SearchField>);

			cy.get("[ui5-search-field]")
				.as("searchfield");

			cy.get("@searchfield")
				.shadow()
				.find("[ui5-select]")
				.should("not.exist");
		});

		it("ui5-select accessibility", () => {
			cy.mount(
				<SearchField value="test">
					<SearchScope text="Apps" slot="scopes"></SearchScope>
				</SearchField>
			);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.as("scope");

			cy.get("@scope")
				.shadow()
				.find("[role='combobox']")
				.should("have.attr", "aria-label", SEARCH_FIELD_SCOPE_SELECT_LABEL.defaultText);

			cy.get("@scope")
				.shadow()
				.find(".ui5-select-root")
				.should("have.attr", "title", SEARCH_FIELD_SCOPE_SELECT_LABEL.defaultText);
		});

		it("Two options should be rendered in the scope", () => {
			cy.mount(<SearchField value="test">
				<SearchScope text="Apps" slot="scopes"></SearchScope>
				<SearchScope text="Products" slot="scopes"></SearchScope>
			</SearchField>);

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.as("scope");

			cy.get("@scope")
				.find("[ui5-option]")
				.should("have.length", 2);
		});

		it("scope-change event should be fired, when a scope option is selected", () => {
			cy.mount(<SearchField value="test">
				<SearchScope text="Apps" slot="scopes"></SearchScope>
				<SearchScope text="Products" slot="scopes"></SearchScope>
			</SearchField>);

			cy.get("[ui5-search-field]")
				.then(searchfield => {
					searchfield.get(0).addEventListener("ui5-scope-change", cy.stub().as("scopeChanged"));
				});

			cy.get("[ui5-search-field]")
				.shadow()
				.find("[ui5-select]")
				.as("scope");

			cy.get("@scope")
				.realClick();

			cy.get("@scope")
				.realPress("ArrowDown");

			cy.get("@scope")
				.realPress("Enter");

			cy.get("@scopeChanged")
				.should("have.been.calledOnce");
		});
	});
});
