module.exports = {
  template: `
  {{#if slots}}
    <h3 class="comment-api-title space-top" >Slots</h3>
	<p class="small-space-top" >
	  This Element provides slot(s). This means it can display its child nodes.<br>
	  Unless targeting the default slot, use the <code>slot</code> attribute to define the destination slot for each child.<br>
	  Text, along with HTML Elements with no <code>slot</code> attribute, goes the the <code>default</code> slot.
	</p>

    <div class="small-space-top api-table">
      <div class="head api-table-header-roll">
        <div class="cell api-table-header-cell">Slot</div>
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
  {{/if}}`
};
