/**
 * Different Carousel page indicator styles.
 * @public
 */
var CarouselPageIndicatorStyle;
(function (CarouselPageIndicatorStyle) {
    /**
     * The page indicator will be visualized as dots if there are fewer than 9 pages.
     * If there are more pages, the page indicator will switch to displaying the current page and the total number of pages. (e.g. X of Y)
     * @public
     */
    CarouselPageIndicatorStyle["Default"] = "Default";
    /**
     * The page indicator will display the current page and the total number of pages. (e.g. X of Y)
     * @public
     */
    CarouselPageIndicatorStyle["Numeric"] = "Numeric";
})(CarouselPageIndicatorStyle || (CarouselPageIndicatorStyle = {}));
export default CarouselPageIndicatorStyle;
//# sourceMappingURL=CarouselPageIndicatorStyle.js.map