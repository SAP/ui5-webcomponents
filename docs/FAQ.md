# Frequently Asked Questions

**Q: How can I play with UI5 Web Components easily?**

**A:** Use this [CodeSandBox](https://codesandbox.io/s/71r1x5o51q?fontsize=14&module=%2Findex.html) 


**Q: Where is the documentation?**

**A:** There are several resources:
- [Web Components APIs](https://sap.github.io/ui5-webcomponents/playground/)
- [How to get started?](https://blogs.sap.com/2019/04/01/the-fastest-way-to-get-started-with-ui5-web-components/)
- [List of all public module imports](https://github.com/SAP/ui5-webcomponents/blob/master/docs/PublicModuleImports.md)
- [How to use](https://github.com/SAP/ui5-webcomponents/blob/master/docs/HowToUse.md)
- [How to configure](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Configuration.md)


**Q: Is there a CDN to load UI5 Web Components from?**

**A:** No. The best practice is to build your own bundle. See [this article](https://blogs.sap.com/2019/04/01/the-fastest-way-to-get-started-with-ui5-web-components/) for details.


**Q: Are UI5 Web Components APIs stable?**

**A:** Mostly yes since the project is in Release Candidate state, but minor changes may still be expected until the official release.


**Q: Can I create my own UI5 Web Components?**

**A:** Not yet, the framework-level APIs for creating web components are not public yet.


**Q: How big is the runtime?**

**A:** Currently on master, a simple working Web Component (```ui5-label```) and its dependencies equals to around 12K gzipped. 
Two simple web components (```ui5-label``` and ```ui5-icon```) and their dependencies equal to around 19K gzipped.

*Note:* The quoted numbers include only a ```<ui5-label>``` (respectively ```ui5-label``` and ```ui5-icon```) working on Chrome/FF/Safari with the default settings (theme/language).
Additional features, settings and old browser support will increase bundle size accordingly.


**Q: What is the difference between UI5 Web Components and OpenUI5?**
**A:** See the project's [readme.md](https://github.com/SAP/ui5-webcomponents) for more on this.


**Q: ?** Can I use UI5 Web Components in a OpenUI5 application?
**A:** This is not necessary as OpenUI5 already provides equivalents in the form of UI5 Controls. 


**Q: ?** How can I hide not-yet-upgraded Web Components to avoid flicker?
**A:** You can place, for example, the following CSS in your application:

```CSS
*:not(:defined) {
	display: none;
}
``` 

This will make all web components that haven't been defined yet, hidden. Please note that it only works on modern browsers.
