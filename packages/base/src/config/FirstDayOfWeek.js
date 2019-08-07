import { getFirstDayOfWeek as getConfiguredFirstDayOfWeek } from "../InitialConfiguration.js";

const firstDayOfWeek = getConfiguredFirstDayOfWeek();

const getFirstDayOfWeek = () => {
	return firstDayOfWeek;
};

export { getFirstDayOfWeek }; // eslint-disable-line
