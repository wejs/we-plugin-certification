# We.js user certificatins plugin

> Add suport to generate user certifications in PDF, this plugin use the pdfkit module for render the certifications

## Installation

```js
npm install --save we-plugin-certification
```

## Configuration

project config/local.js file

```js
    // ...
    certification: {
      textPositions: {
        middle: { l: 30, t: 350 },
        left: { l: 30, t: 150 },
        right: { l: 400, t: 150 },
        // use text positions to add others settings for move texts in your page like:
        top: { l: 400, t: 0 },
      }
    }
```

## URLS:

Get user certifications:

```
/user/:userId([0-9]+)/certification
```

## API

See plugin.js file

## Links

> * We.js site: http://wejs.org

## License

under [the MIT license](https://github.com/wejs/we/blob/master/LICENSE.md).