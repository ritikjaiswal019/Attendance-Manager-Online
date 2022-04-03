
if (!window.localStorage.getItem("Cuserid"))
window.localStorage.setItem("Cuserid",JSON.stringify(""));

function getCuserfromLocalStorage(){
    return localStorage.getItem("Cuserid")? JSON.parse(localStorage.getItem("Cuserid")) : "";
}
function setCuserToLocalStorage(id){
    localStorage.setItem("Cuserid", JSON.stringify(id));
}
let cuserid = getCuserfromLocalStorage();

// Things to toggle
const mainbody = document.querySelector('#main-body');
const authbody = document.querySelector('#auth-body');
const nouser = document.querySelector('#nouser');
const myTab = document.querySelector('#myTab');



function toggleLogin(){
    mainbody.classList.toggle('d-none');
    authbody.classList.toggle('d-none');
    myTab.classList.toggle('d-none');
    nouser.classList.toggle('d-none');
}

window.addEventListener('DOMContentLoaded', function(){
    if(cuserid !== ""){
        toggleLogin();
    }
});