/**
 * Available status types of a timeline item.
 * @public
 */
enum TimelineItemStatus {
	/**
	 * Default type (no special styling).
	 * @public
	 */
	None = "None",

	/**
	 * Represents an informative status to indicate neutral information.
	 * @public
	 */
	Information = "Information",

	/**
	 * Represents a positive or successfully completed status to indicate a completed operation.
	 * @public
	 */
	Positive = "Positive",

	/**
	 * Represents a critical status to indicate that attention is required.
	 * @public
	 */
	Critical = "Critical",

	/**
	 * Represents a negative status to indicate that an operation has failed or an issue has occurred.
	 * @public
	 */
	Negative = "Negative",
}

export default TimelineItemStatus;
