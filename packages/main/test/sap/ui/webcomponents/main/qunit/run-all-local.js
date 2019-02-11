QUnit.testSuites(tests.map(function (test) {
	var location = window.location.href;
	var startFileIndex = location.lastIndexOf("/");
	var path = location.slice(0, startFileIndex + 1);

	return path + "runner.html?testName=" + test;
}));