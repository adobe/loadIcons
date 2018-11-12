# loadIcons
> Load SVG icon sprites safely and asynchronously

## Installation

```shell
npm install --save-dev loadicons
```

## Usage

Assuming you have a sprite sheet called `sprite.svg` that looks something like this:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="more" viewBox="0 0 36 36">
    <circle cx="18" cy="18" r="4.1"></circle>
    <circle cx="30" cy="18" r="4.1"></circle>
    <circle cx="6" cy="18" r="4.1"></circle>
  </symbol>
</svg>
```

You can load the sprite sheet with:

```js
const loadIcons = require('loadicons');
loadIcons('sprite.svg', function(err, svg) {
  if (err) {
    console.error('Everything failed because ' + error);
  }
  else {
    console.log('SVG loaded!', svg);
  }
});
```

Then, you can use loaded icons with `<use>`:

```html
<svg>
  <use xlink:href="#more" />
</svg>
```
