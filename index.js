var block = document.createElement('div') ;
document.body.appendChild(block);
var style = {
	width : 100 ,
	heigth : 100,
	background : 'red' ,
	transition : 'width 2s' 
}
var canvas = document.createElement('canvas') ;
document.body.appendChild(canvas); 

css2canvas.init(canvas);
css2canvas.draw(style) ;