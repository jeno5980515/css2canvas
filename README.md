# css2canvas
[![npm version](https://img.shields.io/npm/v/css2canvas.svg?style=flat-square)](https://www.npmjs.com/package/css2canvas)
The script let you render css animation directly on canvas.

Still under development.
## Usage
import [`html2canvas.js`](https://github.com/niklasvh/html2canvas) and `css2canvas.js`.  

If you want to make gif, you need to import [`gif.js`](https://github.com/jnordberg/gif.js) too.
```javascript
css2canvas.init({
  canvas : canvas ,
  DOM : document.querySelector('.container') ,
  mode : 'simulate'
});

css2canvas.draw();
```

## Configuration 
```javascript
{
  // the canvas you want to render
  canvas : canvas ,
  // the dom you want to simulate or calculate
  DOM : document.querySelector('.container') ,
  // mode in simulate or calculate
  mode : 'simulate' ,
  // animation object , only needed in calculate mode
  animation : animation 
}
```
## Method
```javascript
// initialize css2canvas
css2canvas.init(config);
// begin render on canvas
css2canvas.draw();
// start record canvas frame
css2canvas.startRecord();
// stop record canvas frame
css2canvas.stopRecord();
// clear canvas frame
css2canvas.clearRecord();
// make gif result
css2canvas.makeResult();
```

## TODO
* Improve simulate mode.
* Fulfill calculate mode.
* Generate JavaScript code that can render canvas directly.