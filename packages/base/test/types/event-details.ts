import UI5Element from "../../src/UI5Element";
import event from "../../src/decorators/event-strict";

// @ts-expect-error eventDetails is fully missing
@event("toggle")
class ComponentWithoutEventDetails extends UI5Element {
    myHandler() {
        // @ts-expect-error event details is fully missing
        this.fireDecoratorEvent("toggle");
    }
}

// correct event
@event("toggle")
@event("change")
// @ts-expect-error wrong event name
@event("not-found")
class ComponentWithEventDetails extends UI5Element {
    eventDetails!: {
        toggle: void
        change: {
            data: string
        }
    };

    myHandler() {
        // correct event
        this.fireDecoratorEvent("toggle");

        // @ts-expect-error wrong event name
        this.fireDecoratorEvent("not-found");

        // @ts-expect-error wrong data type
        this.fireDecoratorEvent("change", { wrongData: "data" });
        // @ts-expect-error wrong data
        this.fireDecoratorEvent("toggle", {data: "data"});

        // still no error if data is missing, will be implemented later
        this.fireDecoratorEvent("change");

        // correct data no error
        this.fireDecoratorEvent("change", { data: "data" });

    }
}

class BaseComponent extends UI5Element {
    // no event details
}

@event("open")
// @ts-expect-error
@event("not-found")
class ChildComponent extends BaseComponent {
    // Base component should provide an empty object, not ANY
    eventDetails!: BaseComponent["eventDetails"] & {
        open: void
    }
    handler() {
        this.fireDecoratorEvent("open");
        // @ts-expect-error
        this.fireDecoratorEvent("not-found");
    }
}
