document.addEventListener("DOMContentLoaded", function() {
    toggleNav();
    pageFocus();
    if (typeof lunr !== "undefined") {
        initSearch();
    }
    toggleSettings();
    setTheme();
    setRTL();
    scrollSelectedMenuItemIntoView();
    createMetaTags();

    var contentDensity = window.localStorage.getItem("contentDensity");
    var isCompact = (contentDensity === "Compact");

    if (isCompact) {
      document.body.classList.add("ui5-content-density-compact");
    }
});

var THEMES = {
  "sap_fiori_3": "fiori",
  "sap_fiori_3_dark": "fiori--dark",
  "sap_belize": "belize",
  "sap_belize_hcb": "hcb",
  "sap_belize_hcw": "hcw",
  "sap_horizon": "horizon",
  "sap_horizon_dark": "horizon--dark",
  "sap_horizon_hcb": "horizon--hcb",
  "sap_horizon_hcw": "horizon--hcw",
}

function toggleSettings() {
  var settingsButton = document.getElementById("settings-button"),
    dialog = document.getElementById("settings-dialog"),
    cancelButton = document.getElementById("cancelButton"),
    applyButton = document.getElementById("applyButton"),
    themeSwitch = document.getElementById("themeSwitch"),
    contentDensitySwitch = document.getElementById("contentDensitySwitch"),
    textDirectionSwitch = document.getElementById("textDirectionSwitch");

  if (settingsButton) {
    settingsButton.addEventListener("click", function(event) {
      var urlParameters = getParams(window.location.href);

      // Casts to array because of IE11

      // Set selected option of contentDensitySwitch
      Array.prototype.slice.call(themeSwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        option.selected = option.value === urlParameters["sap-ui-theme"];
      });

      // Set selected option of themeSwitch
      Array.prototype.slice.call(contentDensitySwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        if (window.localStorage.getItem("contentDensity") === "Compact") {
          option.selected = option.textContent === "Compact";
        } else {
          option.selected = option.textContent === "Cozy";
        }
      });

       // Set selected option of RTL
       Array.prototype.slice.call(textDirectionSwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        if (urlParameters["isrtl"] === "true") {
          option.selected = option.textContent === "RTL";
        } else {
          option.selected = option.textContent === "LTR";
        }
      });

      dialog.show();
    });

    cancelButton.addEventListener("click", function(event) {
      dialog.close();
    });

    applyButton.addEventListener("click", function(event) {
      var theme = themeSwitch.selectedOption.value,
        contentDensity = contentDensitySwitch.selectedOption.textContent,
        textDirection = textDirectionSwitch.selectedOption.textContent;


        /* Save the compact setting in Local Storage */
        window.localStorage.setItem("contentDensity", contentDensity);

        // Not implemented with string literals, beacause of IE11
        var newLocation = location.origin + location.pathname + "?sap-ui-theme=";
        newLocation += theme;
        newLocation +=  "&isrtl=";
        newLocation += textDirection === "RTL";

        window.location = newLocation;

      dialog.close();
    });
  }
}

function setTheme() {
  var currentTheme = getParams(window.location.href)["sap-ui-theme"];

  Object.keys(THEMES).forEach(function(themeName) {
    var css_class_name = THEMES[themeName];

    if (currentTheme === themeName) {
      document.body.classList.add(css_class_name);
    } else {
      document.body.classList.remove(css_class_name);
    }
  });
}

function setRTL() {
  var rtlIsEnabled = getParams(window.location.href)["isrtl"] === "true",
    body = document.body;

  if (rtlIsEnabled) {
    setTimeout(() => {
      body.setAttribute("dir", "rtl");
      if (window["sap-ui-webcomponents-bundle"]) {
        window["sap-ui-webcomponents-bundle"].applyDirection();
      }
    }, 0);
  } else {
    body.removeAttribute("dir");
    if (window["sap-ui-webcomponents-bundle"]) {
      window["sap-ui-webcomponents-bundle"].applyDirection();
    }
  }
}

