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
		x : 1 
	}

	function init(canvas,config){
		props.canvas = canvas ;
		props.ctx = props.canvas.getContext('2d') ;
	}

	function draw(){
		documentBody.appendChild(props.DOM) ;
		html2canvas(props.DOM, {
			onrendered: function(domCanvas) {
				documentBody.removeChild(props.DOM);
				props.canvas.width = props.canvas.width ;
				props.ctx.drawImage(domCanvas,props.x ++  ,0);
				requestID = requestAnimationFrame(draw) ;
			}
		});
	}

	function addDOM(dom){
		props.DOM = dom ;
	}

	function addAnimation(){

	}

	return {
		init : init ,
		draw : draw ,
		addDOM : addDOM ,
		addAnimation : addAnimation
	}
})();