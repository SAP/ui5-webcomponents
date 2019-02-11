import EventProvider from '../EventProvider';
import scroll from '../animations/scroll';

const scrollEventName = 'scroll';

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
			dx: dx,
			dy: dy
		});
	}

	getScrollLeft() {
		return this._container.scrollLeft;
	}

	getScrollTop() {
		return this._container.scrollTop;
	}

	_isTouchInside(touch) {
		let rect = this._container.getBoundingClientRect();
		let x = touch.clientX;
		let y = touch.clientY;

		return x >= rect.left && x <= rect.right &&
			y >= rect.top && y <= rect.bottom;
	}

	ontouchstart(event) {
		let touch = event.touches[0];
		this._prevDragX = touch.pageX;
		this._prevDragY = touch.pageY;

		this._canScroll = this._isTouchInside(touch);
	}

	ontouchmove(event) {

		if (!this._canScroll) {
			return;
		}

		let container = this._container;
		let touch = event.touches[0];

		let dragX = touch.pageX;
		let dragY = touch.pageY;

		container.scrollLeft += this._prevDragX - dragX;
		container.scrollTop += this._prevDragY - dragY;

		this.fireEvent(scrollEventName, {});

		this._prevDragX = dragX;
		this._prevDragY = dragY;
	}
}

export default ScrollEnablement;