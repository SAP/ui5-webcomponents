module.exports = {
  template: `
    <div class="page-container">
      <div class="api-container">
        <section class="component-description">
          {{{description}}}
          <section class="component-api space-top">
            {{> properties this}}
            {{> slots this}}
            {{> events this}}
            {{> methods this}}
            {{> cssVariables this}} 
          </section>
        </section>
      </div>
    </div>
    {{#each additionalDocs}}
      <div class="api-container appended-doc">
        <h1>{{this.basename}}</h1>
        <section class="component-description">
          {{{this.description}}}
          <section class="component-api space-top">
            {{> properties this}}
            {{> slots this}}
            {{> events this}}
            {{> methods this}}
            {{> cssVariables this}} 
          </section>
        </section>
      </div>
    {{/each}}
    <footer class="footer-wrapper">
      <div class="footer-links">
        <a class="separator" href="https://www.sap.com/about/legal/privacy.html" target="_blank">Privacy Policy</a>
        <a href="https://www.sap.com/about/legal/impressum.html" target="_blank">Legal</a>
      </div>
      <img src="../../../assets/images/sap-logo-svg.svg" alt="Sap Logo" />
    </footer>`
};
