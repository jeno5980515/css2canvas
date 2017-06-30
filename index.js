
var style = {
	width : '100px' ,
	height : '100px' ,
	backgroundColor : 'red' ,
  animationDuration : '2s' ,
	animationTimingFunction : 'linear' ,
  animationFillMode: 'forwards'
}

var animation = {
  from : { 
	  marginLeft : '0px'  ,
		marginTop : '0px' ,
		width : '100px' ,
		height : '100px' ,
		backgroundColor : 'rgb(255,0,0)' 
	} ,
  to : { 
	  marginLeft : '300px' ,
		marginTop : '150px' ,
		width : '150px' ,
		height : '150px' ,
		backgroundColor : 'rgb(0,0,255)'
	}
}

var canvas = document.createElement('canvas') ;
canvas.width = 500 ;
canvas.height = 300 ;
document.body.appendChild(canvas); 

var dom = document.createElement('div') ;
for ( var key in style ){
	dom.style[key] = style[key] ;
}


var block = document.createElement('div') ;
block.classList.add('block');
document.body.appendChild(block);

css2canvas.init(canvas);
css2canvas.addDOM(dom) ;
css2canvas.addAnimation(animation) ;
css2canvas.draw();

