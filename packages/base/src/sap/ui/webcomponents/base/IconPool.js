import URI from "@ui5/webcomponents-core/dist/sap/ui/thirdparty/URI";
/* eslint-disable */

const SAP_ICON_FONT_FAMILY = 'SAP-icons';

const iconMapping = {
	"accidental-leave": 0xe000, "account": 0xe001, "wrench": 0xe002, "windows-doors": 0xe003,
	"washing-machine": 0xe004, "visits": 0xe005, "video": 0xe006, "travel-expense": 0x1e007,
	"temperature": 0xe008, "task": 0x1e009, "synchronize": 0xe00a, "survey": 0x1e00b,
	"settings": 0xe00c, "search": 0x1e00d, "sales-document": 0x1e00e, "retail-store": 0xe00f,
	"refresh": 0xe010, "product": 0xe011, "present": 0xe012, "ppt-attachment": 0xe013,
	"pool": 0xe014, "pie-chart": 0xe015, "picture": 0xe016, "photo-voltaic": 0xe017,
	"phone": 0xe018, "pending": 0xe019, "pdf-attachment": 0xe01a, "past": 0x1e01b,
	"outgoing-call": 0xe01c, "opportunity": 0xe01d, "opportunities": 0x1e01e, "notes": 0xe01f,
	"money-bills": 0x1e020, "map": 0xe021, "log": 0xe022, "line-charts": 0xe023,
	"lightbulb": 0xe024, "leads": 0xe025, "lead": 0x1e026, "laptop": 0xe027,
	"kpi-managing-my-area": 0x1e028, "kpi-corporate-performance": 0x1e029, "incoming-call": 0xe02a, "inbox": 0xe02b,
	"horizontal-bar-chart": 0xe02c, "history": 0xe02d, "heating-cooling": 0xe02e, "gantt-bars": 0xe02f,
	"future": 0x1e030, "fridge": 0xe031, "fallback": 0xe032, "expense-report": 0x1e033,
	"excel-attachment": 0xe034, "energy-saving-lightbulb": 0xe035, "employee": 0xe036, "email": 0xe037,
	"edit": 0xe038, "duplicate": 0xe039, "download": 0xe03a, "doc-attachment": 0xe03b,
	"dishwasher": 0xe03c, "delete": 0xe03d, "decline": 0xe03e, "complete": 0x1e03f,
	"competitor": 0xe040, "collections-management": 0xe041, "chalkboard": 0x1e042, "cart": 0xe043,
	"card": 0xe044, "camera": 0xe045, "calendar": 0x1e046, "begin": 0xe047,
	"basket": 0xe048, "bar-chart": 0xe049, "attachment": 0xe04a, "arrow-top": 0xe04b,
	"arrow-right": 0xe04c, "arrow-left": 0xe04d, "arrow-bottom": 0xe04e, "approvals": 0x1e04f,
	"appointment": 0xe050, "alphabetical-order": 0x1e051, "along-stacked-chart": 0xe052, "alert": 0xe053,
	"addresses": 0xe054, "address-book": 0x1e055, "add-filter": 0xe056, "add-favorite": 0xe057,
	"add": 0xe058, "activities": 0x1e059, "action": 0xe05a, "accept": 0x1e05b,
	"hint": 0x1e05c, "group": 0xe05d, "check-availability": 0x1e05e, "weather-proofing": 0xe05f,
	"payment-approval": 0x1e060, "batch-payments": 0x1e061, "bed": 0xe062, "arobase": 0x1e063,
	"family-care": 0xe064, "favorite": 0xe065, "navigation-right-arrow": 0xe066, "navigation-left-arrow": 0xe067,
	"e-care": 0xe068, "less": 0xe069, "lateness": 0xe06a, "lab": 0xe06b,
	"internet-browser": 0xe06c, "instance": 0xe06d, "inspection": 0xe06e, "image-viewer": 0xe06f,
	"home": 0xe070, "grid": 0xe071, "goalseek": 0xe072, "general-leave-request": 0xe073,
	"create-leave-request": 0xe074, "flight": 0xe075, "filter": 0xe076, "favorite-list": 0xe077,
	"factory": 0xe078, "endoscopy": 0xe079, "employee-pane": 0xe07a, "employee-approvals": 0x1e07b,
	"email-read": 0xe07c, "electrocardiogram": 0xe07d, "documents": 0xe07e, "decision": 0xe07f,
	"database": 0xe080, "customer-history": 0xe081, "customer": 0xe082, "credit-card": 0xe083,
	"create-entry-time": 0xe084, "contacts": 0xe085, "compare": 0xe086, "clinical-order": 0xe087,
	"chain-link": 0xe088, "pull-down": 0xe089, "cargo-train": 0xe08a, "car-rental": 0xe08b,
	"business-card": 0xe08c, "bar-code": 0xe08d, "folder-blank": 0xe08e, "passenger-train": 0xe08f,
	"question-mark": 0x1e090, "world": 0xe091, "iphone": 0xe092, "ipad": 0xe093,
	"warning": 0xe094, "sort": 0xe095, "course-book": 0xe096, "course-program": 0xe097,
	"add-coursebook": 0xe098, "print": 0xe099, "save": 0xe09a, "play": 0x1e09b,
	"pause": 0xe09c, "record": 0xe09d, "response": 0xe09e, "pushpin-on": 0xe09f,
	"pushpin-off": 0xe0a0, "unfavorite": 0xe0a1, "learning-assistant": 0xe0a2, "timesheet": 0xe0a3,
	"time-entry-request": 0xe0a4, "list": 0xe0a5, "action-settings": 0xe0a6, "share": 0xe0a7,
	"feed": 0xe0a8, "role": 0xe0a9, "flag": 0x1e0aa, "post": 0xe0ab,
	"inspect": 0xe0ac, "inspect-down": 0xe0ad, "appointment-2": 0xe0ae, "target-group": 0xe0af,
	"marketing-campaign": 0xe0b0, "notification": 0xe0b1, "message-error": 0xe0b1, "comment": 0xe0b2,
	"shipping-status": 0xe0b3, "collaborate": 0xe0b4, "shortcut": 0xe0b5, "lead-outdated": 0x1e0b6,
	"tools-opportunity": 0xe0b7, "permission": 0xe0b8, "supplier": 0xe0b9, "table-view": 0xe0ba,
	"table-chart": 0xe0bb, "switch-views": 0xe0bc, "e-learning": 0xe0bd, "manager": 0xe0be,
	"switch-classes": 0xe0bf, "simple-payment": 0x1e0c0, "signature": 0xe0c1, "sales-order-item": 0x1e0c2,
	"sales-order": 0x1e0c3, "request": 0xe0c4, "receipt": 0xe0c5, "puzzle": 0xe0c6,
	"process": 0xe0c7, "private": 0xe0c8, "popup-window": 0xe0c9, "person-placeholder": 0xe0ca,
	"per-diem": 0x1e0cb, "paper-plane": 0xe0cc, "paid-leave": 0x1e0cd, "pdf-reader": 0x1e0ce,
	"overview-chart": 0xe0cf, "overlay": 0xe0d0, "org-chart": 0xe0d1, "number-sign": 0xe0d2,
	"notification-2": 0xe0d3, "my-sales-order": 0x1e0d4, "meal": 0xe0d5, "loan": 0x1e0d6,
	"order-status": 0x1e0d7, "customer-order-entry": 0x1e0d8, "performance": 0xe0d9, "menu": 0xe0da,
	"employee-lookup": 0xe0db, "education": 0xe0dc, "customer-briefing": 0xe0dd, "customer-and-contacts": 0xe0de,
	"my-view": 0xe0df, "accelerated": 0xe0e0, "to-be-reviewed": 0xe0e1, "warning2": 0xe0e2,
	"feeder-arrow": 0xe0e3, "quality-issue": 0xe0e4, "workflow-tasks": 0xe0e5, "create": 0xe0e6,
	"home-share": 0xe0e7, "globe": 0x1e0e8, "tags": 0xe0e9, "work-history": 0xe0ea,
	"x-ray": 0xe0eb, "wounds-doc": 0xe0ec, "web-cam": 0xe0ed, "waiver": 0x1e0ee,
	"vertical-bar-chart": 0xe0ef, "upstacked-chart": 0xe0f0, "trip-report": 0xe0f1, "microphone": 0xe0f2,
	"unpaid-leave": 0x1e0f3, "tree": 0xe0f4, "toaster-up": 0xe0f5, "toaster-top": 0xe0f6,
	"toaster-down": 0xe0f7, "time-account": 0xe0f8, "theater": 0xe0f9, "taxi": 0xe0fa,
	"subway-train": 0xe0fb, "study-leave": 0xe0fc, "stethoscope": 0xe0fd, "step": 0xe0fe,
	"sonography": 0xe0ff, "soccor": 0xe100, "physical-activity": 0xe101, "pharmacy": 0xe102,
	"official-service": 0xe103, "offsite-work": 0xe104, "nutrition-activity": 0xe105, "newspaper": 0xe106,
	"monitor-payments": 0x1e107, "map-2": 0xe108, "machine": 0xe109, "mri-scan": 0xe10a,
	"end-user-experience-monitoring": 0xe10b, "unwired": 0xe10c, "customer-financial-fact-sheet": 0x1e10d, "retail-store-manager": 0xe10e,
	"Netweaver-business-client": 0xe10f, "electronic-medical-record": 0xe110, "eam-work-order": 0x1e111, "customer-view": 0xe112,
	"crm-service-manager": 0xe113, "crm-sales": 0x1e114, "widgets": 0x1e115, "commission-check": 0x1e116,
	"collections-insight": 0x1e117, "clinical-tast-tracker": 0xe118, "citizen-connect": 0xe119, "cart-approval": 0x1e11a,
	"capital-projects": 0x1e11b, "bo-strategy-management": 0xe11c, "business-objects-mobile": 0xe11d, "business-objects-explorer": 0xe11e,
	"business-objects-experience": 0xe11f, "bbyd-dashboard": 0xe120, "bbyd-active-sales": 0x1e121, "business-by-design": 0x1e122,
	"business-one": 0x1e123, "sap-box": 0xe124, "manager-insight": 0xe125, "accounting-document-verification": 0x1e126,
	"hr-approval": 0x1e127, "idea-wall": 0xe128, "Chart-Tree-Map": 0xe129, "cart-5": 0xe12a,
	"cart-4": 0xe12b, "wallet": 0xe12c, "vehicle-repair": 0xe12d, "upload": 0xe12e,
	"unlocked": 0xe12f, "umbrella": 0xe130, "travel-request": 0x1e131, "travel-expense-report": 0x1e132,
	"travel-itinerary": 0xe133, "time-overtime": 0x1e134, "thing-type": 0xe135, "technical-object": 0xe136,
	"tag": 0xe137, "syringe": 0xe138, "syntax": 0xe139, "suitcase": 0xe13a,
	"simulate": 0xe13b, "shield": 0xe13c, "share-2": 0xe13d, "sales-quote": 0x1e13e,
	"repost": 0xe13f, "provision": 0xe140, "projector": 0xe141, "add-product": 0xe142,
	"pipeline-analysis": 0xe143, "add-photo": 0xe144, "palette": 0xe145, "nurse": 0xe146,
	"sales-notification": 0x1e147, "mileage": 0xe148, "meeting-room": 0xe149, "media-forward": 0x1e14a,
	"media-play": 0x1e14b, "media-pause": 0xe14c, "media-reverse": 0x1e14d, "media-rewind": 0x1e14e,
	"measurement-document": 0xe14f, "measuring-point": 0xe150, "measure": 0xe151, "map-3": 0xe152,
	"locked": 0xe153, "letter": 0xe154, "journey-arrive": 0xe155, "journey-change": 0xe156,
	"journey-depart": 0xe157, "it-system": 0xe158, "it-instance": 0xe159, "it-host": 0xe15a,
	"iphone-2": 0xe15b, "ipad-2": 0xe15c, "inventory": 0xe15d, "insurance-house": 0xe15e,
	"insurance-life": 0xe15f, "insurance-car": 0xe160, "initiative": 0xe161, "incident": 0x1e162,
	"group-2": 0xe163, "goal": 0xe164, "functional-location": 0xe165, "full-screen": 0xe166,
	"form": 0xe167, "fob-watch": 0xe168, "blank-tag": 0xe169, "family-protection": 0xe16a,
	"folder": 0xe16b, "fax-machine": 0xe16c, "example": 0xe16d, "eraser": 0xe16e,
	"employee-rejections": 0xe16f, "drop-down-list": 0xe170, "draw-rectangle": 0xe171, "document": 0xe172,
	"doctor": 0xe173, "discussion-2": 0xe174, "discussion": 0xe175, "dimension": 0xe176,
	"customer-and-supplier": 0xe177, "crop": 0xe178, "add-contact": 0xe179, "compare-2": 0xe17a,
	"color-fill": 0xe17b, "collision": 0xe17c, "curriculum": 0xe17d, "chart-axis": 0xe17e,
	"full-stacked-chart": 0xe17f, "full-stacked-column-chart": 0xe180, "vertical-bar-chart-2": 0xe181, "horizontal-bar-chart-2": 0xe182,
	"horizontal-stacked-chart": 0xe183, "vertical-stacked-chart": 0xe184, "choropleth-chart": 0x1e185, "geographic-bubble-chart": 0x1e186,
	"multiple-radar-chart": 0xe187, "radar-chart": 0xe188, "crossed-line-chart": 0xe189, "multiple-line-chart": 0xe18a,
	"multiple-bar-chart": 0xe18b, "line-chart": 0xe18c, "line-chart-dual-axis": 0xe18d, "bubble-chart": 0xe18e,
	"scatter-chart": 0xe18f, "multiple-pie-chart": 0xe190, "column-chart-dual-axis": 0xe191, "tag-cloud-chart": 0xe192,
	"area-chart": 0xe193, "cause": 0xe194, "cart-3": 0xe195, "cart-2": 0xe196,
	"bus-public-transport": 0xe197, "burglary": 0xe198, "building": 0xe199, "border": 0xe19a,
	"bookmark": 0xe19b, "badge": 0xe19c, "attachment-audio": 0xe19d, "attachment-video": 0xe19e,
	"attachment-html": 0xe19f, "attachment-photo": 0xe1a0, "attachment-e-pub": 0xe1a1, "attachment-zip-file": 0xe1a2,
	"attachment-text-file": 0xe1a3, "add-equipment": 0xe1a4, "add-activity": 0x1e1a5, "activity-individual": 0xe1a6,
	"activity-2": 0x1e1a7, "add-activity-2": 0x1e1a8, "activity-items": 0xe1a9, "activity-assigned-to-goal": 0xe1aa,
	"status-completed": 0xe1ab, "status-positive": 0xe1ab, "status-error": 0xe1ac, "status-negative": 0xe1ac,
	"status-inactive": 0xe1ad, "status-in-process": 0xe1ae, "status-critical": 0xe1ae, "blank-tag-2": 0xe1af,
	"cart-full": 0xe1b0, "locate-me": 0xe1b1, "paging": 0xe1b2, "company-view": 0xe1b3,
	"document-text": 0xe1b4, "explorer": 0xe1b5, "personnel-view": 0xe1b6, "sorting-ranking": 0xe1b7,
	"drill-down": 0xe1b8, "drill-up": 0xe1b9, "vds-file": 0xe1ba, "sap-logo-shape": 0x1e1bb,
	"folder-full": 0xe1bc, "system-exit": 0xe1bd, "system-exit-2": 0xe1be, "close-command-field": 0xe1bf,
	"open-command-field": 0xe1c0, "sys-enter-2": 0x1e1c1, "sys-enter": 0x1e1c2, "sys-help-2": 0x1e1c3,
	"sys-help": 0x1e1c4, "sys-back": 0xe1c5, "sys-back-2": 0xe1c6, "sys-cancel": 0xe1c7,
	"sys-cancel-2": 0xe1c8, "open-folder": 0xe1c9, "sys-find-next": 0xe1ca, "sys-find": 0xe1cb,
	"sys-monitor": 0xe1cc, "sys-prev-page": 0xe1cd, "sys-first-page": 0xe1ce, "sys-next-page": 0xe1cf,
	"sys-last-page": 0xe1d0, "generate-shortcut": 0xe1d1, "create-session": 0xe1d2, "display-more": 0xe1d3,
	"enter-more": 0xe1d4, "zoom-in": 0xe1d5, "zoom-out": 0xe1d6, "header": 0xe1d7,
	"detail-view": 0xe1d8, "show-edit": 0xe1d8, "collapse": 0xe1d9, "expand": 0xe1da, "positive": 0xe1db,
	"negative": 0xe1dc, "display": 0xe1dd, "menu2": 0xe1de, "redo": 0xe1df,
	"undo": 0xe1e0, "navigation-up-arrow": 0xe1e1, "navigation-down-arrow": 0xe1e2, "down": 0xe1e3,
	"up": 0xe1e4, "shelf": 0xe1e5, "background": 0xe1e6, "resize": 0xe1e7,
	"move": 0xe1e8, "show": 0xe1e9, "hide": 0xe1ea, "nav-back": 0xe1eb,
	"error": 0xe1ec, "slim-arrow-right": 0xe1ed, "slim-arrow-left": 0xe1ee, "slim-arrow-down": 0xe1ef,
	"slim-arrow-up": 0xe1f0, "forward": 0xe1f1, "overflow": 0xe1f2, "value-help": 0xe1f3,
	"multi-select": 0x1e1f4, "exit-full-screen": 0xe1f5, "sys-add": 0xe1f6, "sys-minus": 0xe1f7,
	"dropdown": 0xe1f8, "expand-group": 0xe1f9, "collapse-group": 0xe200, "vertical-grip": 0xe1fa,
	"horizontal-grip": 0xe1fb, "sort-descending": 0xe1fc, "sort-ascending": 0xe1fd, "arrow-down": 0xe1fe,
	"legend": 0xe1ff, "message-warning": 0xe201, "message-information": 0x1e202, "message-success": 0x1e203,
	"restart": 0xe204, "stop": 0xe205, "add-process": 0xe206, "cancel-maintenance": 0xe207,
	"activate": 0xe208, "resize-horizontal": 0xe209, "resize-vertical": 0xe20a, "connected": 0xe20b,
	"disconnected": 0xe20c, "edit-outside": 0xe20d, "key": 0xe20e, "minimize": 0xe20f,
	"back-to-top": 0xe210, "hello-world": 0xe211, "outbox": 0xe212, "donut-chart": 0xe213,
	"heatmap-chart": 0xe214, "horizontal-bullet-chart": 0xe215, "vertical-bullet-chart": 0xe216, "call": 0xe217,
	"download-from-cloud": 0xe218, "upload-to-cloud": 0xe219, "jam": 0xe21a, "sap-ui5": 0xe21b,
	"message-popup": 0xe21c, "cloud": 0xe21d, "horizontal-waterfall-chart": 0x1e21e, "vertical-waterfall-chart": 0x1e21f,
	"broken-link": 0xe220, "headset": 0xe221, "thumb-up": 0x1e222, "thumb-down": 0x1e223,
	"multiselect-all": 0x1e224, "multiselect-none": 0x1e225, "scissors": 0xe226, "sound": 0x1e227,
	"sound-loud": 0x1e228, "sound-off": 0x1e229, "date-time": 0x1e22a, "user-settings": 0xe22b,
	"key-user-settings": 0xe22c, "developer-settings": 0xe22d, "text-formatting": 0x1e22e, "bold-text": 0x1e22f,
	"italic-text": 0x1e230, "underline-text": 0x1e231, "text-align-justified": 0x1e232, "text-align-left": 0x1e233,
	"text-align-center": 0x1e234, "text-align-right": 0x1e235, "bullet-text": 0x1e236, "numbered-text": 0x1e237,
	"co": 0xe238, "ui-notifications": 0xe239, "bell": 0xe23a, "cancel-share": 0xe23b,
	"write-new-document": 0xe23c, "write-new": 0xe23d, "cancel": 0x1e23e, "screen-split-one": 0xe23f,
	"screen-split-two": 0xe240, "screen-split-three": 0xe241, "customize": 0xe242, "user-edit": 0xe243,
	"source-code": 0xe244, "copy": 0xe245, "paste": 0xe246, "line-chart-time-axis": 0x1e247,
	"clear-filter": 0xe248, "reset": 0xe249, "trend-up": 0xe24a, "trend-down": 0xe24b,
	"cursor-arrow": 0xe24c, "add-document": 0xe24d, "create-form": 0xe24e, "resize-corner": 0xe24f,
	"chevron-phase": 0xe250, "chevron-phase-2": 0xe251, "rhombus-milestone": 0xe252, "rhombus-milestone-2": 0xe253,
	"circle-task": 0xe254, "circle-task-2": 0xe255, "project-definition-triangle": 0xe256, "project-definition-triangle-2": 0xe257,
	"master-task-triangle": 0xe258, "master-task-triangle-2": 0xe259, "program-triangles": 0xe25a, "program-triangles-2": 0xe25b,
	"mirrored-task-circle": 0xe25c, "mirrored-task-circle-2": 0xe25d, "checklist-item": 0xe25e, "checklist-item-2": 0xe25f,
	"checklist": 0xe260, "checklist-2": 0xe261, "chart-table-view": 0xe262, "filter-analytics": 0xe263, "filter-facets": 0xe264,
	"filter-fields": 0xe265, "indent": 0xe266, "outdent": 0xe267, "heading1": 0x1e268, "heading2": 0x1e269, "heading3": 0x1e26a,
	"decrease-line-height": 0xe26b, "increase-line-height": 0xe26c, "fx": 0x1e26d, "add-folder": 0xe26e, "away": 0xe26f,
	"busy": 0xe270, "appear-offline": 0xe271, "blur": 0xe272, "pixelate": 0xe273,
	"horizontal-combination-chart": 0xe274, "add-employee": 0xe275, "text-color": 0x1e276,
	"browse-folder": 0xe277, "primary-key": 0xe278, "two-keys": 0xe279,
	"strikethrough": 0xe27a, "text": 0xe27b, "responsive": 0xe27c, "desktop-mobile": 0xe27d,
	"table-row": 0xe27e, "table-column": 0xe27f, "validate": 0x1e280, "keyboard-and-mouse": 0xe281,
	"touch": 0xe282, "expand-all": 0xe283, "collapse-all": 0xe284, "combine": 0xe285, "split": 0xe286
}

/* eslint-enable */
const getIconURI = iconName => {
	return `sap-icon://${iconName}`;
};

const getIconInfo = iconURI => {
	if (!isIconURI(iconURI)) {
		console.warn(`Invalid icon URI ${iconURI}`); /* eslint-disable-line */
		return;
	}

	let iconName = URI.parse(iconURI).hostname;

	/* when "sap-icon://" is skipped, but icon is valid */
	if (iconURI.indexOf("sap-icon://") === -1) {
		iconName = URI.parse(iconURI).protocol;
	}

	return {
		fontFamily: SAP_ICON_FONT_FAMILY,
		uri: getIconURI(iconName),
		content: `${stringFromCharCode(iconMapping[iconName])}`,
	};
};

const isIconURI = uri => {
	return /sap-icon:\/\//.test(uri) || iconMapping.hasOwnProperty(uri); /* eslint-disable-line */
};

const stringFromCharCode = code => {
	return String.fromCharCode(typeof code === "number" ? code : parseInt(code, 16));
};

export {
	getIconURI,
	getIconInfo,
	isIconURI,
};
