<div class="{{classPrefix}}">
    <ul class="{{classPrefix}}-content" data-role="content">
        {{#each select}}
        <li data-role="item" class="{{../classPrefix}}-item {{#if disabled}}{{../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" {{#if disabled}}data-disabled{{/if}}>{{text}}
            {{#if items}}
                <ul style="display:none">
                    {{#each items}}
                    <li data-role="item" class="{{../../../classPrefix}}-item {{#if disabled}}{{../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" {{#if disabled}}data-disabled{{/if}}>{{text}}
                        {{#if items}}
                            <ul style="display:none">
                                {{#each items}}
                                <li data-role="item" class="{{../../../../../classPrefix}}-item {{#if disabled}}{{../../../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" {{#if disabled}}data-disabled{{/if}}>{{text}}</li>
                                {{/each}}
                            </ul>
                        {{/if}}
                    </li>
                    {{/each}}
                </ul>
            {{/if}}
        </li>
        {{/each}}
    </ul>
</div>
