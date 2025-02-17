function throttle(func, delay) {
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
//# sourceMappingURL=throttle.js.map