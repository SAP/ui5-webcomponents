type ElementDescriptor = { element: string, pseudoElement?: string };
type AnimationDescriptor = {
	element: string;
	keyframes: Keyframe[],
	options?: KeyframeAnimationOptions,
}

const StartIconAnimations: Array<AnimationDescriptor> = [
	{
		element: "#start-icon",
		keyframes: [
			{ transform: "translateY(0)" },
			{ transform: "translateY(-1rem)" },
		],
		options: {
			delay: 0,
			duration: 100,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "#start-icon",
		keyframes: [
			{ opacity: "1" },
			{ opacity: "0" },
		],
		options: {
			id: "iconFadeOut",
			delay: 60,
			duration: 40,
			fill: "forwards",
		},
	},
	{
		element: "#start-icon",
		keyframes: [
			{ transform: "translateY(1rem)" },
			{ transform: "translateY(0)" },
		],
		options: {
			delay: 240,
			duration: 100,
			fill: "forwards",
			easing: "ease-in-out",
		},
	},
	{
		element: "#start-icon",
		keyframes: [
			{ opacity: "0" },
			{ opacity: "1" },
		],
		options: {
			delay: 240,
			duration: 40,
			fill: "forwards",
		},
	},
];

const elements: Array<ElementDescriptor> = [
	{ element: "#text" },
	{ element: "#end-icon" },
	{ element: "#arrow-btn [ui5-icon]" },
	{ element: "#arrow-btn", pseudoElement: "::before" },
];

const generateTextAnimations: () => Array<AnimationDescriptor> = () => {
	return elements.map(el => {
		return [
			{
				element: el.element,
				keyframes: [
					{ transform: "translateY(0)" },
					{ transform: "translateY(-1rem)" },
				],
				options: {
					pseudoElement: el.pseudoElement,
					delay: 120,
					duration: 80,
					fill: "forwards" as FillMode,
					easing: "ease-in-out",
				},
			},
			{
				element: el.element,
				keyframes: [
					{ opacity: "1" },
					{ opacity: "0" },
				],
				options: {
					pseudoElement: el.pseudoElement,
					id: "textFadeOut",
					delay: 120,
					duration: 60,
					fill: "forwards" as FillMode,
				},
			},
			{
				element: el.element,
				keyframes: [
					{ transform: "translateY(1rem)" },
					{ transform: "translateY(0)" },
				],
				options: {
					pseudoElement: el.pseudoElement,
					delay: 300,
					duration: 80,
					fill: "forwards" as FillMode,
					easing: "ease-in-out",
				},
			},
			{
				element: el.element,
				keyframes: [
					{ opacity: "0" },
					{ opacity: "1" },
				],
				options: {
					pseudoElement: el.pseudoElement,
					delay: 300,
					duration: 60,
					fill: "forwards" as FillMode,
				},
			},
		];
	}).flat(2);
};

const TextAnimations = generateTextAnimations();

// eslint-disable-next-line import/prefer-default-export
export const ANIMATIONS = [
	...StartIconAnimations,
	...TextAnimations,
];
