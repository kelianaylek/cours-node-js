const namePElement = document.getElementById('name');
var form = document.getElementById('form');
var messages = document.getElementById('messages')
var input = document.getElementById('input');

var socket = io();

const getResponse = async () => {
    const response = await fetch('https://cours-node-js.herokuapp.com/messages', {
        method: 'GET',
        //A chaque requette put ou post on précise que c'est du json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()

    data.forEach((message) => {
        var li = document.createElement("li");
        li.appendChild(document. createTextNode(message.content));
        messages.appendChild(li);
    })
   
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    try{
        await fetch('https://cours-node-js.herokuapp.com/messages/create/2', {
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

    socket.emit('chat message', input.value);


    } catch(e) {
        console.log(e)
    }
  });


socket.on('chat message', function(msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    console.log(item)
});

getResponse()