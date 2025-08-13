import UI5Element from "../../src/UI5Element.js";
import customElement from "../../src/decorators/customElement.js";
import property from "../../src/decorators/property.js";
import event from "../../src/decorators/event-strict.js";
import jsxRenderer from "../../src/renderer/JsxRenderer.js";

@customElement({
	tag: "ui5-test-events",
	renderer: jsxRenderer,
})
@event("kebab-case")
@event("camelCase")
export class Events extends UI5Element {
	declare eventDetails: {
		"kebab-case": void
		"camelCase": void
	}

	fireKebaCaseEvent() {
		this.fireDecoratorEvent("kebab-case");
	}

	fireCamelCaseEvent() {
		this.fireDecoratorEvent("camelCase");
	}

	static get template() {
		return () => {
			return <div></div>;
		};
	}
}

Events.define();

@customElement({
	tag: "ui5-test-events-consumer",
	renderer: jsxRenderer,
})
class EventsConsumer extends UI5Element {
	@property()
	kebabCaseFired = false;
	@property()
	camelCaseFired = false;

	static get template() {
		return function (this: EventsConsumer){
			return (
				<Events
					onKebabCase={() => this.kebabCaseFired = true}
					onCamelCase={() => this.camelCaseFired = true}
				>
				</Events>
			);
		};
	}
}
EventsConsumer.define();

export default EventsConsumer;
