let signup = () => {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = document.getElementById("user");
    // let userName1 = document.getElementById("text");
    // console.log(userName1.value);
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)

        .then((result) => {
            console.log("result", result);
            location.href = "login.html";
            user.innerHTML = "Successfully signup";
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            user.innerHTML = errorMessage;
            console.log("error", errorMessage);
        });
};

let login = () => {
    let login_email = document.getElementById("login-email");
    let login_password = document.getElementById("login-password");
    let user1 = document.getElementById("user");
    firebase
        .auth()
        .signInWithEmailAndPassword(login_email.value, login_password.value)
        .then((result) => {
            console.log(result);
            user1.style.color = "black";
            user1.innerHTML = "Successfully Login &#128522";
            location.href = "index1.html";
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            user1.style.color = "red";
            user1.style.marginBottom = "10px";
            user1.innerHTML = errorMessage + "&#9888;";
            console.log(errorMessage);
        });
};

// login from facebook and authentication

let facebook_login = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
            var user = result.user;
            window.location = "index1.html";
            console.log("user==>", user.displayName);
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

// sign out from facebook
const signout = () => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.location = "login.html";
        })
        .catch(() => {});
};
