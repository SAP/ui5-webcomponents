const isElementHidden = (el) => {
    if (el.nodeName === "SLOT") {
        return false;
    }
    return (el.offsetWidth <= 0 && el.offsetHeight <= 0) || (window.getComputedStyle(el).visibility === "hidden");
};
export default isElementHidden;
//# sourceMappingURL=isElementHidden.js.map