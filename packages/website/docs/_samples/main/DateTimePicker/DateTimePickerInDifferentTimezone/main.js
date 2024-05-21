import "@ui5/webcomponents/dist/DateTimePicker.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";
import {setTimezone} from "@ui5/webcomponents-base/dist/config/Timezone.js";


sel.addEventListener("change", async (e) => {
    setTimezone(e.detail.selectedOption.getAttribute("data-timezone"));

    dtp.value = "today";
});