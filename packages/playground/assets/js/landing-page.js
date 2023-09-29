document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(`ui5-icon[name="navigation-left-arrow"]`).addEventListener("click", function () {
        rotateLeft();
    });

    document.querySelector(`ui5-icon[name="navigation-right-arrow"]`).addEventListener("click", function () {
        rotateRight();
    });
})

function rotateLeft() {
    var slides = document.querySelectorAll(".slide"), selectedIndex;

    slides.forEach(function (item, index) {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
            selectedIndex = index;
        }
    });

    if (selectedIndex === 0) {
        slides[slides.length - 1].classList.add("active");
    } else {
        slides[selectedIndex - 1].classList.add("active");
    }
}

function rotateRight() {
    var slides = document.querySelectorAll(".slide"),
        selectedIndex;

    slides.forEach(function (item, index) {
        if (item.classList.contains("active")) {
            item.classList.remove("active");
            selectedIndex = index;
        }
    });

    if (selectedIndex === slides.length - 1) {
        slides[0].classList.add("active");
    } else {
        slides[selectedIndex + 1].classList.add("active");
    }
}


fetch('https://unpkg.com/@ui5/webcomponents@latest/package.json').then(async (response) => {
    const ui5wcPackageJSON = await response.json();
    const versionAnchor = document.getElementById('dynamicVersion');
    if (ui5wcPackageJSON?.version) {
        const { version } = ui5wcPackageJSON;
        versionAnchor.textContent = version;
        versionAnchor.setAttribute('href', `https://github.com/SAP/ui5-webcomponents/releases/tag/v${version}`);
    }
});