function getParams(url) {
  var params = {};
  var parser = document.createElement("a");
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

// Site search
function initSearch() {
    var index = lunr(function () {
      this.ref("id");
      this.field("title", { boost: 20 });
      this.field("content", { boost: 10 });
      this.field("url");
    });

    // Get the generated search_data.json file so lunr.js can search it locally.

    var sc = document.getElementsByTagName("script"),
    source = "";

    for(var idx = 0; idx < sc.length; idx++)
    {
      var s = sc.item(idx);

      if(s.src && s.src.match(/playground\.js$/))
      { source = s.src; }
    }

    var jsPath = source.replace("playground.js", "");

    var jsonPath = jsPath + "search-data.json";

    var request = new XMLHttpRequest();
    request.open("GET", jsonPath, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);

        for(var i in data) {
          index.add({
            id: data[i].id,
            title: data[i].title,
            content: data[i].content,
            url: data[i].url
          });
        }
        searchResults(data);
      } else {
        // We reached our target server, but it returned an error
        console.log("Error loading ajax request. Request status:" + request.status);
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log("There was a connection error");
    };

    request.send();

    function searchResults(dataStore) {
      var searchInput = document.querySelector(".js-search-input");
      var searchResults = document.querySelector(".js-search-results");
      var store = dataStore;

      function hideResults() {
        // searchResults.innerHTML = "";
        // searchResults.classList.remove("active");
      }

      searchInput.addEventListener("keyup", function(e){
        var query = this.value;

        searchResults.innerHTML = "";
        searchResults.classList.remove("active");

        if (query === "") {
          hideResults();
        } else {
          var results = index.search(query);

          if (results.length > 0) {
            searchResults.classList.add("active");
            var resultsList = document.createElement("ul");
            searchResults.appendChild(resultsList);

            for (var i in results) {
              if (store[results[i].ref].url.indexOf("pages") > -1) {
                continue;
              }
              var resultsListItem = document.createElement("li");
              var resultsLink = document.createElement("a");
              var resultsUrlDesc = document.createElement("span");
              var resultsUrl = store[results[i].ref].url;
              var resultsRelUrl = store[results[i].ref].relUrl;
              var resultsTitle = store[results[i].ref].title;

              resultsLink.setAttribute("href", resultsUrl);
              resultsLink.innerText = resultsTitle;
              resultsUrlDesc.innerText = resultsRelUrl;

              resultsList.classList.add("search-results-list");
              resultsListItem.classList.add("search-results-list-item");
              resultsLink.classList.add("search-results-link");
              resultsUrlDesc.classList.add("fs-2","text-grey-dk-000","d-block");

              resultsList.appendChild(resultsListItem);
              resultsListItem.appendChild(resultsLink);
              resultsLink.appendChild(resultsUrlDesc);
            }
          }

          // When esc key is pressed, hide the results and clear the field
          if (e.keyCode == 27) {
            hideResults();
            searchInput.value = "";
          }
        }
      });

      searchInput.addEventListener("blur", function(){
        setTimeout(function(){ hideResults() }, 300);
      });
    }
}

function pageFocus() {
    var mainContent = document.querySelector(".js-main-content");
    mainContent.focus();
}

// Show/hide mobile menu
function toggleNav() {
    var nav = document.querySelector(".js-main-nav");
    var navTrigger = document.querySelector(".js-main-nav-trigger");

    navTrigger.addEventListener("click", function(event) {
        nav.classList.toggle("nav-open");
        navTrigger.classList.toggle("nav-open");
    })
}

function scrollSelectedMenuItemIntoView() {
  const selectedElement = document.querySelector(".navigation-list-link.active");

  if (!selectedElement) {
    return;
  }

  const selectedElementBounding = selectedElement.getBoundingClientRect();
  if (selectedElementBounding.bottom >= (window.innerHeight || document.documentElement.clientHeight)) {
    setTimeout(function() {
      selectedElement.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  }
}

function createMetaTags() {
  var metaTag = document.createElement("meta");
  var controlName = document.querySelector(".control-header");
  var controlTag = document.querySelector(".control-tag");

  if(!controlName && !controlTag) {
    // page is not sample
    return;
  }

  metaTag.name = "description";
  metaTag.content = controlName.innerText.replace(/([A-Z])/g, " $1").trim() + ", " + controlTag.innerText.replace(/[<>]/g, "") + ": UI5  Web Components usage and API docs";
  document.head.appendChild(metaTag);
}