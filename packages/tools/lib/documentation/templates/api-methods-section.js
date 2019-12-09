module.exports = {
  template: `
    {{#if methods}}
      <h3 class="comment-api-title space-top">Methods</h3>
      <p class="small-space-top" >This Web Component exposes public methods. You can invoke them directly on the Web Component instance.</p>

      <div class="small-space-top api-table">
        <div class="head api-table-header-roll">
          <div class="cell api-table-header-cell">Name</div>
          <div class="cell api-table-header-cell">Description</div>
        </div>

        {{#each methods}}
          <div class="row {{checkEven @index}}">
            <div class="cell api-table-content-cell api-table-content-cell-bold">{{this.name}}</div>
            <div class="cell api-table-content-cell api-table-content-cell-description">{{{this.description}}}</div>
          </div>

          {{#each this.parameters}}
            <div class="cell api-table-content-cell api-table-content-cell-bold api-table-param-name">{{this.name}}</div>
            <div class="cell api-table-event-param-cell api-table-content-cell api-table-content-cell-description"><strong class="bold" >type:</strong> {{this.type}} <br/> <strong class="api-table-event-description bold">description:</strong> {{{this.description}}}</div>
          {{/each}}
        {{/each}}
      </div>
    {{/if}}`
};