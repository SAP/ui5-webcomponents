import type Page from "./Page.js";
import Search from "./Search.js";
import SearchItem from "./SearchItem.js";

export default function PageTemplate(this: Page) {
	return (
		<Search onInput={this.handleInput}>
			{(this.items || []).map(item => (
				<SearchItem text={item.text} />
			))}
		</Search>
	);
}
