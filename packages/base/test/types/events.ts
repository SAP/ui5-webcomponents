// eslint-disable-next-line max-classes-per-file
type AddEvents<T extends { eventDetails: object }> = { [K in keyof T["eventDetails"] as `on${Capitalize<string & K>}`]: T["eventDetails"][K] }
type GlobalHTMLEvents = {
	"onClick": MouseEvent
	"onChange": MouseEvent
}
class Base {
    eventDetails!: {
		click?: any
		[k: string]: any
	};

	// jsxEvents!: GlobalHTMLEvents & AddEvents<this>
	// jsxEvents!: Omit<GlobalHTMLEvents, "onClick"> & AddEvents<this>
	jsxEvents!: Omit<GlobalHTMLEvents, keyof AddEvents<this>> & AddEvents<this>
}

class Link extends Base {
    eventDetails!: {
		"click": CustomEvent
		other: void
	}
}

class Button extends Base {
    eventDetails!: {
		"other": void
	}
}

export type Expect<T extends true> = T
export type Debug<T> = { [K in keyof T]: T[K] }

const b0 = new Base();
const link = new Link();
const button = new Button();
const b1: Base = link;
const b2: Base = button;

type BaseType = Debug<typeof b0.jsxEvents>
type LinkType = Debug<typeof link.jsxEvents>
type ButtonType = Debug<typeof button.jsxEvents>

link.jsxEvents.onClick = new CustomEvent("click");
button.jsxEvents.onClick = new MouseEvent("click");

type cases = [
	Expect<LinkType['onClick'] extends CustomEvent ? true : false>,
	Expect<LinkType['onClick'] extends MouseEvent ? false : true>,
	Expect<ButtonType['onClick'] extends MouseEvent ? true : false>,
]
