import "@ui5/webcomponents/dist/Label.js";

import "@ui5/webcomponents-fiori/dist/Timeline.js";
import "@ui5/webcomponents-fiori/dist/TimelineItem.js";

import "@ui5/webcomponents-icons/dist/phone.js";
import "@ui5/webcomponents-icons/dist/calendar.js";

let itemsLoaded = 0;
const itemToLoad = 5;
const growingTimeline = document.querySelector("#growingTimeline");
const timelineItemTemplate = (index) => {
    var timelineItem = document.createElement("ui5-timeline-item");
    timelineItem.titleText = "Title text";
    timelineItem.subtitleText = "The subtitle text goes here " + index;
    timelineItem.icon = "calendar";
    return timelineItem;
}


const insertItems = (timeline) => {
    for (var i = itemsLoaded; i < itemsLoaded + itemToLoad; i++) {
        timeline.appendChild(timelineItemTemplate(i));
    }
    itemsLoaded+= itemToLoad;
}

growingTimeline.addEventListener("load-more", (e) => {
    growingTimeline.loading = true;

    setTimeout(() => {
        insertItems(growingTimeline);
        growingTimeline.loading = false;
    }, 1500);
});