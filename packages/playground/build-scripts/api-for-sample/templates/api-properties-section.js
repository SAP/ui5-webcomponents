module.exports = {
  template: `
    {{#if properties}}
      <h3 class="comment-api-title" >Properties/Attributes</h3>
      <p class="small-space-top" >You can use both properties and attributes with the same effect. The name of each attribute is listed below the name of the property, if different.</p>

      <div class="small-space-top api-table">
        <div class="head api-table-header-roll">
          <div class="cell api-table-header-cell">Name</div>
          <div class="cell api-table-header-cell">Type</div>
          <div class="cell api-table-header-cell">Default Value</div>
          <div class="cell api-table-header-cell">Description</div>
        </div>

        {{#each properties}}
          <div class="row {{checkEven @index}}">
            <div class="cell api-table-content-cell api-table-content-cell-bold">
              {{this.name}}
              {{#if this.readonly}}
                (readonly)
              {{/if}}
                <br>
              {{#if (toKebabCase this.name)}}
                  {{#unless this.noattribute}}
                     <code>{{toKebabCase this.name}}</code>
                 {{/unless}}
              {{/if}}
            </div>
            <div class="cell api-table-content-cell">{{this.type}}</div>
            <div class="cell api-table-content-cell">{{this.defaultValue}}</div>
            <div class="cell api-table-content-cell api-table-content-cell-description">
                {{{this.description}}}
                {{#if this.since}}
                    <div class="api-table-content-cell-bold api-table-content-cell-since">since v{{{this.since}}}</div>
                {{/if}}
            </div>
          </div>
        {{/each}}

      </div>
    {{/if}}`
};