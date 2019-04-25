const aPartials = [`
{{#*inline "controlData"}}
	id="{{ctr._id}}"
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
{{/inline}}`, `
{{#*inline renderChild}}
  	{{#if this._slot}}
		<slot name="{{this._slot}}"></slot>
	{{else}}
		{{this.textContent}}
	{{/if}}
{{/inline}}
`];

module.exports = aPartials;
