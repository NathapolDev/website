/** String formatting helpers used across the card and banner components. */
export default {
	/** Upper-cases the first character and leaves the rest untouched. */
	capitalize(string: string): string {
		return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
	},

	/** "PG-13 - Teens" -> "PG-13". */
	ratedToSmall(string: string): string {
		return string.split(" - ")[0];
	}
};
