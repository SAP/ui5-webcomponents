module.exports = {
    template: `
      {{#if cssVariables}}
        <h3 class="comment-api-title" >CSS variables</h3>
        <p class="small-space-top">You can use the following CSS varialbes to change the component styling.</p>
  
        <div class="small-space-top api-table">
          <div class="head api-table-header-roll">
            <div class="cell api-table-header-cell">Name</div>
            <div class="cell api-table-header-cell">Description</div>
          </div>
  
          {{#each cssVariables}}
            <div class="row {{checkEven @index}}">
              <div class="cell api-table-content-cell api-table-content-cell-bold">{{this.name}}</div>
              <div class="cell api-table-content-cell api-table-content-cell-description">
                  {{{this.description}}}
              </div>
            </div>
          {{/each}}
  
        </div>
      {{/if}}`
};