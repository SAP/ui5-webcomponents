import Menu from "@ui5/webcomponents/dist/Menu.js";
import NotificationList from "../../src/NotificationList.js";
import NotificationListGroupItem from "../../src/NotificationListGroupItem.js";
import NotificationListItem from "../../src/NotificationListItem.js";

function Sample() {
	return <NotificationList id="nl1">
		<NotificationListGroupItem
			title-text="Group 1"
			id="group1"
			growing="Button">
			<NotificationListItem id="item11" showClose>
				Group 1 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 1 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 1 Item 3
			</NotificationListItem>
			<NotificationListItem id="item1last" showClose>
				Group 1 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			id="group2"
			title-text="Group 2">
			<NotificationListItem id="item21" showClose>
				Group 2 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 2 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 2 Item 3
			</NotificationListItem>
			<NotificationListItem id="item2last" showClose>
				Group 2 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
		<NotificationListGroupItem
			growing="Button"
			title-text="Group 3">
			<NotificationListItem showClose>
				Group 3 Item 1
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 2
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 3
			</NotificationListItem>
			<NotificationListItem showClose>
				Group 3 Item 4
			</NotificationListItem>
		</NotificationListGroupItem>
	</NotificationList>;
}

describe("Notification List Item Tests", () => {
	it("tests itemToggle fired", () => {
		const stub = cy.stub().as("myStub");
		cy.mount(<NotificationListGroupItem id="nlgi1" onClick={stub} />);

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-header")
			.realClick();

		cy.get("@myStub").should("have.been.calledOnce");
	});

	it("tests Group List Header keyboard shortcuts ", () => {
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListGroupItem id="nlgi3" collapsed>
					<NotificationListItem id="nli5" />
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'none');
		cy.get("#nlgi3").realClick();

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
		cy.get("#nlgi3").realPress("ArrowLeft");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'none');
		cy.get("#nlgi3").realPress("ArrowRight");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
		cy.get("#nlgi3").realPress("-");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'none');
		cy.get("#nlgi3").realPress("+");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
		cy.get("#nlgi3").realPress("-");
		cy.get("#nlgi3").realPress("Space");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-items")
			.should("have.css", "display", 'block');
	});

	// Notification List Item specific tests follows

	it("tests itemClick fired", () => {
		const itemClick = cy.stub().as("myStub");
		cy.mount(<NotificationListItem id="nli1" onClick={itemClick} />);

		cy.get("#nli1").realClick();
		cy.get("@myStub").should("have.been.calledOnce");
	});

	it("tests itemClose fired", () => {
		const itemClose = cy.stub().as("myStub");
		const itemClose2 = cy.stub().as("myStub2");
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListItem id="nli1" onClose={itemClose} show-close />
				<NotificationListItem id="nli2" onClose={itemClose2} show-close />
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-close-btn")
			.realClick();
		cy.get("@myStub").should("have.been.calledOnce");

		cy.get("#nli1").realClick();
		cy.realPress("ArrowDown");
		cy.realPress("Delete");

		cy.get("@myStub2").should("have.been.calledOnce");
	});

	it("tests click on ShowMore", () => {
		cy.mount(
			<NotificationListItem
				id="nli3a"
				importance="Important"
				title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
				state="Information"
			/>
		);

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.realClick();

		// const firstItem = await browser.$("#nli3a");
		// const btnListItemShowMore = await firstItem.shadow$(".ui5-nli-footer-showMore");
		// const content = await firstItem.shadow$(".ui5-nli-content");
		// const title = await firstItem.shadow$(".ui5-nli-title-text");

		// const hightBeforeContent = await content.getSize("height");
		// const hightBeforeTitle = await title.getSize("height");

		// // act
		// await btnListItemShowMore.click();

		// const hightAfterContent = await content.getSize("height");
		// const hightAfterTitle = await title.getSize("height");

		// // assert
		// assert.isAbove(hightAfterContent, hightBeforeContent,
		// 	"The content has been expanded by the ShowMore button.");
		// assert.isAbove(hightAfterTitle, hightBeforeTitle,
		// 	"The title has been expanded by the ShowMore button.");

		// // act
		// await firstItem.click();
		// await firstItem.keys(["Enter", "Shift"]);

		// const hightAfterKeysContent = await content.getSize("height");
		// const hightAfterKeysTitle = await title.getSize("height");
		// // assert
		// assert.isAbove(hightAfterContent, hightAfterKeysContent,
		// 	"The content has been collapsed by the Shift+Enter keyboard combination.");
		// assert.isAbove(hightAfterTitle, hightAfterKeysTitle,
		// 	"The title has been collapsed by the Shift+Enter keyboard combination.");
	});

	it("tests no ShowMore, when truncate is not enabled", () => {
		cy.mount(
			<NotificationListItem
				id="nli3"
				title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
			>
				And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
			</NotificationListItem>
		);

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("have.attr", "hidden");
	});

	it("tests busy indicator is displayed", () => {
		cy.mount(<NotificationListItem id="nli4" loading />);

		cy.get("#nli4")
			.shadow()
			.find(".ui5-nli-loading")
			.should("exist");
	});

	it("tests state", () => {
		cy.mount(
			<NotificationList>
				<NotificationListItem id="nli2" state="Critical" />
				<NotificationListItem id="nli3" state="Negative" />
			</NotificationList>
		);

		cy.get("#nli2")
			.shadow()
			.find(".ui5-state-icon")
			.should("have.attr", "name", "alert");

		cy.get("#nli3")
			.shadow()
			.find(".ui5-state-icon")
			.should("have.attr", "name", "error");
	});

	it("tests importance", () => {
		cy.mount(
			<>
				<NotificationListItem id="nli3" importance="Important" />
				<NotificationListItem id="nli2" />
			</>
		);

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-content-with-importance")
			.should("exist");

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-content-with-importance")
			.should("not.exist");
	});

	it("tests menu", () => {
		cy.mount(
			<NotificationListItem id="nli1">
				<Menu slot="menu" id="menuWithActions">
				</Menu>
			</NotificationListItem>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.realClick();

		cy.get("#nli1")
			.find("ui5-menu")
			.should("have.attr", "open");

		cy.get("#nli1").realClick();

		cy.get("#nli1")
			.find("ui5-menu")
			.should("not.have.attr", "open");

		cy.get("#nli1").realClick();
		//cy.get("#nli1").should('have.focus');

		//cy.get("#nli1").realPress(["Shift", "F10"]);
		cy.get('#nli1')
			//.focus()
			.realPress(['Shift', 'F10']);


		cy.get("#nli1")
			.find("ui5-menu")
			.should("have.attr", "open");
		// const firstItem = await browser.$("#nli1");
		// const menuButton = await firstItem.shadow$(".ui5-nli-menu-btn");

		// // act
		// await menuButton.click();
		// const menu1 = await firstItem.$("ui5-menu").hasAttribute("open");
		// // assert
		// assert.ok(await menu1, "There is open menu.");

		// // act
		// await firstItem.click();
		// const menu2 = await firstItem.$("ui5-menu").hasAttribute("open");
		// // assert
		// assert.notOk(await menu2, "There is no menu.");

		// // act
		// await firstItem.click();
		// await firstItem.keys(["F10", "Shift"]);
		// const menu3 = await firstItem.$("ui5-menu").hasAttribute("open");
		// // assert
		// assert.ok(await menu3, "There is open menu with shift+F10.");
	});

	// Accessibility tests follows

	it("tests List Item ACC ariaLabelledBy and ariaDescribedBy", () => {
		cy.mount(
			<NotificationListGroupItem>
				<NotificationListItem id="nli1" title-text="New order #2201">
					And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

					<span slot="footnotes">Office Notifications</span>

				</NotificationListItem>

				<NotificationListItem
					id="nli3"
					importance="Important"
					title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
				>
					And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.

					<span slot="footnotes">Office Notifications</span>

				</NotificationListItem>

				<NotificationListItem id="nli3a" importance="Important" />

				<NotificationListItem id="nli4" loading />
			</NotificationListGroupItem>
		);

		cy.get('#nli1')
			.shadow()
			.find('[id$="-title-text"]')
			.invoke('attr', 'id')
			.then((fullId) => {
				const id1 = fullId.replace('-title-text', '');
				const EXPECTED_ARIA_LABELLED_BY = `${id1}-title-text ${id1}-read ${id1}-description ${id1}-footnotes`;

				cy.get('#nli1')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_ARIA_LABELLED_BY)
					.and('have.attr', 'aria-level', '2');
			});

		cy.get('#nli3')
			.shadow()
			.find('[id$="-title-text"]')
			.invoke('attr', 'id')
			.then((fullId) => {
				const id1 = fullId.replace('-title-text', '');
				const EXPECTED_ARIA_LABELLED_BY = `${id1}-importance ${id1}-title-text ${id1}-read ${id1}-description ${id1}-footnotes`;

				cy.get('#nli3')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_ARIA_LABELLED_BY);
			});

		cy.get('#nli4')
			.shadow()
			.find('[id$="-loading"]')
			.invoke('attr', 'id')
			.then((fullId) => {
				const id4 = fullId.replace('-loading', '');
				const EXPECTED_LOADING_ARIA_LABELLED_BY = `${id4}-loading`;

				cy.get('#nli4')
					.shadow()
					.find('.ui5-nli-root')
					.should('have.attr', 'aria-labelledby', EXPECTED_LOADING_ARIA_LABELLED_BY);
			});
	});

	it("tests List Item ACC invisible texts", () => {
		cy.mount(
			<NotificationListGroupItem>
				<NotificationListItem id="nli1" state="Positive" />
				<NotificationListItem id="nli2" read state="Critical" />
			</NotificationListGroupItem>
		);

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.first()
			.should("have.text", "Status Positive");

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.eq(1)
			.should("have.text", "Unread");

		cy.get('#nli1')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-state-icon')
			.should("have.attr", "accessible-name", "Status Positive");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.first()
			.should("have.text", "Status Critical");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-hidden-text')
			.eq(1)
			.should("have.text", "Read");

		cy.get('#nli2')
			.shadow()
			.find('.ui5-nli-root')
			.find('.ui5-state-icon')
			.should("have.attr", "accessible-name", "Status Critical");
	});

	it("tests Menu (actions / '...') button ACC attributes", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem>
					<NotificationListItem id="nli1">
						<Menu />
					</NotificationListItem>
				</NotificationListGroupItem>

				<NotificationListGroupItem>
					<NotificationListItem id="nli3" />
				</NotificationListGroupItem>
			</NotificationList>
		);
		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.shadow()
			.find("button")
			.should("have.attr", "title", 'Actions')
			.and("have.attr", "aria-haspopup", 'menu');

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-menu-btn")
			.should("not.exist");
	});

	it("tests List Item 'Close' button ACC attributes", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem>
					<NotificationListItem id="nli1" show-close />
				</NotificationListGroupItem>

				<NotificationListGroupItem>
					<NotificationListItem id="nli3" />
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nli1")
			.shadow()
			.find(".ui5-nli-close-btn")
			.shadow()
			.find("button")
			.should("have.attr", "aria-label", 'Close')
			.and("have.attr", "title", 'Close')
			.and("have.attr", "role", 'button');

		cy.get("#nli3")
			.shadow()
			.find(".ui5-nli-close-btn")
			.should("not.exist");
	});

	it("tests aria attributes click on ShowMore", () => {
		cy.mount(<NotificationListItem id="nli3a"
			importance="Important"
			title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
			state="Information" />);

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", 'More button. Show the full texts')
			.and("have.attr", "role", "button")
			.and("have.attr", "aria-expanded", "false");

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.scrollIntoView()
			.realClick();

		cy.get("#nli3a")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.shadow()
			.find(".ui5-link-root")
			.should("have.attr", "aria-label", 'Less button. Show the texts with truncation')
			.and("have.attr", "aria-expanded", true);
		// var firstItem = await browser.$("#nli3a");
		// var btnListItemShowMore = await firstItem.shadow$(".ui5-nli-footer-showMore");
		// var btnListItemShowMoreRoot = await btnListItemShowMore.shadow$(".ui5-link-root");

		// assert.strictEqual(await btnListItemShowMoreRoot.getAttribute("aria-label"), 'More button. Show the full texts', "The aria-label is correct.");
		// assert.strictEqual(await btnListItemShowMoreRoot.getAttribute("role"), 'button', "The role is correct.");
		// assert.strictEqual(await btnListItemShowMoreRoot.getAttribute("aria-expanded"), 'false', "The aria-expanded is correct.");

		// // act
		// await btnListItemShowMore.scrollIntoView();
		// await btnListItemShowMore.click();

		// assert.strictEqual(await btnListItemShowMoreRoot.getAttribute("aria-label"), 'Less button. Show the texts with truncation', "The aria-label is correct.");
		// assert.strictEqual(await btnListItemShowMoreRoot.getAttribute("aria-expanded"), 'true', "The aria-expanded is correct.");
	});

	it("tests Group Header Text ACC attributes", () => {
		cy.mount(<NotificationListGroupItem id="nlgi1" />);

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-title-text")
			.should("have.attr", "role", 'heading')
			.and("have.attr", "aria-level", '2');
	});

	it("tests Group List aria-labelledby", () => {
		cy.mount(
			<NotificationList>
				<NotificationListGroupItem id="nlgi1" title-text="Orders" />

				<NotificationListGroupItem id="nlgi4" loading />
			</NotificationList>
		);

		cy.get('#nlgi1')
			.shadow()
			.find('[id$="-title-text"]')
			.invoke('attr', 'id')
			.then((fullId) => {
				cy.get('#nlgi1')
					.shadow()
					.find('.ui5-nli-group-items')
					.should('have.attr', 'accessible-name-ref', fullId);

				cy.get('#nlgi1')
					.shadow()
					.find('.ui5-nli-group-root')
					.should('have.attr', 'aria-labelledby', fullId);
			});

		cy.get('#nlgi4')
			.shadow()
			.find('[id$="-loading"]')
			.invoke('attr', 'id')
			.then((loadingId) => {
				cy.get('#nlgi4')
					.shadow()
					.find('.ui5-nli-group-root')
					.should('have.attr', 'aria-labelledby', loadingId);
			});
	});

	it("tests Group Item 'aria-description' and 'aria-level'", () => {
		cy.mount(
			<NotificationListItem id="notificationList">
				<NotificationListGroupItem id="nlgi1" />
				<NotificationListGroupItem id="nlgi3" collapsed />
			</NotificationListItem>
		);
		// const firstGroupItemRoot = await browser.$("#nlgi1").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_1 = "Notification Group Expanded";
		// const thirdGroupItemRoot = await browser.$("#nlgi3").shadow$(".ui5-nli-group-root");
		const EXPECTED_TEXT_3 = "Notification Group Collapsed";

		cy.get("#nlgi1")
			.shadow()
			.find(".ui5-nli-group-root")
			.should("aria-description", EXPECTED_TEXT_1)
			.and("have.attr", "aria-level", "1");

		cy.get("#nlgi3")
			.shadow()
			.find(".ui5-nli-group-root")
			.should("aria-description", EXPECTED_TEXT_3);

		// assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_1, "The aria-description text is correct.");
		// assert.strictEqual(await thirdGroupItemRoot.getAttribute("aria-description"), EXPECTED_TEXT_3, "The aria-description text is correct.");
		// assert.strictEqual(await firstGroupItemRoot.getAttribute("aria-level"), "1", "The aria-level is correct.");
	});

	it("tests List Group Header ACC attributes when collapsed and expanded", () => {
		cy.mount(
			<NotificationListGroupItem id="nlgi2" />);

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-items")
			.invoke("attr", "id")
			.then((id) => {
				cy.get("#nlgi2")
					.shadow()
					.find(".ui5-nli-group-header")
					.should("have.attr", "aria-expanded", "true")
					.and("have.attr", "aria-controls", id)
					.and("have.attr", "role", "button")
					.and("have.attr", "title", "Expand/Collapse");
			});

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-toggle-icon")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-header")
			.realClick();

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-items")
			.invoke("attr", "id")
			.then((id) => {
				cy.get("#nlgi2")
					.shadow()
					.find(".ui5-nli-group-header")
					.should("have.attr", "aria-expanded", "false")
					.and("have.attr", "aria-controls", id)
					.and("have.attr", "role", "button")
					.and("have.attr", "title", "Expand/Collapse");
			});

		cy.get("#nlgi2")
			.shadow()
			.find(".ui5-nli-group-toggle-icon")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");
	});
});

