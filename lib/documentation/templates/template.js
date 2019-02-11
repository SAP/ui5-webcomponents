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
          </section>
        </section>
      </div>
    {{/each}}`
};