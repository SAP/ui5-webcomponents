import { getFirstDayOfTheWeek as getConfiguredFirstDayOfTheWeek } from "../InitialConfiguration.js";

const firstDayOfTheWeek = getConfiguredFirstDayOfTheWeek();

const getFirstDayOfTheWeek = () => {
	return firstDayOfTheWeek;
};

export { getFirstDayOfTheWeek }; // eslint-disable-line
