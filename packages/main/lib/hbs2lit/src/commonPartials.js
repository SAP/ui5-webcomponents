var aPartials = [`
{{#*inline "controlData"}}
	id="{{ctr._id}}"
	data-sap-ui="{{ctr._id}}"
	aria-hidden="{{ariaHidden}}"
{{/inline}}`, `
{{#*inline "accAttributes"}}
	aria-readonly="{{ctr.readonly}}"
	aria-disabled="{{ctr.disabled}}"
	aria-hidden="{{ctr.hidden}}"
	aria-required="{{ctr.required}}"
	aria-selected="{{ctr.selected}}"
	aria-checked="{{ctr.checked}}"
	aria-describedby="{{ctr.describedby}}"
	aria-labelledby="{{ctr.labelledby}}"
{{/inline}}`];

module.exports = aPartials;