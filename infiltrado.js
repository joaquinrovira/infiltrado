let uuid = create_UUID();
let url = 'infiltrado.herokuapp.com';
let input = document.getElementById("input");
let sala = document.getElementById("sala");
let palabra = document.getElementById("palabra");
let text = document.getElementById("text");
let http_request = new XMLHttpRequest();
http_request.overrideMimeType('text/http');


sala.onclick = () => {
    sala.setAttribute('disabled', 'disabled');
    input.setAttribute('readonly', 'readonly');
    http_request.onreadystatechange = salaReq;
    http_request.open('GET', `https://${url}/join?roomId=${input.value}&uuid=${uuid}&c=${Date.now()}`, true);
    http_request.send();
};

palabra.onclick = () => {
    palabra.setAttribute('disabled', 'disabled');
    http_request.onreadystatechange = palabraReq;
    http_request.open('GET', `https://${url}/word?roomId=${input.value}&uuid=${uuid}&c=${Date.now()}`, true);
    http_request.send();
};

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

palabra.setAttribute('disabled', 'disabled');


function palabraReq() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            text.innerHTML = http_request.responseText;
            text.setAttribute('href', 'https://www.google.com/search?q=' + http_request.responseText);
        }
        sala.removeAttribute('disabled');
        input.removeAttribute('readonly');
        palabra.setAttribute('disabled', 'disabled');
    }
}

function salaReq() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            text.innerHTML = http_request.responseText;
            text.removeAttribute('href');
        }
        sala.setAttribute('disabled', 'disabled');
        input.setAttribute('readonly', 'readonly');
        palabra.removeAttribute('disabled');
    }
}