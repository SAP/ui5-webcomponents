import { h, render } from 'preact';

function mount(component, container) {
	render(null, container);

	if (typeof component === "string") {
		return render(h("div", { dangerouslySetInnerHTML: { __html: component } }), container);
	}

	return render(component, container);
}

export {
	mount,
};
