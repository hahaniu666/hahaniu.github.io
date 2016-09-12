# css-codepoints [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david] [![DevDependency Status][david-dev-badge]][david-dev]

[![npm](https://nodei.co/npm/css-codepoints.png)](https://nodei.co/npm/css-codepoints/)

[travis-badge]: https://travis-ci.org/eush77/css-codepoints.svg
[travis]: https://travis-ci.org/eush77/css-codepoints
[david-badge]: https://david-dm.org/eush77/css-codepoints.png
[david]: https://david-dm.org/eush77/css-codepoints
[david-dev-badge]: https://david-dm.org/eush77/css-codepoints/dev-status.png
[david-dev]: https://david-dm.org/eush77/css-codepoints#info=devDependencies

Generate CSS classes per font glyph.

## Example

```js
var cssCodepoints = require('css-codepoints');

var css = cssCodepoints({
  fontFamily: 'MySuperFont',
  prefix: 'icon-',
  formats: {
    svg: 'my_super_font.svg',
    ttf: 'my_super_font.ttf'
  },
  icons: {
    foo: 0x1337,
    bar: 0x266e
  }
});

fs.writeFileSync('generated.css', css);
```

generated.css:

```css
@font-face {
    font-family: "MySuperFont";
    src: url("my_super_font.svg") format("svg"),
         url("my_super_font.ttf") format("ttf");
}

.icon-foo::before {
    content: "\1337";
    font-family: "MySuperFont";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    vertical-align: bottom;
}
.icon-bar::before {
    content: "\266e";
    font-family: "MySuperFont";
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    vertical-align: bottom;
}
```

## Options

| Option     | Required?  | Type                                                           |
| :--------- | :--------: | :------------------------------------------------------------- |
| fontFamily | Yes        | string                                                         |
| formats    | Yes, &ge;1 | Object.&lt;type: string, url: string&gt;[]                     |
| icons      | No         | Object.&lt;name: string, codepoint: {number&#x7c;string}&gt;[] |
| prefix     | No         | string                                                         |

`options.fontFamily` is merely the value of `font-face` property.

`options.formats` describes the `@font-face`'s `src` property.

`options.icons` describes code points to generate classes for. Each `codepoint` value
should normally be a number, but for the sake of compatibility with JSON configs (which have no
notion of a hexadecimal number) it is also allowed to be a string of hex digits.

`options.prefix` is the common class prefix, empty by default.

## License

MIT