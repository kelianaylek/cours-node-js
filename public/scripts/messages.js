const namePElement = document.getElementById('name');
var form = document.getElementById('form');
var messages = document.getElementById('messages')
var input = document.getElementById('input');

var socket = io();

const getResponse = async () => {
    const response = await fetch('http://localhost:3000/messages', {
        method: 'GET',
        //A chaque requette put ou post on précise que c'est du json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()

    data.forEach(async (message) => {

        const response = await fetch('http://127.0.0.1:3000/users/user/' + message.user_id , {
            method: 'GET',
            //A chaque requette put ou post on précise que c'est du json
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        var li = document.createElement("li");
        var div = document.createElement('div')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        div.className = "flex"

        p1.appendChild(document.createTextNode(message.content))
        div.appendChild(p1)
        

        p2.appendChild(document.createTextNode(data.username))
        div.appendChild(p2)

        p3.appendChild(document.createTextNode(message.sendAt))
        div.appendChild(p3)


        li.appendChild(div);

        messages.appendChild(div);
    })
   
}

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)
    try{
        await fetch('http://localhost:3000/messages/create/' + user.id, {
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
    const user = JSON.parse(localStorage.getItem('user'))

    console.log(user)



    var li = document.createElement("li");
    var div = document.createElement('div')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    div.className = "flex"

    p1.appendChild(document.createTextNode(msg))
    div.appendChild(p1)
    

    p2.appendChild(document.createTextNode(user.username))
    div.appendChild(p2)

    p3.appendChild(document.createTextNode(new Date()))
    div.appendChild(p3)


    li.appendChild(div);

    messages.appendChild(div);
});

getResponse()