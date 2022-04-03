const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

const signupuserbtn = document.querySelector('#signupuser');
const loginuserbtn = document.querySelector('#loginuserbtn');
const logoutuserbtn = document.querySelector('#logoutuser');


loginuserbtn.addEventListener('click', function(btn){
    btn.preventDefault();
    let loginemail = document.querySelector('#loginemail').value;
    let loginpass = document.querySelector('#loginpass').value;
    firebase.auth().signInWithEmailAndPassword(loginemail, loginpass)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        cuserid = user.uid;
        setCuserToLocalStorage(user.uid);
        // ...
        const dt = new Date();
        firebase.database().ref('users/'+ user.uid).update({
            // username: username,
            last_login: dt,
        });
        toggleLogin();
        alert('You are successfully Logged in');
    })
    .catch((error) => {
        cuserid = -1;
        setCuserToLocalStorage("");
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
});

signupuserbtn.addEventListener('click', function(btn){
    btn.preventDefault();

    let signupemail = document.querySelector('#signupemail').value;
    let signuppass1 = document.querySelector('#signuppass1').value;
    let signuppass2 = document.querySelector('#signuppass2').value;
    if(signuppass1 != signuppass2){
        alert('Passwords do not match');
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(signupemail, signuppass1)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            toggleLogin();
            setCuserToLocalStorage(user.uid);
            // ...
            firebase.database().ref('users/'+ user.uid).set({
                // username: username,
                email: signupemail,
                tt: JSON.stringify(timeTable),
                attendance: JSON.stringify(attendance),
                id_count: JSON.stringify(id_count),
                subjects: JSON.stringify(subjectsOutput)
            });
            cuserid = user.uid;
            alert('User Created!');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            setCuserToLocalStorage("");
            // ..
            alert(errorMessage);
        });
    }

});

logoutuserbtn.addEventListener('click', function(btn){
    btn.preventDefault();
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Logged Out Successfully!!");
        setCuserToLocalStorage("");
        toggleLogin();
    }).catch((error) => {
        // An error happened.
        alert("There was some error logging you out...");
      });
});
