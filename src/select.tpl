<div class="{{classPrefix}}">
    <ul class="{{classPrefix}}-content" data-role="content">
        {{#each options}}
        <li data-role="item" class="{{../classPrefix}}-item {{#if disabled}}{{../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled="{{disabled}}">{{{text}}}
            {{#if options}}
                <ul style="display:none">
                    {{#each options}}
                    <li data-role="item" class="{{../../../classPrefix}}-item {{#if disabled}}{{../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled="{{disabled}}">{{{text}}}
                        {{#if options}}
                            <ul style="display:none">
                                {{#each options}}
                                <li data-role="item" class="{{../../../../../classPrefix}}-item {{#if disabled}}{{../../../../../../classPrefix}}-item-disabled{{/if}}" data-value="{{value}}" data-default-selected="{{defaultSelected}}" data-selected="{{selected}}" data-disabled={{disabled}}>{{{text}}}</li>
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
