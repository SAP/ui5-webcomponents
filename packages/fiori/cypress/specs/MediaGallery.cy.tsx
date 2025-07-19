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

describe("MediaGallery general interaction", () => {
	beforeEach(() => {
		cy.mount(
			<div>
				<span id="selectedIndexLabel"></span>
				<span id="overflowClickCallCountLabel"></span>
				<span id="displayAreaClickCallCountLabel"></span>
				<MediaGallery>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").then(($gallery) => {
			const gallery = $gallery[0];
			let overflowClickCallCount = 0;
			let displayAreaClickCallCount = 0;

			gallery.addEventListener("ui5-selection-change", (event: CustomEvent) => {
				const item = event.detail.item;
				const index = Array.from(gallery.children).indexOf(item);
				document.getElementById("selectedIndexLabel")!.innerText = index.toString();
			});

			gallery.addEventListener("ui5-overflow-click", (event: CustomEvent) => {
				document.getElementById("overflowClickCallCountLabel")!.innerText = (++overflowClickCallCount).toString();
			});

			gallery.addEventListener("ui5-display-area-click", (event: CustomEvent) => {
				document.getElementById("displayAreaClickCallCountLabel")!.innerText = (++displayAreaClickCallCount).toString();
			});
		});
	});

	it("fires selection-change on thumbnail click", () => {
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(2).click();
		cy.get("#selectedIndexLabel").should("contain.text", "2");
	});

	it("changes selection-flag on selection-change", () => {
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(1).as("oldSelectedItem");
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(2).as("newSelectedItem");

		cy.get("@oldSelectedItem").should("have.prop", "selected", true);
		cy.get("@newSelectedItem").should("have.prop", "selected", false);

		cy.get("@newSelectedItem").click();

		cy.get("@newSelectedItem").should("have.prop", "selected", true);
		cy.get("@oldSelectedItem").should("have.prop", "selected", false);
	});

	it("does not fire selection-change on click on already selected item", () => {
		cy.get("#selectedIndexLabel").then($label => {
			$label[0].innerText = "";
		});

		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(1).as("selectedItem");
		cy.get("@selectedItem").click();
		cy.get("#selectedIndexLabel").should("have.text", "");
	});

	it("fires overflow-click on overflow button click", () => {
		cy.get("#overflowClickCallCountLabel").then($label => {
			$label[0].innerText = "";
		});

		cy.get("[ui5-media-gallery]").then($gallery => {
			const gallery = $gallery[0];
			
			for (let i = 0; i < 10; i++) {
				const item = document.createElement("ui5-media-gallery-item");
				item.innerHTML = `
					<img src="./img/HT-1000.jpg" />
					<img src="./img/HT-1000.jpg" slot="thumbnail" />
				`;
				gallery.appendChild(item);
			}
		});

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-overflow ui5-button")
			.should("exist")
			.should("be.visible")
			.click();

		cy.get("#overflowClickCallCountLabel").should("contain.text", "1");
	});

	it("fires display-area-click", () => {
		cy.mount(
			<div>
				<span id="displayAreaClickCallCountLabel"></span>
				<MediaGallery interactiveDisplayArea>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").then(($gallery) => {
			const gallery = $gallery[0];
			let displayAreaClickCallCount = 0;

			gallery.addEventListener("ui5-display-area-click", (event: CustomEvent) => {
				document.getElementById("displayAreaClickCallCountLabel")!.innerText = (++displayAreaClickCallCount).toString();
			});
		});

		cy.get("#displayAreaClickCallCountLabel").then($label => {
			$label[0].innerText = "";
		});

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display")
			.click();

		cy.get("#displayAreaClickCallCountLabel").should("contain.text", "1");
	});

	it("does not fire display-area-click when interactiveDisplayArea==false", () => {
		cy.mount(
			<div>
				<span id="displayAreaClickCallCountLabel"></span>
				<MediaGallery>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").then(($gallery) => {
			const gallery = $gallery[0];
			let displayAreaClickCallCount = 0;

			gallery.addEventListener("ui5-display-area-click", (event: CustomEvent) => {
				document.getElementById("displayAreaClickCallCountLabel")!.innerText = (++displayAreaClickCallCount).toString();
			});
		});

		cy.get("#displayAreaClickCallCountLabel").then($label => {
			$label[0].innerText = "";
		});

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display")
			.click();

		cy.get("#displayAreaClickCallCountLabel").should("have.text", "");
	});

	it("fires selection-change after keyboard handling", () => {
		// Clear label
		cy.get("#selectedIndexLabel").then($label => {
			$label[0].innerText = "";
		});

		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(0).click();

		cy.realPress("ArrowDown");
		cy.realPress("Enter");

		cy.get("#selectedIndexLabel").should("contain.text", "1");

		cy.realPress("ArrowUp");
		cy.realPress("Space");

		cy.get("#selectedIndexLabel").should("contain.text", "0");
	});

	it("changes selection when selected item is disabled", () => {
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(0).as("firstItem");
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").eq(1).as("secondItem");

		cy.get("@firstItem").click();
		cy.get("@firstItem").invoke("prop", "disabled", true);

		cy.get("@firstItem").should("have.prop", "selected", false);
		cy.get("@secondItem").should("have.prop", "selected", true);
	});
});

