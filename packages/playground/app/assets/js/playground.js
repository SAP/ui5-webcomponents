document.addEventListener("DOMContentLoaded", function() {
    toggleNav();
    pageFocus();
    if (typeof lunr !== 'undefined') {
        initSearch();
    }
    toggleSettings();
    setTheme();
    scrollSelectedMenuItemIntoView();
});

function toggleSettings() {
  const settingsButton = document.getElementById("settings-button"),
    dialog = document.getElementById("settings-dialog"),
    cancelButton = document.getElementById("cancelButton"),
    applyButton = document.getElementById("applyButton"),
    themeSwitch = document.getElementById("themeSwitch"),
    contentDensitySwitch = document.getElementById("contentDensitySwitch"),
    textDirectionSwitch = document.getElementById("textDirectionSwitch");

  if (settingsButton) {
    settingsButton.addEventListener("click", function(event) {
      const urlParameters = getParams(window.location.href);

      // Casts to array because of IE11

      // Set selected option of contentDensitySwitch
      Array.prototype.slice.call(themeSwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        option.selected = option.value === urlParameters["sap-ui-theme"];
      });

      // Set selected option of themeSwitch
      Array.prototype.slice.call(contentDensitySwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        if (urlParameters["sap-ui-compactSize"] === "true") {
          option.selected = option.textContent === "Compact";
        } else {
          option.selected = option.textContent === "Cozy";
        }
      });

       // Set selected option of themeSwitch
       Array.prototype.slice.call(textDirectionSwitch.querySelectorAll("ui5-option")).forEach(function(option) {
        if (urlParameters["sap-ui-rtl"] === "true") {
          option.selected = option.textContent === "RTL";
        } else {
          option.selected = option.textContent === "LTR";
        }
      });

      dialog.open();
    });

    cancelButton.addEventListener("click", function(event) {
      dialog.close();
    });

    applyButton.addEventListener("click", function(event) {
      const theme = themeSwitch.selectedOption.value,
        contentDensity = contentDensitySwitch.selectedOption.textContent,
        textDirection = textDirectionSwitch.selectedOption.textContent;

        // Not implemented with string literals, beacause of IE11
        let newLocation = location.origin + location.pathname + "?sap-ui-theme=";
        newLocation += theme;
        newLocation += "&sap-ui-compactSize=";
        newLocation += contentDensity === "Compact";
        newLocation +=  "&sap-ui-rtl=";
        newLocation += textDirection === "RTL";

        window.location = newLocation;
      
      dialog.close();
    });
  }
}

function setTheme() {
  const currentTheme = getParams(window.location.href)["sap-ui-theme"];
  if (currentTheme === "sap_belize_hcb") {
    document.body.classList.add("hcb");
  } else {
    document.body.classList.remove("hcb");
  }
}

function getParams(url) {
  const params = {};
  const parser = document.createElement('a');
  parser.href = url;
  const query = parser.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
}

// Site search
function initSearch() {
    var index = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 20 });
      this.field('content', { boost: 10 });
      this.field('url');
    });
  
    // Get the generated search_data.json file so lunr.js can search it locally.
  
    sc = document.getElementsByTagName("script");
    source = '';
  
    for(idx = 0; idx < sc.length; idx++)
    {
      s = sc.item(idx);
  
      if(s.src && s.src.match(/playground\.js$/))
      { source = s.src; }
    }

    jsPath = source.replace('playground.js', '');
  
    jsonPath = jsPath + 'search-data.json';
  
    var request = new XMLHttpRequest();
    request.open('GET', jsonPath, true);
  
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        var keys = Object.keys(data);
  
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
        console.log('Error loading ajax request. Request status:' + request.status);
      }
    };
  
    request.onerror = function() {
      // There was a connection error of some sort
      console.log('There was a connection error');
    };
  
    request.send();
  
    function searchResults(dataStore) {
      var searchInput = document.querySelector('.js-search-input');
      var searchResults = document.querySelector('.js-search-results');
      var store = dataStore;
  
      function hideResults() {
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
      }
  
      searchInput.addEventListener('keyup', function(e){
        var query = this.value;
  
        searchResults.innerHTML = '';
        searchResults.classList.remove('active');
  
        if (query === '') {
          hideResults();
        } else {
          var results = index.search(query);
  
          if (results.length > 0) {
            searchResults.classList.add('active');
            var resultsList = document.createElement('ul');
            searchResults.appendChild(resultsList);
  
            for (var i in results) {
              var resultsListItem = document.createElement('li');
              var resultsLink = document.createElement('a');
              var resultsUrlDesc = document.createElement('span');
              var resultsUrl = store[results[i].ref].url;
              var resultsRelUrl = store[results[i].ref].relUrl;
              var resultsTitle = store[results[i].ref].title;
  
              resultsLink.setAttribute('href', resultsUrl);
              resultsLink.innerText = resultsTitle;
              resultsUrlDesc.innerText = resultsRelUrl;
  
              resultsList.classList.add('search-results-list');
              resultsListItem.classList.add('search-results-list-item');
              resultsLink.classList.add('search-results-link');
              resultsUrlDesc.classList.add('fs-2','text-grey-dk-000','d-block');
  
              resultsList.appendChild(resultsListItem);
              resultsListItem.appendChild(resultsLink);
              resultsLink.appendChild(resultsUrlDesc);
            }
          }
  
          // When esc key is pressed, hide the results and clear the field
          if (e.keyCode == 27) {
            hideResults();
            searchInput.value = '';
          }
        }
      });

      searchInput.addEventListener('blur', function(){
        setTimeout(function(){ hideResults() }, 300);
      });
    }
}

function pageFocus() {
    var mainContent = document.querySelector('.js-main-content');
    mainContent.focus();
}

// Show/hide mobile menu
function toggleNav() {
    const nav = document.querySelector('.js-main-nav');
    const navTrigger = document.querySelector('.js-main-nav-trigger');

    navTrigger.addEventListener("click", function(event) {
        nav.classList.toggle('nav-open');
        navTrigger.classList.toggle('nav-open');
    })
}

function scrollSelectedMenuItemIntoView() {
  document.querySelector(".navigation-list-link.active").scrollIntoView({
    behavior: "smooth",
  });
}