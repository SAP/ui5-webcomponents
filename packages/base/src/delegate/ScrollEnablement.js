import EventProvider from "../EventProvider.js";
import scroll from "../animations/scroll.js";

const scrollEventName = "scroll";

class ScrollEnablement extends EventProvider {
	constructor(containerComponent) {
		super();
		containerComponent.addEventListener("touchstart", this.ontouchstart.bind(this), { passive: true });
		containerComponent.addEventListener("touchmove", this.ontouchmove.bind(this), { passive: true });
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

	// scrollToElement (element, animationTime, offsets) {
	// 	aOffset = aOffset || [0, 0];

	// 	// do nothing if _$Container is not a (grand)parent of oElement
	// 	if (!this._container[0].contains(oElement) ||
	// 		oElement.style.display === "none" ||
	// 		oElement.offsetParent.nodeName.toUpperCase() === "HTML") {
	// 			return this;
	// 	}

	// 	var $Element = jQuery(oElement),
	// 		oScrollPosition = this.getChildPosition($Element),
	// 		iLeftScroll = this.getScrollLeft() + oScrollPosition.left + aOffset[0],
	// 		iTopScroll = this.getScrollTop() + oScrollPosition.top + aOffset[1];

	// 	if (this._bFlipX) {
	// 		// in IE RTL scrollLeft goes opposite direction
	// 		iLeftScroll = this.getScrollLeft() - (oScrollPosition.left - this._container.width()) - $Element.width();
	// 	}

	// 	// scroll to destination
	// 	this._scrollTo(iLeftScroll, iTopScroll , animationTime);

	// 	return this;
	// }


	// _scrollTo(x, y, animationTime) {
	// 	if (this._container.length > 0) {
	// 		if (time > 0) {
	// 			this._container.finish().animate({ scrollTop: y, scrollLeft: x }, animationTime, jQuery.proxy(this._readActualScrollPosition, this));
	// 		} else {
	// 			this._container.scrollTop(y);
	// 			this._container.scrollLeft(x);
	// 			this._readActualScrollPosition(); // if container is too large no scrolling is possible
	// 		}
	// 	}
	// }

	// _readActualScrollPosition() {
	// 	// if container has a size, this method reads the current scroll position and stores it as desired position
	// 	if (this._container.width() > 0) {
	// 		this._scrollX = this._container.scrollLeft();
	// 	}
	// 	if (this._container.height() > 0) {
	// 		this._scrollY = this._container.scrollTop();
	// 	}
	// }
}

export default ScrollEnablement;
