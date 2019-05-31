function onload() {
	// web component dialog
	var wcBtnOpenDialog = document.querySelector('.wcBtnOpenDialog');
	wcBtnOpenDialog.addEventListener('ui5-press', function () {
		var wcDialog = document.querySelector('.wcDialog');
		wcDialog.open();
	});

	var wcBtnCloseDialog = document.querySelector('.wcBtnCloseDialog');
	wcBtnCloseDialog.addEventListener('ui5-press', function () {
		var wcDialog = document.querySelector('.wcDialog');
		wcDialog.close();
	});

	var wcBtnOpenNewDialog = document.querySelector('.wcBtnOpenNewDialog');
	wcBtnOpenNewDialog.addEventListener('ui5-press', function () {
		var wcNewDialog = document.querySelector('.wcNewDialog');
		wcNewDialog.open();
	});

	var wcBtnOpenNewDialogPopover = document.querySelector('.wcBtnOpenNewDialogPopover');
	wcBtnOpenNewDialogPopover.addEventListener('ui5-press', function () {
		var wcNewDialogPopover = document.querySelector('.wcNewDialogPopover');
		wcNewDialogPopover.openBy(wcBtnOpenNewDialogPopover);
	});

	// web component popover
	var wcBtnOpenPopover = document.querySelector('.wcBtnOpenPopover');
	wcBtnOpenPopover.addEventListener('ui5-press', function () {
		var wcPopover = document.querySelector('.wcPopover');
		wcPopover.openBy(wcBtnOpenPopover);
	});

	var wcBtnClosePopover = document.querySelector('.wcBtnClosePopover');
	wcBtnClosePopover.addEventListener('ui5-press', function () {
		var wcPopover = document.querySelector('.wcPopover');
		wcPopover.close();
	});

	var wcBtnOpenNewPopover = document.querySelector('.wcBtnOpenNewPopover');
	wcBtnOpenNewPopover.addEventListener('ui5-press', function () {
		var wcNewPopover = document.querySelector('.wcNewPopover');
		wcNewPopover.openBy(wcBtnOpenNewPopover);
	});

	var wcBtnOpenNewPopoverDialog11 = document.querySelector('.wcBtnOpenNewPopoverDialog11');
	wcBtnOpenNewPopoverDialog11.addEventListener('ui5-press', function () {
		var wcNewPopoverDialog11 = document.querySelector('.wcNewPopoverDialog11');
		wcNewPopoverDialog11.open();
	});
}