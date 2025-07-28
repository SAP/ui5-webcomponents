import "@ui5/webcomponents-fiori/dist/Search.js";
import "@ui5/webcomponents-icons/dist/globe.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-fiori/dist/SearchItem.js";
import "@ui5/webcomponents-fiori/dist/SearchItemShowMore.js";
import "@ui5/webcomponents-fiori/dist/SearchItemGroup.js";
import "@ui5/webcomponents-icons/dist/customer-and-supplier.js";

	const allItems = [
		{ text: "List Item 1", icon: "history" },
		{ text: "List Item 2", icon: "search" },
		{ text: "List Item 3", icon: "history" },
		{ text: "List Item 4", icon: "history" },
		{ text: "List Item 5", icon: "search" },
		{ text: "List Item 6", icon: "globe" }
	];

	const group1 = document.getElementById("group1");

	function renderItems(items) {
		group1.innerHTML = "";
		const visibleCount = 3;
		items.slice(0, visibleCount).forEach(item => {
			const el = document.createElement("ui5-search-item");
			el.addEventListener("ui5-delete", (e) => {
				const el = e.target;
				el.remove();
			});
			el.setAttribute("text", item.text);
			el.setAttribute("icon", item.icon);
			group1.appendChild(el);
		});
		if (items.length > visibleCount) {
			const showMoreLi = document.createElement("ui5-search-item-show-more");
			showMoreLi.setAttribute("text", `Show more (${items.length - visibleCount})`);
			group1.appendChild(showMoreLi);

			showMoreLi.addEventListener("click", (e) => {
				items.slice(visibleCount).forEach((item, index) => {
					const el = document.createElement("ui5-search-item");
					el.addEventListener("ui5-delete", (e) => {
						const el = e.target;
						el.remove();
					});
					el.setAttribute("text", item.text);
					el.setAttribute("icon", item.icon);
					el.highlightText = document.getElementById("searchShowMore").value;
					group1.insertBefore(el, showMoreLi);
				});
				showMoreLi.remove();
			});

			showMoreLi.addEventListener("keydown", (e) => {
				if (e.key === "Enter") {
					let first = null;
					items.slice(visibleCount).forEach((item, index) => {
						const el = document.createElement("ui5-search-item");
						el.addEventListener("ui5-delete", (e) => {
							const el = e.target;
							el.remove();
						});
						el.setAttribute("text", item.text);
						el.setAttribute("icon", item.icon);
                        el.highlightText = document.getElementById("searchShowMore").value;
						group1.insertBefore(el, showMoreLi);
						if (index === 0) {
							first = el;
						}
					});
					showMoreLi.remove();
					//wait the new items to show
					setTimeout(() => {
						first.focus();
					}, 0);
				}
			})
		}
	}

	renderItems(allItems);