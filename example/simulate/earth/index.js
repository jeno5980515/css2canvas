var siteWidth = window.innerWidth;
for (i = 0; i <= 100; i++) {
  var star = document.createElement('div') ;
  star.classList.add('star') ;
  star.classList.add('star_'+i) ;
  star.style.top = Math.floor(Math.random()*500) ;
  star.style.left = Math.floor(Math.random()*siteWidth) ; 
  document.querySelector('.stars').appendChild(star) ;
}


var canvas = document.getElementById('canvas') ;
canvas.width = window.innerWidth ;
canvas.height = 700 ;

css2canvas.init({
  canvas : canvas ,
  DOM : document.querySelector('.container') ,
  mode : 'simulate'
});

css2canvas.draw();

document.getElementById('startButton').addEventListener('click',function(){
  if ( this.innerHTML === 'Start' ){
    css2canvas.startRecord();
    this.innerHTML = 'Stop' ;
  } else {
    css2canvas.stopRecord();
    this.innerHTML = 'Start' ;
  }
})

document.getElementById('clearButton').addEventListener('click',function(){
  css2canvas.clearRecord();
})

document.getElementById('makeButton').addEventListener('click',function(){
  css2canvas.makeResult();
})