
const form = document.querySelector('#form')

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try{
        const response = await fetch('http://127.0.0.1:3000/login', {
            method: 'POST',
            //A chaque requette put ou post on précise que c'est du json
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
    
        const data = await response.json()
    console.log(data)
        if(data){
          
            localStorage.setItem('user', JSON.stringify(data))
            var newToken = localStorage.getItem('user')
            console.log(JSON.parse(newToken))

            window.location.href = "/chat";

         
        } else {
            alert('no data')
        }
    } catch(e) {
        console.log(e)
    }

})