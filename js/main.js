
const registerBtn = document.getElementById('registerButton');
const loginBtn = document.getElementById('loginButton')
const addBookBtn = document.getElementById('addBookButton')
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

function decodeJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

function loginResponses(){
    let response = sessionStorage.getItem( "loginResponses" );
    let output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-family: 'Boogaloo', cursive;" >${response}</p>`;
    return document.getElementById("redirectedLogIn").innerHTML = output;
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
            return res.json().then((myJson) => {
                sessionStorage.setItem("token", myJson.token);
                sessionStorage.setItem("loginResponses", myJson.message);

                let token = sessionStorage.getItem("token").replace("'", "");
                token = token.substr(0, token.length-1);
                let decodedToken = decodeJwt(token);
                decodedTokenId = Object.values(decodedToken)[2];
                if (decodedTokenId  === 1){
                    redirect: window.location.assign("./admin.html");
                }else{
                    redirect: window.location.assign("./index.html");
                }
            });    
        }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;
                        font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById('loginResponse').innerHTML = output;
        }
    });
}


function addBook(){
    let output;
    let title = document.getElementById('addTitle').value;
    let author = document.getElementById('addAuthor').value;
    let category = document.getElementById('addCategory').value;
    let token = sessionStorage.getItem("token").replace("'","");
    token = token.substr(0, token.length-1);
    fetch('https://tyche-nyke-mark-i.herokuapp.com/api/v2/books',{
        mode:'cors',
        method:'POST',
        headers:{
            Accept:'application/json',
            "Access-Control-Allow-Origin": null,
            'Content-Type':'application/json;charset=UTF-8',
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            title:title, author:author, category:category})
    })
    .then(async (res) => {
        if (res.ok){
            const data = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data.message}</p>`;
            return document.getElementById('addBookResponse').innerHTML = output;
    }
        if (res.status == 400){
            const data_1 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_1.message}</p>`;
            return document.getElementById('addBookResponse').innerHTML = output;
        }
        if (res.status == 401){
            const data_2 = await res.json();
            output = `<p style="background: #004e00;color: white;text-align: center;padding: 20px;font-size: 1.3em;font-family: 'Boogaloo', cursive;">${data_2.message}</p>`;
            return document.getElementById('addBookResponse').innerHTML = output;
        }
    });
}

if(registerBtn){
    registerBtn.addEventListener('click',registerUser);
}
if (loginBtn){
    loginBtn.addEventListener('click',loginUser);
}
if(addBookBtn){
    addBookBtn.addEventListener('click',addBook);
}