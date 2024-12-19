function throttle(func: () => void, delay: number): () => void {
	let wait = false;

	return (...args) => {
		if (wait) {
			return;
		}

		func(...args);
		wait = true;
		setTimeout(() => {
			wait = false;
		}, delay);
	};
}
export default throttle;
