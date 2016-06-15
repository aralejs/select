# 设置最大高度

<link rel="stylesheet" href="../node_modules/alice-select/dist/select.css" />

```html
<script type="text/javascript" src="https://a.alipayobjects.com/jquery/jquery/1.7.2/jquery.js"></script>

<select id="example6">
    <option value="option1">option1</option>
    <option value="option2" selected="selected">option2</option>
    <option value="option3">option3</option>
    <option value="option4">option4</option>
    <option value="option5">option5</option>
    <option value="option6">option6</option>
    <option value="option7">option7</option>
    <option value="option8">option8</option>
    <option value="option9">option9</option>
    <option value="option10">option10</option>
    <option value="option11">option11</option>
    <option value="option12">option12</option>
    <option value="option13">option13</option>
    <option value="option14">option14</option>
</select>
```

```javascript
import Select from '../index';
new Select({
    trigger: '#example6',
    maxHeight: 100
}).render();
```
