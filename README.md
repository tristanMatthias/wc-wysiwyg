# ALPHA: WC-WYSIWYG

WYSIWYG Text editor built with a Custom Element

> This package is still in alpha.

---

## Installation
Using [npm](https://www.npmjs.com/):

```
$ npm install wc-wysiwyg
```

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using ES6 modules
import 'wc-wysiwyg';
```

This will automatically register the custom element `<wc-wysiwyg>` ready for you to use.


## Usage
In your HTML, add the element `<wc-wysiwyg>`, and you’re good to go

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <wc-wysiwyg>
    <script type="text/javascript" src="wc-wysiwyg.min.js"></script>
</body>
</html>
```


### Shortcuts
| Command | Keys |
| ------- | ---- |
| Bold | `Cmd` + `b`
| Italic | `Cmd` + `i`
| Underline | `Cmd` + `u`
| Align Left | `Cmd` + `Shift` + `l`
| Align Center | `Cmd` + `Shift` + `c`
| Align Right | `Cmd` + `Shift` + `r`
| Indent | `Tab`
| Outdent | `Shift` + `Tab`


### Simple mode
This mode only shows Bold, Italic and Underline controls.
```html
<wc-wysiwyg simple>
```

## Issues
If you find a bug, please file an issue on [the issue tracker on GitHub](https://github.com/tristanMatthias/wc-wysiwyg/issues).



## Credits
Web Components Text WYSIWYG is built and maintained by [Tristan Matthias](https://www.github.com/tristanMatthias).
