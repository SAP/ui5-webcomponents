# Definition of Done

This document provides a checklist for the most common pitfalls, encountered by developers
when creating/updating UI5 Web Components.

## Properties

 - Do I **change public properties** without user interaction? 
    
Public properties belong to the application. Usually applications bind properties to a model.
If we change properties arbitrarily, the application model may get out of sync.

 - Have I set **noAttribute** for private properties that are not used for CSS?

To keep the components' DOM simple, it's highly recommended to set `noAttribute: true` for all private
properties that are not needed for CSS rules.

 - Does my **CSS handle the default values for enum properties**? 

If a component is styled differently according to the value of an enum property, do not forget to write
your CSS in a way that will apply the default styling even when the property is not set. For example,
if you have a `priority` enum with values `Normal` (default) and `Important`, do not apply the default styles just for
`:host[priority="Normal"]`, but also for simply `:host`.

## Events

 - Do I **fire an event** upon every user interaction? 

When the user interacts with a component, leading to changes to the component state, an event
must always be fired to notify the application of said changes, so that it can update its models.

 - Do I **allow the application to prevent** the default behavior of my events?

Sometimes it makes sense to allow the application to call `preventDefault()` on en event. In other cases,
this is not necessary. Consider your particular use case carefully.

## Scoping-friendy code

 - Do I have **hard-coded** tag names in my CSS or TS files?

Having CSS such as `ui5-button.accept-btn { color: green; }` is not scoping-friendly, because tag names
may vary. Use the attribute notation: `[ui5-button].accept-btn { color: green; }` instead. Similarly,
if you have code such as `this.shadowRoot.querySelector("ui5-popover")`, change it to `this.shadowRoot.querySelector("[ui5-popover]")`.

 - Do I have in my template components that are not described in **dependencies**?
