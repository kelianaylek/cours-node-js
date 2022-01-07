const namePElement = document.getElementById('name');
var form = document.getElementById('form');
var messages = document.getElementById('messages')
var input = document.getElementById('input');

var socket = io();

const getResponse = async () => {
    const response = await fetch('http://127.0.0.1:3000/messages', {
        method: 'GET',
        //A chaque requette put ou post on précise que c'est du json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()

    console.log(data)

    data.forEach((message) => {
        var li = document.createElement("li");
        li.appendChild(document. createTextNode(message.content));
        messages.appendChild(li);
    })
   
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    try{
        const response = await fetch('http://127.0.0.1:3000/messages/create/2', {
            method: 'POST',
            //A chaque requette put ou post on précise que c'est du json
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: input.value,
            })
            
        })

    const data = await response.json()
    console.log(data.content)
    socket.emit('chat message', data.content);

    socket.on('chat message', function(msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      });

    } catch(e) {

    }
  });

getResponse()