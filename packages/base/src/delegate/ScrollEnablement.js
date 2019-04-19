import EventProvider from "../EventProvider.js";
import scroll from "../animations/scroll.js";

const scrollEventName = "scroll";

class ScrollEnablement extends EventProvider {
	constructor() {
		super();
	}

	set scrollContainer(container) {
		this._container = container;
	}

	get scrollContainer() {
		return this._container;
	}

	scrollTo(left, top) {
		this._container.scrollLeft = left;
		this._container.scrollTop = top;
	}

	move(dx, dy) {
		return scroll({
			element: this._container,
			dx,
			dy,
		});
	}

	getScrollLeft() {
		return this._container.scrollLeft;
	}

	getScrollTop() {
		return this._container.scrollTop;
	}

	_isTouchInside(touch) {
		const rect = this._container.getBoundingClientRect();
		const x = touch.clientX;
		const y = touch.clientY;

		return x >= rect.left && x <= rect.right
			&& y >= rect.top && y <= rect.bottom;
	}

	ontouchstart(event) {
		const touch = event.touches[0];
		this._prevDragX = touch.pageX;
		this._prevDragY = touch.pageY;

		this._canScroll = this._isTouchInside(touch);
	}

	ontouchmove(event) {
		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const touch = event.touches[0];

		const dragX = touch.pageX;
		const dragY = touch.pageY;

		container.scrollLeft += this._prevDragX - dragX;
		container.scrollTop += this._prevDragY - dragY;

		this.fireEvent(scrollEventName, {});

		this._prevDragX = dragX;
		this._prevDragY = dragY;
	}
}

export default ScrollEnablement;
