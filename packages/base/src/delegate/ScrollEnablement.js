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
		this.isPhone = isPhone();

		if (this.isPhone) {
			containerComponent.addEventListener("touchstart", this.ontouchstart.bind(this), { passive: true });
			containerComponent.addEventListener("touchmove", this.ontouchmove.bind(this), { passive: true });
			containerComponent.addEventListener("touchend", this.ontouchend.bind(this), { passive: true });
		} else {
			containerComponent.addEventListener("mousedown", this.ontouchstart.bind(this), { passive: true });
			containerComponent.addEventListener("mouseup", this.ontouchend.bind(this), { passive: true });
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
		const touch = this.isPhone && event.touches[0];
		this._prevDragX = this.isPhone ? touch.pageX : event.x;
		this._prevDragY = this.isPhone ? touch.pageY : event.y;

		this._canScroll = this._isTouchInside(event);

		if (!this.isPhone) {
			this.containerComponent.addEventListener("mousemove", this.mouseMove, { passive: true });
		}
	}

	ontouchmove(event) {
		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const touch = this.isPhone && event.touches[0];

		const dragX = this.isPhone ? touch.pageX : event.x;
		const dragY = this.isPhone ? touch.pageY : event.y;

		container.scrollLeft += this._prevDragX - dragX;
		container.scrollTop += this._prevDragY - dragY;

		this.fireEvent(scrollEventName, {
			isLeft: dragX > this._prevDragX,
			isRight: dragX < this._prevDragX,
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
			this.containerComponent.removeEventListener("mousemove", this.mouseMove, { passive: true });
		}
	}
}

export default ScrollEnablement;
