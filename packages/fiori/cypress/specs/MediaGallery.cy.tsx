import MediaGallery from "../../src/MediaGallery.js";
import MediaGalleryItem from "../../src/MediaGalleryItem.js";
import type UI5Element from "@ui5/webcomponents-base";

describe("MediaGallery - getFocusDomRef Method", () => {
	it("should return undefined when the MediaGallery is empty", () => {
		cy.mount(<MediaGallery></MediaGallery>);

		cy.get<MediaGallery>("[ui5-media-gallery]")
			.then(($el) => {
				expect($el[0].getFocusDomRef()).to.be.undefined;
			});
	});

	it("should return first item if no item was focused before", () => {
		cy.mount(
			<MediaGallery showAllThumbnails>
				<MediaGalleryItem id="item1">
				<img src="./img/HT-1000.jpg"/>
				<img src="./img/HT-1000.jpg" slot="thumbnail"/>
				</MediaGalleryItem>
				<MediaGalleryItem id="item2">
				<img src="./img/HT-1000.jpg"/>
				<img src="./img/HT-1000.jpg" slot="thumbnail"/>
				</MediaGalleryItem>
			</MediaGallery>
		);

		cy.get<UI5Element>("[ui5-media-gallery], #item1")
		.then(($el) => {
			const mg = $el[0];
			const item = $el[1];
			expect(mg.getFocusDomRef()).to.equal(item.getFocusDomRef());
		});
	});

	it("should return last focused item in the MediaGallery", () => {
		cy.mount(
			<MediaGallery>
				<MediaGalleryItem id="item1">
					 <img src="./img/HT-1000.jpg"/>
					 <img src="./img/HT-1000.jpg" slot="thumbnail"/>
				</MediaGalleryItem>
				<MediaGalleryItem id="item2">
					 <img src="./img/HT-1000.jpg"/>
					 <img src="./img/HT-1000.jpg" slot="thumbnail"/>
				</MediaGalleryItem>
			</MediaGallery>
		);

		cy.get("#item2").click();
		cy.get("#item2").should("be.focused");

		cy.get<UI5Element>("[ui5-media-gallery], #item2")
			.then(($el) => {
				const mg = $el[0];
				const item = $el[1];

				expect(mg.getFocusDomRef()).to.equal(item.getFocusDomRef());
		});
	});
});