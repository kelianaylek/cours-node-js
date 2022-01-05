var socket = io();
var form = document.getElementById('form');
var messages = document.getElementById('messages')
var input = document.getElementById('input');



form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    var li = document.createElement("li");
    socket.emit('chat message', input.value);
    li.appendChild(document. createTextNode(input.value));
    messages.appendChild(li);
    input.value = '';
  }
});