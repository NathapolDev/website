/** Timing helpers used to choreograph the card transition animations. */
export default {
	/**
	 * Promise-based delay that can be cancelled through an AbortSignal.
	 * Rejects with `signal.reason` when aborted.
	 */
	sleep(delay: number, { signal }: { signal?: AbortSignal } = {}): Promise<void> {
		return new Promise((resolve, reject) => {
			const timer = setTimeout(resolve, delay);

			signal?.addEventListener(
				"abort",
				() => {
					clearTimeout(timer);
					reject(signal.reason);
				},
				{ once: true }
			);
		});
	}
};
