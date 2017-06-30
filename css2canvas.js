var css2canvas = (function(){

	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

	var MODE_SIMULATE = 'simulate' ;
	var MODE_CALCULATE = 'calculate' ;
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
		mode : MODE_SIMULATE ,
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
		endColor : null ,
		beginWidth : null ,
		endWidth : null ,
		beginHeight : null ,
		endHeight : null
	}

	/* 
		calculate mode 
	*/

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

	function getTransitionWidth() {
		var step = props.timer / props.duration ;
		return (props.endWidth - props.beginWidth) * step + props.beginWidth ;
	}

	function getTransitionHeight() {
		var step = props.timer / props.duration ;
		return (props.endHeight - props.beginHeight) * step + props.beginHeight ;
	}

	function convertToRGB(color){
		var result = color.replace(/ /g, "").replace(/rgb\(/g,"").replace(')',"") ;
		return result.split(',').map(function(el){
			return parseInt(el) ;
		})
	}

	function initCalculate(config){
		props.canvas = config.canvas ;
		props.ctx = props.canvas.getContext('2d') ;

		props.mode = config.mode || MODE_CALCULATE ;
		props.DOM = config.DOM ;
		props.duration = parseInt(dom.style.animationDuration,10) * 1000 ;
		fakeBody.appendChild(props.DOM);

		props.x = parseInt(animation['from'].marginLeft) ;
		props.y = parseInt(animation['from'].marginTop) ;
		props.beginColor = convertToRGB(animation['from'].backgroundColor) ;
		props.endColor = convertToRGB(animation['to'].backgroundColor) ;
		
		props.beginWidth = parseInt(animation['from'].width) ;
		props.endWidth = parseInt(animation['to'].width) ;
		props.beginHeight = parseInt(animation['from'].height) ;
		props.endHeight = parseInt(animation['to'].height) ;

		props.rateX = ( parseInt(animation['to'].marginLeft) - parseInt(animation['from'].marginLeft) ) / ( props.duration / 1000 ) / 60  ;
		props.rateY = ( parseInt(animation['to'].marginTop) - parseInt(animation['from'].marginTop) ) / ( props.duration / 1000 ) / 60  ;

	}

	/*
		Call 60 times per second in calculate mode.
	*/
	function drawCalculate(){
		if ( props.timer <= props.duration ){
			if ( fakeBody.style.display === 'none' ) fakeBody.style.display = 'block' ;
			props.DOM.style.backgroundColor = getTransitionColor();
			props.DOM.style.width = getTransitionWidth();
			props.DOM.style.height = getTransitionHeight();
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

	/*
		end of calculate mode 
	*/

	/* 
		simulate mode 
	*/

	function initSimulate(config){
		if ( !config.DOM ) {
			throw new Error('Must provide dom in simulate mode.') ;
		}

		props.canvas = config.canvas ;
		props.ctx = props.canvas.getContext('2d') ;

		props.mode = config.mode || MODE_SIMULATE ;
		props.DOM = config.DOM ;
	}

	function drawSimulate(){
		var dom = props.DOM ;
		var style = getComputedStyle(dom) ;
		html2canvas(props.DOM, {
			onrendered: function(domCanvas) {
				props.canvas.width = props.canvas.width ;
				var x = parseInt(style.marginLeft) ;
				var y = parseInt(style.marginTop) ;
				props.ctx.drawImage(domCanvas, x ,y);
				requestID = requestAnimationFrame(draw) ;
			}
		});
	}

	/*
		end of simulate mode 
	*/

	function draw(){
		switch ( props.mode ){
			case MODE_SIMULATE:
				drawSimulate();
				break ;
			case MODE_CALCULATE:
				drawCalculate();
				break;
			default:
				throw new Error('Error mode') ;
		}
	}

	function init(config){

		if ( !config.canvas ) {
			throw new Error('Must provide canvas.') ;
		}

		switch ( props.mode ){
			case MODE_SIMULATE:
				initSimulate(config);
				break ;
			case MODE_CALCULATE:
				initCalculate(config);
				break;
			default:
				initSimulate(config);
		}

	}


	return {
		init : init ,
		draw : draw 
	}
})();