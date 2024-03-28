/**
 * Returns an event class decorator.
 *
 * @param { string } name the event name
 * @param { EventData } data the event data
 * @returns { ClassDecorator }
 */
declare const event: <EventDetail>(name: string, data?: {
    detail?: Record<keyof EventDetail, {
        type: any;
    }> | undefined;
}) => ClassDecorator;
export default event;
