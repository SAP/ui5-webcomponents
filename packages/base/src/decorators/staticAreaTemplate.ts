const staticAreaTemplate = (tmpl: any): ClassDecorator => {
	return (target: any) => {
		target.staticAreaTemplate = tmpl;
	};
};

export default staticAreaTemplate;
