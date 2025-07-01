/**
 * ShellBar Animation Controller
 * Provides JavaScript-based animations with Promise support for better control
 */

interface AnimationConfig {
	duration?: number;
	easing?: string;
	delay?: number;
	onStart?: () => void;
	onComplete?: () => void;
}

export class ShellBarAnimations {
	private activeAnimations = new Set<Promise<void>>();

	// Default animation configurations
	private static readonly DEFAULT_CONFIGS = {
		searchField: {
			duration: 300,
			easing: "cubic-bezier(0.4, 0, 0.2, 1)",
		},
		contentItem: {
			duration: 300,
			easing: "cubic-bezier(0.4, 0, 0.2, 1)",
			staggerDelay: 50,
		},
		button: {
			duration: 200,
			easing: "cubic-bezier(0.4, 0, 0.2, 1)",
		},
		reflow: {
			delay: 150,
		},
		restore: {
			delay: 150,
		},
	};

	/**
	 * Animate search field expansion/collapse
	 */
	async animateSearchField(element: HTMLElement, expand: boolean, config?: AnimationConfig): Promise<void> {
		const finalConfig = { ...ShellBarAnimations.DEFAULT_CONFIGS.searchField, ...config };
		const delay = finalConfig.delay;
		const animationPromise = new Promise<void>(resolve => {
			setTimeout(() => {
				const animation = element.animate([
					{
						minWidth: expand ? "0px" : "400px",
						opacity: expand ? "0" : "1",
						transform: expand ? "translateX(100%) scaleX(0)" : "translateX(0) scaleX(1)",
						paddingInlineStart: expand ? "0px" : "0.5rem",
					},
					{
						minWidth: expand ? "400px" : "0px",
						opacity: expand ? "1" : "0",
						transform: expand ? "translateX(0) scaleX(1)" : "translateX(100%) scaleX(0)",
						paddingInlineStart: expand ? "0.5rem" : "0px",
					},
				], {
					duration: finalConfig.duration,
					easing: finalConfig.easing,
				});

				finalConfig.onStart?.();

				animation.addEventListener("finish", () => {
					this.applyFinalState(element, expand ? "visible" : "hidden");
					finalConfig.onComplete?.();
					this.activeAnimations.delete(animationPromise);
					resolve();
				});
			}, delay);
		});

		this.activeAnimations.add(animationPromise);
		return animationPromise;
	}

	/**
	 * Animate content items hiding/showing with staggered delays
	 */
	async animateContentItems(
		items: HTMLElement[],
		hide: boolean,
		config?: AnimationConfig,
	): Promise<void> {
		const finalConfig = { ...ShellBarAnimations.DEFAULT_CONFIGS.contentItem, ...config };

		const animations = items.map((item, index) => {
			// const hideOrder = parseInt(item.getAttribute("data-hide-order") || "0");
			const staggerDelay = index * finalConfig.staggerDelay;

			return this.animateContentItem(item, hide, {
				...finalConfig,
				delay: (finalConfig.delay || 0) + staggerDelay,
			});
		});

		await Promise.all(animations);
	}

	/**
	 * Animate individual content item
	 */
	async animateContentItem(element: HTMLElement, hide: boolean, config?: AnimationConfig): Promise<void> {
		const finalConfig = { ...ShellBarAnimations.DEFAULT_CONFIGS.contentItem, ...config };

		const animationPromise = new Promise<void>(resolve => {
			const delay = finalConfig.delay || 0;

			setTimeout(() => {
				element.classList.add("ui5-shellbar-button-animating");
				const animation = element.animate([
					{
						opacity: hide ? "1" : "0",
						transform: hide ? "scale(1)" : "scale(0.9)",
						maxWidth: hide ? "45px" : "0px",
						paddingInlineStart: hide ? "0.5rem" : "0px",
					},
					{
						opacity: hide ? "0" : "1",
						transform: hide ? "scale(0.9)" : "scale(1)",
						maxWidth: hide ? "0px" : "45px",
						paddingInlineStart: hide ? "0px" : "0.5rem",
					},
				], {
					duration: finalConfig.duration,
					easing: finalConfig.easing,
				});

				finalConfig.onStart?.();

				animation.addEventListener("finish", () => {
					this.applyFinalState(element, hide ? "hidden" : "visible");
					element.classList.remove("ui5-shellbar-button-animating");
					finalConfig.onComplete?.();
					this.activeAnimations.delete(animationPromise);
					resolve();
				});
			}, delay);
		});

		this.activeAnimations.add(animationPromise);
		return animationPromise;
	}

	/**
	 * Coordinate complex animations with proper sequencing
	 */
	async animateResponsiveReflow(
		itemsToHide: HTMLElement[],
		itemsToShow: HTMLElement[],
		searchFieldElement: HTMLElement | null,
		searchExpand: boolean,
	): Promise<void> {
		const animations: Promise<void>[] = [];

		// Phase 1: Hide content items first (highest priority)
		if (itemsToHide.length > 0) {
			animations.push(
				this.animateContentItems(itemsToHide, true),
			);
		}

		// Phase 2: Show content items after hiding
		if (itemsToShow.length > 0) {
			animations.push(
				this.animateContentItems(itemsToShow, false),
			);
		}

		// Phase 3: Expand search field after a delay (if items are being hidden)
		if (searchFieldElement) {
			const defaultDelay = ShellBarAnimations.DEFAULT_CONFIGS.reflow.delay;
			const searchDelay = itemsToHide.length > 0 ? defaultDelay : 0; // Delay search expansion
			animations.push(
				this.animateSearchField(searchFieldElement, searchExpand, {
					delay: searchDelay,
				}),
			);
		}

		await Promise.all(animations);
	}

	/**
	 * Reverse responsive reflow animations
	 */
	async animateResponsiveRestore(
		itemsToHide: HTMLElement[],
		itemsToShow: HTMLElement[],
		searchFieldElement: HTMLElement | null,
		searchExpand: boolean,
	): Promise<void> {
		const animations: Promise<void>[] = [];

		// Phase 1: Collapse search field first if needed
		if (searchFieldElement) {
			animations.push(
				this.animateSearchField(searchFieldElement, searchExpand),
			);
		}

		// Phase 2: Hide content items first (highest priority)
		if (itemsToHide.length > 0) {
			animations.push(
				this.animateContentItems(itemsToHide, true),
			);
		}

		// Phase 3: Show content items after search collapse
		if (itemsToShow.length > 0) {
			animations.push(
				this.animateContentItems(itemsToShow, false, {
					delay: ShellBarAnimations.DEFAULT_CONFIGS.restore.delay,
				}),
			);
		}

		await Promise.all(animations);
	}

	/**
	 * Apply final state after animation
	 */
	private applyFinalState(element: HTMLElement, state: "hidden" | "visible"): void {
		switch (state) {
		case "hidden":
			element.classList.add("ui5-shellbar-hidden-button");
			break;
		case "visible":
			element.classList.remove("ui5-shellbar-hidden-button");
			break;
		}
	}
}

export default ShellBarAnimations;