describe("Keyboard Navigation", () => {
	beforeEach(() => {
		cy.mount(<Sample />);
	});

	it("tests Arrows and Space keys", () => {
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.as("growingButton");

		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.get("#item1last").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowDown");
		cy.get("#item21").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("#item1last").should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowRight");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("Space");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowLeft");
		cy.get("#item1last").should("be.focused");
	});

	it("tests Home and End", () => {
		cy.get("#group1")
			.shadow()
			.find("[ui5-notification-group-list]")
			.shadow()
			.find("[ui5-busy-indicator] .ui5-growing-button-inner")
			.as("growingButton");

		cy.realPress("Tab");
		cy.get("#item11").realClick();
		cy.get("#item11").should("be.focused");

		cy.realPress("End");
		cy.get("#item1last").should("be.focused");

		cy.realPress("End");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("End");
		cy.get("@growingButton").should("be.focused");

		cy.realPress("ArrowDown");
		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("End");
		cy.get("#item2last").should("be.focused");

		cy.realPress("Home");
		cy.realPress("ArrowUp");
		cy.get("#group2").should("be.focused");

		cy.realPress("ArrowUp");
		cy.realPress("Home");
		cy.get("#item11").should("be.focused");

		cy.realPress("Home");
		cy.get("#item11").should("be.focused");
	});

	it("Items navigation", () => {
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListGroupItem id="nlgi1">
					<NotificationListItem id="nli1" />

					<NotificationListItem id="nli2" />
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi2">
					<NotificationListItem id="nli3" />

					<NotificationListItem id="nli3a" />

					<NotificationListItem id="nli4" />
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi3" collapsed>
					<NotificationListItem id="nli5" />
				</NotificationListGroupItem>

			</NotificationList>
		);

		cy.get("#nlgi1").realClick();
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli3").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli3a").should("have.focus");

		cy.realPress("ArrowDown");
		cy.get("#nli4").should("have.focus");

		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowRight");
		cy.realPress("ArrowDown");
		cy.get("#nli5").should("have.focus");

		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.realPress("ArrowUp");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowUp");
		cy.get("#nlgi1").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nli1").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowLeft");
		cy.get("#nlgi2")
			.should("have.focus")
			.and("have.attr", "collapsed");

		cy.realPress("ArrowLeft");
		cy.get("#nli2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2").should("have.focus");

		cy.realPress("ArrowRight");
		cy.get("#nlgi2")
			.should("have.focus")
			.and("not.have.attr", "collapsed");
	});

	it("Tab and F2 navigation", () => {
		cy.mount(
			<NotificationList id="notificationList">
				<NotificationListGroupItem id="nlgi1">
					<NotificationListItem id="nli1">
						<Menu slot="menu" id="menuWithActions">
						</Menu>
					</NotificationListItem>

					<NotificationListItem id="nli2">
					</NotificationListItem>
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi2">
					<NotificationListItem id="nli3">
					</NotificationListItem>

					<NotificationListItem id="nli3a">
					</NotificationListItem>

					<NotificationListItem id="nli4">
					</NotificationListItem>
				</NotificationListGroupItem>

				<NotificationListGroupItem id="nlgi3" collapsed>
					<NotificationListItem id="nli5">
					</NotificationListItem>
				</NotificationListGroupItem>

			</NotificationList>
		);

		cy.get("#nli1").realClick();
		cy.realPress("Tab");

		//cy.get("#menuWithActions")
		// .shadow()
		// .find("#menuWithActions")
		// .should("have.focus");

		// await browser.$("#nli1").click();
		// await browser.keys("Tab");

		// let res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli1").shadowRoot.querySelector(".ui5-nli-footer-showMore").matches(":focus"));
		// });

		// assert.ok(res, "'show more' is focused.");

		// await browser.keys("Tab");
		// res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli1").shadowRoot.querySelector(".ui5-nli-menu-btn").matches(":focus"));
		// });

		// assert.ok(res, "'menu button' is focused.");

		// await browser.keys("Tab");
		// res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli1").shadowRoot.querySelector(".ui5-nli-close-btn").matches(":focus"));
		// });

		// assert.ok(res, "'close button' is focused.");

		// await browser.keys("F2");
		// assert.ok(await browser.$("#nli1").isFocused(), "First item is focused.");

		// await browser.keys("F2");
		// res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli1").shadowRoot.querySelector(".ui5-nli-footer-showMore").matches(":focus"));
		// });

		// assert.ok(res, "'show more' is focused.");
	});

	it("Focusing same item on next row", () => {
		cy.mount(
			<NotificationList
				id="notificationList"
				class="notificationlist_test_page2auto">
				<NotificationListGroupItem
					id="nlgi1"
					title-text="Orders"
				>
					<NotificationListItem
						id="nli1"
						show-close
						title-text="New order #2201"
						state="Positive"
					>
					</NotificationListItem>

					<NotificationListItem
						id="nli2"
						read
						show-close
						title-text="New order #2202"
						state="Critical"
					>
					</NotificationListItem>

				</NotificationListGroupItem>

				<NotificationListGroupItem
					id="nlgi2"
					title-text="Payments"
				>
					<NotificationListItem
						id="nli3"
						importance="Important"
						wrapping-type="Normal"
						title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
						state="Negative"
					>
					</NotificationListItem>

					<NotificationListItem
						id="nli3a"
						importance="Important"
						title-text="New payment #2900 and more more more more more more more more more more more more more more more text to make the title truncate"
						state="Information"
					>
					</NotificationListItem>

					<NotificationListItem
						id="nli4"
						wrapping-type="Normal"
						loading
						show-close
						title-text="New payment #2901"
						state="None"
					>
					</NotificationListItem>
				</NotificationListGroupItem>
			</NotificationList>
		);

		cy.get("#nli1").realClick();
		cy.realPress("Tab");
		cy.realPress("ArrowDown");

		cy.get("#nli2")
			.shadow()
			.find(".ui5-nli-footer-showMore")
			.should("be.focused");

		// await browser.$("#nli1").click();
		// await browser.keys("Tab");
		// await browser.keys("ArrowDown");

		// let res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli2").shadowRoot.querySelector(".ui5-nli-footer-showMore").matches(":focus"));
		// });

		// assert.ok(res, "'show more' is focused.");

		// await browser.keys("ArrowDown");
		// assert.ok(await browser.$("#nlgi2").isFocused(), "Second group is focused.");

		// await browser.keys("ArrowUp");
		// await browser.keys("Tab");
		// await browser.keys("Tab");

		// res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli2").shadowRoot.querySelector(".ui5-nli-menu-btn").matches(":focus"));
		// });

		// assert.ok(res, "'menu button' is focused.");

		// await browser.keys("ArrowUp");
		// res = await browser.executeAsync(done => {
		// 	done(document.getElementById("nli1").shadowRoot.querySelector(".ui5-nli-menu-btn").matches(":focus"));
		// });

		// assert.ok(res, "'menu button' is focused.");

		// await browser.keys("ArrowUp");
		// assert.ok(await browser.$("#nlgi1").isFocused(), "First group is focused.");
	});
});

describe("Notification List Item Without a Group", () => {
	it("ACC", () => {
		cy.mount(
			<NotificationList id="notificationListWithMenu">
				<NotificationListItem>
					<Menu />
				</NotificationListItem>
			</NotificationList>
		);

		cy.get("#notificationListWithMenu [ui5-li-notification]")
			.shadow()
			.find(".ui5-nli-root")
			.should("not.have.attr", "aria-level");
	});
});
