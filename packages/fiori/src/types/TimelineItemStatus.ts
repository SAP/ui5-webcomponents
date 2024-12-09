/**
 * Different statuses of a timeline item.
 * @public
 */
enum TimelineItemStatus {
	/**
	 * Default type (no special styling).
	 * @public
	 */
	None = "None",

	/**
	 * Represents an informational status, typically used to display neutral information.
	 * @public
	 */
	Information = "Information",

	/**
	 * Represents a positive or successful status, indicating that an operation is completed.
	 * @public
	 */
	Positive = "Positive",

	/**
	 * Represents a critical status, used to indicate that attention is required.
	 * @public
	 */
	Critical = "Critical",

	/**
	 * Represents a negative status, indicating that an operation failed or there is an issue.
	 * @public
	 */
	Negative = "Negative",
}

export default TimelineItemStatus;
