import { isPhone } from "../Device.js";
import EventProvider from "../EventProvider.js";
import scroll from "../animations/scroll.js";

const scrollEventName = "scroll";
const touchEndEventName = isPhone() ? "touchend" : "mouseup";

class ScrollEnablement extends EventProvider {
	constructor(containerComponent) {
		super();
		this.containerComponent = containerComponent;
		this.mouseMove = this.ontouchmove.bind(this);
		this.mouseUp = this.ontouchend.bind(this);
		this.touchStart = this.ontouchstart.bind(this);

		this.isPhone = isPhone();

		if (this.isPhone) {
			containerComponent.addEventListener("touchstart", this.touchStart, { passive: true });
			containerComponent.addEventListener("touchmove", this.mouseMove, { passive: true });
			containerComponent.addEventListener("touchend", this.mouseUp, { passive: true });
		} else {
			containerComponent.addEventListener("mousedown", this.touchStart, { passive: true });
		}
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
		const x = this.isPhone ? touch.clientX : touch.x;
		const y = this.isPhone ? touch.clientY : touch.y;

		return x >= rect.left && x <= rect.right
			&& y >= rect.top && y <= rect.bottom;
	}

	ontouchstart(event) {
		const touch = this.isPhone ? event.touches[0] : null;

		if (!this.isPhone) {
			document.addEventListener("mouseup", this.mouseUp, { passive: true });
			document.addEventListener("mousemove", this.mouseMove, { passive: true });
		}

		this._prevDragX = this.isPhone ? touch.pageX : event.x;
		this._prevDragY = this.isPhone ? touch.pageY : event.y;

		this._canScroll = this._isTouchInside(this.isPhone ? touch : event);
	}

	ontouchmove(event) {
		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const touch = this.isPhone ? event.touches[0] : null;

		const dragX = this.isPhone ? touch.pageX : event.x;
		const dragY = this.isPhone ? touch.pageY : event.y;

		container.scrollLeft += this._prevDragX - dragX;
		container.scrollTop += this._prevDragY - dragY;

		this.fireEvent(scrollEventName, {
			isLeft: dragX > this._prevDragX,
			isRight: dragX < this._prevDragX,
			event,
		});

		this._prevDragX = dragX;
		this._prevDragY = dragY;
	}

	ontouchend(event) {
		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const dragX = this.isPhone ? event.pageX : event.x;
		const dragY = this.isPhone ? event.pageY : event.y;

		container.scrollLeft += this._prevDragX - dragX;
		container.scrollTop += this._prevDragY - dragY;

		this.fireEvent(touchEndEventName, {
			isLeft: dragX > this._prevDragX,
			isRight: dragX < this._prevDragX,
		});

		this._prevDragX = dragX;
		this._prevDragY = dragY;

		if (!this.isPhone) {
			document.removeEventListener("mousemove", this.mouseMove, { passive: true });
			document.removeEventListener("mouseup", this.mouseUp);
		}
	}
}

export default ScrollEnablement;
