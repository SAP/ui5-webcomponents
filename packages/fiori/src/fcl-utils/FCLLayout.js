const getLayoutsByMedia = (smallTwo = 33, smallThree = 25) => {
	const bigTwo = 100 - smallTwo; // 67% by spec
	const bigThree = 100 - 2 * smallThree; // 50% by spec

	return {
		desktop: {
			"OneColumn": {
				layout: ["100%", 0, 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: [`${bigTwo}%`, `${smallTwo}%`, 0],
				arrows: [
					{ visible: true, dir: "mirror" },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: [`${smallTwo}%`, `${bigTwo}%`, 0],
				arrows: [
					{ visible: true, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsStartExpanded": {
				layout: [`${smallThree}%`, `${bigThree}%`, `${smallThree}%`],
				arrows: [
					{ visible: true, dir: null },
					{ visible: true, dir: null },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: [`${smallThree}%`, `${bigThree}%`, `${smallThree}%`],
				arrows:	[
					{ visible: true, dir: null },
					{ visible: true, dir: null },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: [`${smallThree}%`, `${smallThree}%`, `${bigThree}%`],
				arrows: [
					{ visible: false, dir: null, separator: true },
					{ visible: true, dir: "mirror" },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: [`${bigTwo}%`, `${smallTwo}%`, 0],
				arrows: [
					{ visible: true, dir: "mirror" },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: [`${smallTwo}%`, `${bigTwo}%`, 0],
				arrows: [
					{ visible: true, dir: null },
					{ visible: true, dir: null },
				],
			},
			"MidColumnFullScreen": {
				layout: [0, "100%", 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"EndColumnFullScreen": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
		},
		tablet: {
			"OneColumn": {
				layout: ["100%", 0, 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: [`${bigTwo}%`, `${smallTwo}%`, 0],
				arrows: [
					{ visible: true, dir: "mirror" },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: [`${smallTwo}%`, `${bigTwo}%`, 0],
				arrows: [
					{ visible: true, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsStartExpanded": {
				layout: [`${bigTwo}%`, `${smallTwo}%`, 0],
				arrows: [
					{ visible: true, dir: "mirror" },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: [0, `${bigTwo}%`, `${smallTwo}%`],
				arrows: [
					{ visible: true, dir: null },
					{ visible: true, dir: null },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: [0, `${smallTwo}%`, `${bigTwo}%`],
				arrows: [
					{ visible: false, dir: null },
					{ visible: true, dir: "mirror" },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: [`${bigTwo}%`, `${smallTwo}%`, 0],
				arrows: [
					{ visible: true, dir: "mirror" },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: [`${smallTwo}%`, `${bigTwo}%`, 0],
				arrows: [
					{ visible: true, dir: null },
					{ visible: true, dir: null },
				],
			},
			"MidColumnFullScreen": {
				layout: [0, "100%", 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"EndColumnFullScreen": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
		},
		phone: {
			"OneColumn": {
				layout: ["100%", 0, 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsStartExpanded": {
				layout: [0, "100%", 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"TwoColumnsMidExpanded": {
				layout: [0, "100%", 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsStartExpanded": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsMidExpanded": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsEndExpanded": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsStartExpandedEndHidden": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"ThreeColumnsMidExpandedEndHidden": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"MidColumnFullScreen": {
				layout: [0, "100%", 0],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
			"EndColumnFullScreen": {
				layout: [0, 0, "100%"],
				arrows: [
					{ visible: false, dir: null },
					{ visible: false, dir: null },
				],
			},
		},
	};
};

const getNextLayoutByStartArrow = () => {
	return {
		"TwoColumnsStartExpanded": "TwoColumnsMidExpanded",
		"TwoColumnsMidExpanded": "TwoColumnsStartExpanded",
		"ThreeColumnsMidExpanded": "ThreeColumnsMidExpandedEndHidden",
		"ThreeColumnsEndExpanded": "ThreeColumnsStartExpandedEndHidden",
		"ThreeColumnsStartExpandedEndHidden": "ThreeColumnsMidExpandedEndHidden",
		"ThreeColumnsMidExpandedEndHidden": "ThreeColumnsStartExpandedEndHidden",
	};
};

const getNextLayoutByEndArrow = () => {
	return {
		"ThreeColumnsMidExpanded": "ThreeColumnsEndExpanded",
		"ThreeColumnsEndExpanded": "ThreeColumnsMidExpanded",
		"ThreeColumnsStartExpandedEndHidden": "ThreeColumnsMidExpanded",
		"ThreeColumnsMidExpandedEndHidden": "ThreeColumnsMidExpanded",
	};
};

export {
	getLayoutsByMedia,
	getNextLayoutByStartArrow,
	getNextLayoutByEndArrow,
};
