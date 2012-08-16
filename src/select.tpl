<div class="{{prefix}}">
    <ul class="{{prefix}}-content" data-role="content">
        {{#each select}}
        <li data-role="item" class="{{../prefix}}-item" data-value="{{value}}" data-defaultSelected="{{defaultSelected}}" data-selected="{{selected}}">{{text}}</li>
        {{/each}}
    </ul>
</div>
