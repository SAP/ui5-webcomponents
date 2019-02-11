module.exports = {
  template: `
  {{#if slots}}
    <h3 class="comment-api-title space-top" >Children</h3>
	<p class="small-space-top" >
	  This Web Component accepts other HTML Elements as children. 
	  Use the <code>data-ui5-slot</code> attribute to define the category of each child, if more than one category is accepted.
	  You can provide multiple children for the categories marked with <code>[0..n]</code> or just one otherwise.
	</p>

    <div class="small-space-top api-table">
      <div class="head api-table-header-roll">
        <div class="cell api-table-header-cell">Category</div>
        <div class="cell api-table-header-cell">Type</div>
        <div class="cell api-table-header-cell">Description</div>
      </div>

      {{#each slots}}
        <div class="row {{checkEven @index}}">
          <div class="cell api-table-content-cell api-table-content-cell-bold">{{this.name}}</div>
          <div class="cell api-table-content-cell">{{this.type}}</div>
          <div class="cell api-table-content-cell api-table-content-cell-description">{{{this.description}}}</div>
        </div>
      {{/each}}

    </div>
  {{/if}}
  {{#if usesTextContent}}
    <h3 class="comment-api-title space-top" >Children</h3>
    <p class="small-space-top" >The content of this Web Component is interpreted as text and shown to the user. All HTML Elements inside the Web Component are ignored - only their text is used.</p>
  {{/if}}`
};