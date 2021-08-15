getTime = function(){
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var date = now.getDate();
  var hour = now.getHours();
  var min = now.getMinutes();
  var sec = now.getSeconds();
  
  var clock = document.querySelector(".clock").querySelector(".time");
  
  clock.innerHTML = `${hour<10 ? `0${hour}`:hour}:${min<10 ? `0${min}`:min}:${sec<10 ? `0${sec}`:sec}`;
}


function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();