/** Numeric helpers. */
export default {
	/** Random integer in the inclusive range [min, max]. */
	randomInteger(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
};
