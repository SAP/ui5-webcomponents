/**
 * @public
 * Policies for managing shared resources
 */
const SharedResourceReusePolicy = {
	/**
	 * Never use shared resources from other runtimes. Always overwrite existing resources.
	 * Assumes the behavior prior to introducing the Shared Resources concept.
	 */
	Never: "Never",

	/**
	 * Always use shared resources from other runtimes, regardless whether they are newer or older. Never overwrite existing resources.
	 */
	Always: "Always",

	/**
	 * Only use shared resources from other runtimes, if they are of the same version or newer. Only overwrite existing resources, if older.
	 */
	OnlyNewer: "OnlyNewer",
};

export default SharedResourceReusePolicy;
