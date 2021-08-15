var todo_list = document.querySelector('.todo_list');
var todo_greeting = document.querySelector('#todo_greeting');
var todo_form = document.querySelector('#todo_form');
var todo_show = document.querySelector('#todo_show');
var todo_add = document.querySelector('#todo_add');
var todo_checkboxes = document.querySelectorAll('input[type=checkbox]');
var toDos = [];

var showToDos = function(toDo, idx){
  const div = document.createElement('div');
  const checkbox = document.createElement('input');
  const design_label = document.createElement('label');
  const design_span = document.createElement('span');
  const content = document.createElement('span');
  const remove = document.createElement('span');

  div.id = idx;
  checkbox.type = 'checkbox';
  checkbox.id =`checkbox${idx}`;
  design_label.htmlFor =`checkbox${idx}`;

  content.innerText = toDo;
  content.className = 'content';
  remove.innerHTML = '&nbsp';
  remove.className = 'remove';


  design_label.appendChild(design_span);

  div.appendChild(checkbox);
  div.appendChild(design_label);
  div.appendChild(content);
  div.appendChild(remove);
  todo_show.appendChild(div);

 
  checkbox.addEventListener('change', (e)=>{
    var div = document.getElementById(idx);
     var content = div.querySelector('.content');
    if(e.target.checked){
      var content_cp = content.cloneNode(true);
      var del = document.createElement('del');
      del.className = 'del';
      del.appendChild(content_cp);
      div.replaceChild(del, content);
    }
    else{
      var del = div.querySelector('.del');
      var content = del.firstChild;
      div.replaceChild(content, del);
    }
  });

  remove.addEventListener('mouseout', ()=>{
    var div = document.getElementById(idx);
    var removeIcon = div.querySelector('.remove');
    removeIcon.innerHTML = '&nbsp';
  })
  remove.addEventListener('mouseover', ()=>{
    var div = document.getElementById(idx);
    var removeIcon = div.querySelector('.remove');
    removeIcon.innerHTML = ' X';
    removeIcon.addEventListener('click', ()=>{
      div.remove();
    })
  });

  //todo_checkboxes = document.querySelectorAll('input[type=checkbox]');
};

var loadToDos = function(){
  toDos.forEach((toDo, idx)=>{
    showToDos(toDo, idx);
  });
};

var addToDos = function(){
  var input = document.createElement('input');
  input.type = "text";
  input.id = "todo_input";

  todo_form.appendChild(input);
}

if(toDos.length==0){
  todo_greeting.innerHTML = 'What is your main focus for today?'
  addToDos();
}
else{
  
  loadToDos();
}

todo_form.addEventListener('submit', (e)=>{
  e.preventDefault();
  text = todo_input.value;
  toDos.push(text);
  showToDos(text, toDos.length);
  todo_add.innerHTML = 'add to do list';
  todo_greeting.innerHTML = '';
  todo_form.innerHTML = '';
});

todo_add.addEventListener('click', ()=>{
  addToDos();
});
