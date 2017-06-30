# css2canvas
The script let you render css animation directly on canvas.

Still under development.
## Usage
import [`html2canvas.js`](https://github.com/niklasvh/html2canvas) and `css2canvas.js`
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
  // animation object , only needed in simulate mode
  animation : animation 
}
```

## TODO
* Improve simulate mode.
* Fulfill calculate mode.
* Generate JavaScript code that can render canvas directly.