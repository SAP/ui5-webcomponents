function onload() {

	// Attaching click listener to the Button which shows the TopStart Toast
	document.querySelector('.wcBtnShowToastTS')
			.addEventListener('click', function () {
				document.querySelector('.wcToastTS').show();
			});

	// Attaching click listener to the Button which shows the TopCenter Toast
	document.querySelector('.wcBtnShowToastTC')
			.addEventListener('click', function () {
				document.querySelector('.wcToastTC').show();
			});

	// Attaching click listener to the Button which shows the TopEnd Toast
	document.querySelector('.wcBtnShowToastTE')
			.addEventListener('click', function () {
				document.querySelector('.wcToastTE').show();
			});

	// Attaching click listener to the Button which shows the MiddleStart Toast
	document.querySelector('.wcBtnShowToastMS')
			.addEventListener('click', function () {
				document.querySelector('.wcToastMS').show();
			});

	// Attaching click listener to the Button which shows the MiddleCenter Toast
	document.querySelector('.wcBtnShowToastMC')
			.addEventListener('click', function () {
				document.querySelector('.wcToastMC').show();
			});

	// Attaching click listener to the Button which shows the MiddleEnd Toast
	document.querySelector('.wcBtnShowToastME')
			.addEventListener('click', function () {
				document.querySelector('.wcToastME').show();
			});

	// Attaching click listener to the Button which shows the BottomStart Toast
	document.querySelector('.wcBtnShowToastBS')
			.addEventListener('click', function () {
				document.querySelector('.wcToastBS').show();
			});

	// Attaching click listener to the Button which shows the BottomCenter Toast
	document.querySelector('.wcBtnShowToastBC')
			.addEventListener('click', function () {
				document.querySelector('.wcToastBC').show();
			});

	// Attaching click listener to the Button which shows the BottomEnd Toast
	document.querySelector('.wcBtnShowToastBE')
			.addEventListener('click', function () {
				document.querySelector('.wcToastBE').show();
			});
}