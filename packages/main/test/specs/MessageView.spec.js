import { assert } from "chai";

describe("MessageView general interaction", () => {
    before(async () => {
        await browser.url(`test/pages/MessageView.html`);
    });

    it("Segmented button should shown correct count of any item type", async () => {
        // Arrange
        const messageView = await browser.$("#mv2");
        const headerButtons = await messageView.shadow$$(
            "ui5-segmented-button-item"
        );

        // Assert
        assert.strictEqual( headerButtons.length, 3, "3 buttons displayed" );

        assert.strictEqual( await headerButtons[0].getText(), "All", "Fisrt button should show the text 'All'");
        assert.strictEqual( await headerButtons[1].getText(), "1",  "Second button should show count 1" );
        assert.strictEqual( await headerButtons[2].getText(),  "1", "Third button should show count 1" );
    });

    it("Clicking on an item should navigate to details page", async () => {
        // Arrange
        const messageView = await browser.$("#mv2");

        assert.ok( await messageView.shadow$(".ui5-message-view-list").isDisplayed() );
        assert.notOk( await messageView.shadow$(".ui5-message-view-details").isDisplayed() );

        const items = await messageView.shadow$$("ui5-li-custom");
        assert.strictEqual(items.length, 2, "List should have 2 message items");

        // Act
        await items[0].click();

        // Assert
        assert.notOk( await messageView.shadow$(".ui5-message-view-list").isDisplayed() );
        assert.ok( await messageView.shadow$(".ui5-message-view-details").isDisplayed() );
    });

    it("Clicking back should navigate to list view", async () => {
        // Arrange
        const messageView = await browser.$("#mv2");
        const btnBack = await browser.$("#btnBack2");

        // Act
        // Execute in async block because the button is enabled by listening to message view events that should happen beforehand
        await browser.executeAsync(async (btnBack, done) => {
            await btnBack.click();
            done();
        }, btnBack);

        // Assert
        assert.ok( await messageView.shadow$(".ui5-message-view-list").isDisplayed() );
        assert.notOk( await messageView.shadow$(".ui5-message-view-details").isDisplayed() );
    });
});
