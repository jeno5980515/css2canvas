var block = document.createElement('div') ;
block.classList.add('block');
document.body.appendChild(block);
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
	  marginLeft : '0px'  
	} ,
  to : { 
	  marginLeft : '300px' 
	}
}

var canvas = document.createElement('canvas') ;
canvas.width = 500 ;
document.body.appendChild(canvas); 

var dom = document.createElement('div') ;
for ( var key in style ){
	dom.style[key] = style[key] ;
}
css2canvas.init(canvas);
css2canvas.addDOM(dom) ;
css2canvas.addAnimation(animation) ;
css2canvas.draw();