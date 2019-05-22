var aPartials = [`
{{#*inline "controlData"}}
	id="{{ctr._id}}"
	data-sap-ui="{{ctr._id}}"
	?aria-hidden="{{ariaHidden}}"
{{/inline}}`
];

module.exports = aPartials;