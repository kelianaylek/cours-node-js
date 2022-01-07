const namePElement = document.getElementById('name');

const getResponse = async () => {
    const response = await fetch('http://127.0.0.1:3000/username', {
        method: 'GET',
        //A chaque requette put ou post on précise que c'est du json
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    const data = await response.json()
    console.log(data)

    const name = data.msg
    namePElement.innerHTML = name;
}

getResponse()