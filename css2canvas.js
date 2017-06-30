var css2canvas = (function(){

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var documentBody = document.body ;

	var props = {
		canvas : null ,
		ctx : null ,
		requestID : null ,
		DOM : null ,
		animation : null ,  
		duration : -1 ,
		timer : 0 ,
		rate : 0 ,
		x : 1 
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
			documentBody.appendChild(props.DOM) ;
			html2canvas(props.DOM, {
				onrendered: function(domCanvas) {
					props.timer ++ ;
					documentBody.removeChild(props.DOM);
					props.canvas.width = props.canvas.width ;
					props.ctx.drawImage(domCanvas,props.x ,0);
					props.x += props.rate ;
					requestID = requestAnimationFrame(draw) ;
				}
			});
		}
	}

	function addDOM(dom){
		props.DOM = dom ;
		props.duration = parseInt(dom.style.animationDuration,10) * 1000 ;
	}

	function addAnimation(animation){
		props.rate = ( parseInt(animation['to'].marginLeft) - parseInt(animation['from'].marginLeft) ) / ( props.duration / 1000 ) / 60  ;
	}

	return {
		init : init ,
		draw : draw ,
		addDOM : addDOM ,
		addAnimation : addAnimation
	}
})();