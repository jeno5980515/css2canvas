var css2canvas = (function(){

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var SHOW_TRANSFORM_PROPERTY = 'translate(3000px,0px)' ;
	var HIDE_TRANSFORM_PROPERTY = 'translate(99999px,99999px)' ;
	var COUNTER_SPEED = 1000 / 60 ;
	var documentBody = document.body ;
	var fakeBody = document.createElement('div') ;
	fakeBody.classList.add('fake-body');
	fakeBody.style.position = 'absolute' ;
	fakeBody.style.transform  = SHOW_TRANSFORM_PROPERTY ;
	fakeBody.style.display = 'none' ;  
	documentBody.appendChild(fakeBody) ;

	var props = {
		canvas : null ,
		ctx : null ,
		requestID : null ,
		DOM : null ,
		animation : null ,  
		duration : -1 ,
		timer : 0 ,
		rateX : 0 ,
		rateY : 0 ,
		x : 0 ,
		y : 0 ,
		beginColor : null ,
		endColor : null 
	}

	function calcTransitionColor(a,b,u) {
		return (1-u) * a + u * b;
	};
	
	function getTransitionColor() {
		var step = props.timer / props.duration ;
		var r = parseInt(calcTransitionColor(props.beginColor[0], props.endColor[0], step));
		var g = parseInt(calcTransitionColor(props.beginColor[1], props.endColor[1], step));
		var b = parseInt(calcTransitionColor(props.beginColor[2], props.endColor[2], step));
		return 'rgb('+r+','+g+','+b+')' ;
	};

	function init(canvas,config){
		props.canvas = canvas ;
		props.ctx = props.canvas.getContext('2d') ;
	}

	/*
		Call 60 times per second.
	*/
	function draw(){
		if ( props.timer <= props.duration ){
			if ( fakeBody.style.display === 'none' ) fakeBody.style.display = 'block' ;
			//console.log(getTransitionColor())
			props.DOM.style.backgroundColor = getTransitionColor();
			html2canvas(props.DOM, {
				onrendered: function(domCanvas) {
					props.timer += COUNTER_SPEED ;
					props.canvas.width = props.canvas.width ;
					props.ctx.drawImage(domCanvas,props.x ,props.y);
					props.x += props.rateX ;
					props.y += props.rateY ;
					requestID = requestAnimationFrame(draw) ;
				}
			});
		} else {
			fakeBody.style.display = 'none' ;
		}
	}

	function addDOM(dom){
		props.DOM = dom ;
		props.duration = parseInt(dom.style.animationDuration,10) * 1000 ;
		fakeBody.appendChild(props.DOM);
	}

	function convertToRGB(color){
		var result = color.replace(/ /g, "").replace(/rgb\(/g,"").replace(')',"") ;
		return result.split(',').map(function(el){
			return parseInt(el) ;
		})
	}

	function addAnimation(animation){
		props.x = parseInt(animation['from'].marginLeft) ;
		props.y = parseInt(animation['from'].marginTop) ;
		props.beginColor = convertToRGB(animation['from'].backgroundColor) ;
		props.endColor = convertToRGB(animation['to'].backgroundColor) ;
		props.rateX = ( parseInt(animation['to'].marginLeft) - parseInt(animation['from'].marginLeft) ) / ( props.duration / 1000 ) / 60  ;
		props.rateY = ( parseInt(animation['to'].marginTop) - parseInt(animation['from'].marginTop) ) / ( props.duration / 1000 ) / 60  ;
	}

	return {
		init : init ,
		draw : draw ,
		addDOM : addDOM ,
		addAnimation : addAnimation
	}
})();