import { supportsTouch } from "../Device.js";
import EventProvider from "../EventProvider.js";
import scroll from "../animations/scroll.js";
import type UI5Element from "../UI5Element.js";

const scrollEventName = "scroll";
const touchEndEventName = supportsTouch() ? "touchend" : "mouseup";

type EventListenerParam = {
	isLeft: boolean;
	isRight: boolean
}
type EventListenerReturn = void;

class ScrollEnablement extends EventProvider<EventListenerParam, EventListenerReturn> {
	containerComponent: UI5Element;
	mouseMove: (event: MouseEvent | TouchEvent) => void;
	mouseUp: (event: MouseEvent | TouchEvent) => void;
	touchStart: (event: MouseEvent | TouchEvent) => void;
	cachedValue: { dragX: number, dragY: number };
	startX: number;
	startY: number;
	_container?: HTMLElement;
	supportsTouch = supportsTouch();
	_canScroll?: boolean;
	_prevDragX?: number;
	_prevDragY?: number;

	constructor(containerComponent: UI5Element) {
		super();
		this.containerComponent = containerComponent;
		this.mouseMove = this.ontouchmove.bind(this);
		this.mouseUp = this.ontouchend.bind(this);
		this.touchStart = this.ontouchstart.bind(this);

		this.supportsTouch = supportsTouch();

		// On Android devices touchmove is thrown one more time than neccessary (together with touchend)
		// so we have to cache the previus coordinates in order to provide correct parameters in the
		// event for Android
		this.cachedValue = { dragX: 0, dragY: 0 };

		// In components like Carousel you need to know if the user has clicked on something or swiped
		// in order to throw the needed event or not
		this.startX = 0;
		this.startY = 0;

		if (this.supportsTouch) {
			containerComponent.addEventListener("touchstart", this.touchStart, { passive: true });
			containerComponent.addEventListener("touchmove", this.mouseMove, { passive: true });
			containerComponent.addEventListener("touchend", this.mouseUp, { passive: true });
		} else {
			containerComponent.addEventListener("mousedown", this.touchStart, { passive: true });
		}
	}

	set scrollContainer(container: HTMLElement) {
		this._container = container;
	}

	get scrollContainer() {
		return this._container!;
	}

	/**
	 * Scrolls the container to the left/top position, retrying retryCount times, if the container is not yet painted
	 *
	 * @param left
	 * @param top
	 * @param retryCount
	 * @param retryInterval
	 * @returns {Promise<void>} resolved when scrolled successfully
	 */
	async scrollTo(left: number, top: number, retryCount = 0, retryInterval = 0) {
		let containerPainted = this.scrollContainer.clientHeight > 0 && this.scrollContainer.clientWidth > 0;

		/* eslint-disable no-loop-func, no-await-in-loop */
		while (!containerPainted && retryCount > 0) {
			await new Promise<void>(resolve => {
				setTimeout(() => {
					containerPainted = this.scrollContainer.clientHeight > 0 && this.scrollContainer.clientWidth > 0;
					retryCount--;
					resolve();
				}, retryInterval);
			});
		}
		/* eslint-disable no-loop-func, no-await-in-loop */

		this._container!.scrollLeft = left;
		this._container!.scrollTop = top;
	}

	move(dx: number, dy: number, disableAnimation: boolean) {
		if (disableAnimation) {
			this._container!.scrollLeft += dx;
			this._container!.scrollTop += dy;
			return;
		}

		if (this._container) {
			return scroll(this._container, dx, dy);
		}
	}

	getScrollLeft() {
		return this._container!.scrollLeft;
	}

	getScrollTop() {
		return this._container!.scrollTop;
	}

	_isTouchInside(event: TouchEvent | MouseEvent) {
		let touch = null;
		if (this.supportsTouch && event instanceof TouchEvent) {
			touch = event.touches[0];
		}

		const rect = this._container!.getBoundingClientRect();
		const x = this.supportsTouch ? (touch as TouchInit).clientX : (event as MouseEvent).x;
		const y = this.supportsTouch ? (touch as TouchInit).clientY : (event as MouseEvent).y;

		return x! >= rect.left && x! <= rect.right
			&& y! >= rect.top && y! <= rect.bottom;
	}

	ontouchstart(event: TouchEvent | MouseEvent) {
		let touch = null;
		if (this.supportsTouch && event instanceof TouchEvent) {
			touch = event.touches[0];
		}

		if (!this.supportsTouch) {
			document.addEventListener("mouseup", this.mouseUp, { passive: true });
			document.addEventListener("mousemove", this.mouseMove, { passive: true });
		} else {
			// Needed only on mobile
			this.startX = touch!.pageX;
			this.startY = touch!.pageY;
		}

		if (this.supportsTouch && event instanceof TouchEvent) {
			this._prevDragX = touch!.pageX;
			this._prevDragY = touch!.pageY;
		}

		if (event instanceof MouseEvent) {
			this._prevDragX = event.x;
			this._prevDragY = event.y;
		}

		this._canScroll = this._isTouchInside(event);
	}

	ontouchmove(event: TouchEvent | MouseEvent) {
		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const touch = this.supportsTouch ? (event as TouchEvent).touches[0] : null;

		const dragX = this.supportsTouch ? (touch as TouchInit).pageX : (event as MouseEvent).x;
		const dragY = this.supportsTouch ? (touch as TouchInit).pageY : (event as MouseEvent).y;

		container!.scrollLeft += this._prevDragX! - dragX!;
		container!.scrollTop += this._prevDragY! - dragY!;

		this.fireEvent(scrollEventName, {
			isLeft: dragX! > this._prevDragX!,
			isRight: dragX! < this._prevDragX!,
		});

		this.cachedValue.dragX = this._prevDragX!;
		this.cachedValue.dragY = this._prevDragY!;

		this._prevDragX = dragX;
		this._prevDragY = dragY;
	}

	ontouchend(event: TouchEvent | MouseEvent) {
		if (this.supportsTouch) {
			const deltaX = Math.abs((event as TouchEvent).changedTouches[0].pageX - this.startX);
			const deltaY = Math.abs((event as TouchEvent).changedTouches[0].pageY - this.startY);

			if (deltaX < 10 && deltaY < 10) {
				return;
			}
		}

		if (!this._canScroll) {
			return;
		}

		const container = this._container;
		const dragX = this.supportsTouch ? (event as TouchEvent).changedTouches[0].pageX : (event as MouseEvent).x;
		const dragY = this.supportsTouch ? (event as TouchEvent).changedTouches[0].pageY : (event as MouseEvent).y;

		container!.scrollLeft += this._prevDragX! - dragX;
		container!.scrollTop += this._prevDragY! - dragY;

		const useCachedValues = dragX === this._prevDragX;
		const _dragX = useCachedValues ? this.cachedValue.dragX : dragX;
		// const _dragY = useCachedValues ? this.cachedValue.dragY : dragY; add if needed

		this.fireEvent(touchEndEventName, {
			isLeft: _dragX < this._prevDragX!,
			isRight: _dragX > this._prevDragX!,
		});

		this._prevDragX = dragX;
		this._prevDragY = dragY;

		if (!this.supportsTouch) {
			document.removeEventListener("mousemove", this.mouseMove);
			document.removeEventListener("mouseup", this.mouseUp);
		}
	}
}

export default ScrollEnablement;
