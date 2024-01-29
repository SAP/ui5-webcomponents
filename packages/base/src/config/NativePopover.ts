import { reRenderAllUI5Elements } from "../Render.js";

let useNativePopovers = false;

const getUseNativePopovers = (): boolean => {
	return useNativePopovers;
};

const setUseNativePopovers = async (useNative: boolean): Promise<void> => {
	if (useNativePopovers === useNative) {
		return;
	}

	useNativePopovers = useNative;

	await reRenderAllUI5Elements({ staticAreaAware: true });
};

export {
	getUseNativePopovers,
	setUseNativePopovers,
};
