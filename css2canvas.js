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
		rate : 0 ,
		x : 0 
	}

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
			html2canvas(props.DOM, {
				onrendered: function(domCanvas) {
					props.timer += COUNTER_SPEED ;
					props.canvas.width = props.canvas.width ;
					props.ctx.drawImage(domCanvas,props.x ,0);
					props.x += props.rate ;
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

	function addAnimation(animation){
		props.x = parseInt(animation['from'].marginLeft) ;
		props.rate = ( parseInt(animation['to'].marginLeft) - parseInt(animation['from'].marginLeft) ) / ( props.duration / 1000 ) / 60  ;
	}

	return {
		init : init ,
		draw : draw ,
		addDOM : addDOM ,
		addAnimation : addAnimation
	}
})();