//const background = document.querySelector('.background');

function rand(min, max){
  return Math.floor(Math.random()*(max-min))+min;
}

function getRandomImage(){
  var random = rand(1, 31);

  //style = document.createElement('style');
  //style.backgroundImage = `"url('img${random}.jpeg')"`;
  //document.body.appendChild(style);

  //const url = `"url('imgs/img${random}.jpeg')"`;
  //console.log(url);
  var url = "url('imgs/img"+String(random)+".jpeg')";
  var gradient = "radial-gradient(rgba(58, 57, 57, 0.1), rgba(0, 0, 0, 0.3))";

  const width = screen.availWidth;
  const height = screen.availHeight;
  gradient = gradient + ", " + url;  

  console.log(width, height);
  document.body.style.backgroundImage = gradient;
  document.body.style.backgroundSize = 'cover';

}
getRandomImage();