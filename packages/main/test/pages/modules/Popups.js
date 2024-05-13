// web component dialog
var wcBtnOpenDialog = document.querySelector('.wcBtnOpenDialog');
wcBtnOpenDialog.addEventListener('click', function () {
	var wcDialog = document.querySelector('.wcDialog');
	wcDialog.open = true;
});

var wcBtnCloseDialog = document.querySelector('.wcBtnCloseDialog');
wcBtnCloseDialog.addEventListener('click', function () {
	var wcDialog = document.querySelector('.wcDialog');
	wcDialog.open = false;
});

var wcBtnOpenNewDialog = document.querySelector('.wcBtnOpenNewDialog');
wcBtnOpenNewDialog.addEventListener('click', function () {
	var wcNewDialog = document.querySelector('.wcNewDialog');
	wcNewDialog.open = true;
});

var wcBtnOpenNewDialogPopover = document.querySelector('.wcBtnOpenNewDialogPopover');
wcBtnOpenNewDialogPopover.addEventListener('click', function () {
	var wcNewDialogPopover = document.querySelector('.wcNewDialogPopover');
	wcNewDialogPopover.opener = wcBtnOpenNewDialogPopover;
	wcNewDialogPopover.open = true;
});

// web component popover
var wcBtnOpenPopover = document.querySelector('.wcBtnOpenPopover');
wcBtnOpenPopover.addEventListener('click', function () {
	var wcPopover = document.querySelector('.wcPopover');
	wcPopover.opener = wcBtnOpenPopover;
	wcPopover.open = true;
});

var wcBtnClosePopover = document.querySelector('.wcBtnClosePopover');
wcBtnClosePopover.addEventListener('click', function () {
	var wcPopover = document.querySelector('.wcPopover');
	wcPopover.open = false;
});

var wcBtnOpenNewPopover = document.querySelector('.wcBtnOpenNewPopover');
wcBtnOpenNewPopover.addEventListener('click', function () {
	var wcNewPopover = document.querySelector('.wcNewPopover');
	wcNewPopover.opener = wcBtnOpenNewPopover;
	wcNewPopover.open = true;
});

var wcBtnOpenNewPopoverDialog11 = document.querySelector('.wcBtnOpenNewPopoverDialog11');
wcBtnOpenNewPopoverDialog11.addEventListener('click', function () {
	var wcNewPopoverDialog11 = document.querySelector('.wcNewPopoverDialog11');
	wcNewPopoverDialog11.open = true;
});
