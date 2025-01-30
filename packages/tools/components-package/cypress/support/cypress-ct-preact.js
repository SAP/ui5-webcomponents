import { render } from 'preact';

function mount(component, container) {
	render(null, container);

	return render(component, container);
}

export {
	mount,
};
