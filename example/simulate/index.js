
var canvas = document.createElement('canvas') ;
canvas.width = 500 ;
canvas.height = 300 ;
document.body.appendChild(canvas); 


var block = document.createElement('div') ;
block.classList.add('block');
document.body.appendChild(block);

css2canvas.init({
	canvas : canvas ,
	DOM : document.querySelector('.container') ,
	mode : 'simulate'
});

css2canvas.draw();

