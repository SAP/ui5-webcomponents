let useNativePopovers = false;

const getUseNativePopovers = (): boolean => {
	return useNativePopovers;
};

const setUseNativePopovers = (useNative: boolean) => {
	if (useNativePopovers === useNative) {
		return;
	}

	useNativePopovers = useNative;
};

export {
	getUseNativePopovers,
	setUseNativePopovers,
};