describe("MediaGallery layout", () => {
	it("auto layout S size", () => {
		const newWidth = 599; // S size
		const marginSize = 16;
		const expectedEffectiveLayout = "Vertical";
		const expectedDisplayWidth = newWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<MediaGallery style={{ width: `${newWidth}px` }}>
				<MediaGalleryItem>
					<img src="./img/HT-1000.jpg" />
					<img src="./img/HT-1000.jpg" slot="thumbnail" />
				</MediaGalleryItem>
				<MediaGalleryItem selected>
					<img src="./img/HT-1010.jpg" />
					<img src="./img/HT-1010.jpg" slot="thumbnail" />
				</MediaGalleryItem>
				<MediaGalleryItem>
					<img src="./img/HT-1022.jpg" />
					<img src="./img/HT-1022.jpg" slot="thumbnail" />
				</MediaGalleryItem>
			</MediaGallery>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("auto layout M size", () => {
		const newWidth = 600; // M size
		const marginSize = 16;
		const thumbnailWidth = 64;
		const thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize);
		const expectedEffectiveLayout = "Horizontal";
		const expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<MediaGallery style={{ width: `${newWidth}px` }}>
				<MediaGalleryItem>
					<img src="./img/HT-1000.jpg" />
					<img src="./img/HT-1000.jpg" slot="thumbnail" />
				</MediaGalleryItem>
				<MediaGalleryItem selected>
					<img src="./img/HT-1010.jpg" />
					<img src="./img/HT-1010.jpg" slot="thumbnail" />
				</MediaGalleryItem>
				<MediaGalleryItem>
					<img src="./img/HT-1022.jpg" />
					<img src="./img/HT-1022.jpg" slot="thumbnail" />
				</MediaGalleryItem>
			</MediaGallery>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("auto layout L size and restricted height", () => {
		const newWidth = 1024; // L size
		const marginSize = 16;
		const parentHeight = 800;
		const expectedEffectiveLayout = "Horizontal";
		const expectedDisplayWidth = parentHeight - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("auto layout L size and unrestricted height", () => {
		const newWidth = 1024; // L size
		const marginSize = 16;
		const parentHeight = 3000;
		const thumbnailWidth = 64;
		const thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize);
		const expectedEffectiveLayout = "Horizontal";
		const expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").then($gallery => {
			($gallery[0] as any)._updateLayout();
		});

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("vertical layout L size and unrestricted height", () => {
		const newWidth = 1024; // L size
		const marginSize = 16;
		const parentHeight = 3000;
		const expectedEffectiveLayout = "Vertical";
		const expectedDisplayWidth = newWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery layout="Vertical" style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("vertical layout L size and restricted height", () => {
		const newWidth = 1024; // L size
		const marginSize = 16;
		const parentHeight = 600;
		const thumbnailWidth = 64;
		const thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize);
		const expectedEffectiveLayout = "Vertical";
		const expectedDisplayWidth = parentHeight - thumbnailsMenuWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery layout="Vertical" style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);
		
		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("horizontal layout S size and restricted height", () => {
		const newWidth = 599; // S size
		const marginSize = 16;
		const parentHeight = 400;
		const expectedEffectiveLayout = "Horizontal";
		const expectedDisplayWidth = parentHeight - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery layout="Horizontal" style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("horizontal layout S size and unrestricted height", () => {
		const newWidth = 599; // S size
		const marginSize = 16;
		const parentHeight = 3000;
		const thumbnailWidth = 64;
		const thumbnailsMenuWidth = thumbnailWidth + (2 * marginSize);
		const expectedEffectiveLayout = "Horizontal";
		const expectedDisplayWidth = newWidth - thumbnailsMenuWidth - (2 * marginSize);
		const expectedDisplayHeight = expectedDisplayWidth;

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery layout="Horizontal" style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem selected>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]").should("have.prop", "effectiveLayout", expectedEffectiveLayout);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});

	it("item with 'Wide' layout and all thumbnails shown", () => {
		const newWidth = 1400; // L size
		const parentHeight = 800;
		const marginSize = 16;
		const expectedDisplayWidth = 1006; // 3/4 of the available width
		const expectedDisplayHeight = parentHeight - (2 * marginSize);

		cy.mount(
			<div style={{ height: `${parentHeight}px` }}>
				<MediaGallery showAllThumbnails style={{ width: `${newWidth}px` }}>
					<MediaGalleryItem layout="Wide" selected>
						<img src="./img/HT-1000.jpg" />
						<img src="./img/HT-1000.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1010.jpg" />
						<img src="./img/HT-1010.jpg" slot="thumbnail" />
					</MediaGalleryItem>
					<MediaGalleryItem>
						<img src="./img/HT-1022.jpg" />
						<img src="./img/HT-1022.jpg" slot="thumbnail" />
					</MediaGalleryItem>
				</MediaGallery>
			</div>
		);

		cy.get("[ui5-media-gallery]")
			.shadow()
			.find(".ui5-media-gallery-display [ui5-media-gallery-item]")
			.should("have.prop", "offsetWidth", expectedDisplayWidth)
			.should("have.prop", "offsetHeight", expectedDisplayHeight);
	});
	
	it("narrow container", () => {
		const newWidth = 80; // width allows only the overflow button to be displayed; all items will overflow
	
		cy.mount(
			<MediaGallery style={{ width: `${newWidth}px` }}>
				<MediaGalleryItem>
					<img src="./img/HT-1000.jpg" />
				</MediaGalleryItem>
				<MediaGalleryItem>
					<img src="./img/HT-1010.jpg" />
				</MediaGalleryItem>
			</MediaGallery>
		);
	
		cy.get("[ui5-media-gallery] [ui5-media-gallery-item]").then($items => {
			const itemsCount = $items.length;
			
			cy.get("[ui5-media-gallery]").should("have.prop", "_overflowSize", itemsCount);
		});
	});
});