/**
 * Class decorator, that sets "managedSlots" metadata.
 * @param { any } target the decorated class
 * @returns { void }
 */
const managedSlots = (target: any): void => {
	target.getMetadata().metadata.managedSlots = true;
};

export default managedSlots;
