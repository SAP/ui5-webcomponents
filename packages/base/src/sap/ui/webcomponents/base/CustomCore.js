export default class CustomCore {

	static get staticArea() {

		let staticDomRef = document.getElementById('sap-ui-static');

		if (!staticDomRef) {
			const staticDomHTML = '<div id="sap-ui-static" data-sap-ui-area="sap-ui-static" style="height:0; width:0; overflow:hidden;float:left;"></div>';
			document.body.insertAdjacentHTML('afterbegin', staticDomHTML);
			staticDomRef = document.body.firstChild;
		}

		return staticDomRef;
	}
}