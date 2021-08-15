sayHello = function(){
  const now = new Date();
  const hour = now.getHours();

  var greeting = '';

  if(hour>=6 && hour <= 12){
    greeting = 'Good Morning, ';
  }
  else if(hour > 12 && hour < 18){
    greeting = 'Good Afternoon, ';
  }
  else{
    greeting = 'Good Evening, ';
  }

  var temp = document.querySelector('.greeting').querySelector('b');
  temp.innerHTML = `${greeting}진실`;
};

init = function(){
  sayHello();
  setInterval(sayHello, 360000);
}

init();