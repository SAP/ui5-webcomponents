const template = (tmpl: any): ClassDecorator => {
	return (target: any) => {
		target.template = tmpl;
	};
};

export default template;
