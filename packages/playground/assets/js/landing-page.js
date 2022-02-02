document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(`ui5-icon[name="navigation-left-arrow"]`).addEventListener("click", function() {
        rotateLeft();
    });

    document.querySelector(`ui5-icon[name="navigation-right-arrow"]`).addEventListener("click", function() {
        rotateRight();
    });
})

function testimonials() {
    return document.querySelector(".testimonial");
}

function rotateLeft() {
    var testimonials = document.querySelectorAll(".testimonial"),
        selectedIndex;

    testimonials.forEach(function(item, index) {
        if (item.classList.contains("visible")) {
            item.classList.remove("visible");
            selectedIndex = index;
        }
    });

    if (selectedIndex === 0) {
        testimonials[testimonials.length - 1].classList.add("visible");
    } else {
        testimonials[selectedIndex - 1].classList.add("visible");
    }
}

function rotateRight() {
    var testimonials = document.querySelectorAll(".testimonial"),
        selectedIndex;

    testimonials.forEach(function(item, index) {
        if (item.classList.contains("visible")) {
            item.classList.remove("visible");
            selectedIndex = index;
        }
    });

    if (selectedIndex === testimonials.length - 1) {
        testimonials[0].classList.add("visible");
    } else {
        testimonials[selectedIndex + 1].classList.add("visible");
    }
}