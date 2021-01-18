const hasNativeSupport = () => {
	return !window.ShadyDOM;
};

export default hasNativeSupport;
