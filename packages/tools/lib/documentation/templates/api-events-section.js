module.exports = {
  template: `
    {{#if events}}
      <h3 class="comment-api-title space-top">Events</h3>
      <p class="small-space-top" >This Web Component fires semantic events upon user interaction. You can bind to these events with the standard DOM APIs, such as <code>addEventListener</code>. </p>

      <div class="small-space-top api-table">
        <div class="head api-table-header-roll">
          <div class="cell api-table-header-cell">Name</div>
          <div class="cell api-table-header-cell">Description</div>
        </div>

        {{#each events}}
          <div class="row {{checkEven @index}}">
            <div class="cell api-table-content-cell api-table-content-cell-bold">{{this.name}}</div>
            <div class="cell api-table-content-cell api-table-content-cell-description">
            {{{this.description}}}
            {{#if this.since}}
                <div class="api-table-content-cell-bold api-table-content-cell-since">since v{{{this.since}}}</div>
            {{/if}}
            </div>
          </div>

          {{#each this.parameters}}
            <tr class="api-table-event-param">
              <div class="api-table-content-event-params-wrapper">
                <div class="cell api-table-param-name api-table-content-cell api-table-content-cell-bold">{{this.name}}</div>
                <div class="cell api-table-event-param-cell api-table-content-cell api-table-content-cell-description"><strong class="bold" >type:</strong> {{this.type}} <br/> <strong class="api-table-event-description bold">description:</strong> {{{this.description}}}</div>
              </div>
            </tr>
          {{/each}}
        {{/each}}
      </div>
    {{/if}}`
};