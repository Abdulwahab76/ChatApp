const nameform = document.getElementById("nameform");
const nameinput = document.getElementById("name-input");
const namebtn = document.getElementById("name-btn");
const messagescreen = document.getElementById("messages");
const messageform = document.getElementById("message-Form");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");
const db = firebase.database();
const msgRef = db.ref("/msgs");
// const id = uuid();
let userName = document.getElementById("text");
let name;
var key = msgRef.push().key;

function add() {
    const msgInput = document.getElementById("msg-input");
    messageform.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = msgInput.value;
        if (!name) {
            return alert("you have to set up some name");
        } else if (!text.trim()) return; //alert("You have to type in some message")

        // firebase database

        // var database = firebase.database().ref("/msgs");
        // var key = database.push().key;

        var todo1 = {
            text,
            key: key,
            name,
        };
        msgRef.child(key).set(todo1);

        msgInput.value = "";
    });
}

const updateMsges = (data) => {
    let li_delete = data.val().key;
    const { key: userID, name, text } = data.val();
    const msg = `<li  id="${li_delete}"  class="msg ${key != userID && "my"}">
    <span>
        <i class="name">${name}:</i> ${text} 
    </span>
    <i id="del" onclick="get(this)" class="fa fa-trash-o"></i>

</li>`;

    messagescreen.innerHTML += msg;
    console.log(li_delete);
};

msgRef.on("child_added", updateMsges);

nameform.addEventListener("submit", (e) => {
    e.preventDefault();
    if (nameinput.value.trim().length < 4)
        return alert("name shold be more characters");

    nameform.style.display = "none";
    msgInput.removeAttribute("disabled");
    msgBtn.removeAttribute("disabled");
    return (name = nameinput.value);
});

function get(e) {
    firebase.database().ref("/msgs").child(e.parentNode.id).remove();
    e.parentNode.remove();
}
