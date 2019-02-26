
const registerBtn = document.getElementById('registerButton');
const loginBtn = document.getElementById('loginButton')
// if(registerBtn){
//     registerBtn.addEventListener('click',registerUser);
// }

function registerUser(){
    let output;
    let username = document.getElementById('registerUsername').value;
    let password = document.getElementById('registerUserPassword').value;
    let email = document.getElementById('registerUserEmail').value;

    fetch('https://tyche-nyke-mark-i.herokuapp.com/api/v2/users/register',{
        mode:'cors',
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            username: username, password:password, email: email 
        })
    })
    .then(async (res) => {
        if (res.ok){
            const data = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data.message}</p>`;
            return document.getElementById('registrationResponse').innerHTML = output;
    }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById('registrationResponse').innerHTML = output;
        }
    });
}
function loginUser(){
    let output;
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    fetch('https://tyche-nyke-mark-i.herokuapp.com/api/v2/users/login',{
        mode:'cors',
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            email:email, password:password})
    })
    .then(async (res) => {
        if (res.ok){
            const data = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data.message}</p>`;
            return document.getElementById('loginResponse').innerHTML = output;
    }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById('loginResponse').innerHTML = output;
        }
    });
}

if(registerBtn){
    registerBtn.addEventListener('click',registerUser);
}
if (loginBtn){
    loginBtn.addEventListener('click',loginUser);
}