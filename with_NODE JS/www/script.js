function sendData() {
    var XHR = new XMLHttpRequest();


    // Bind the FormData object and the form element
    var FD = new FormData(form);

    let dataToSend = {};
    FD.forEach(function (value, key) {
        dataToSend[key] = value;
    });
    dataToSend = JSON.stringify(dataToSend);

    // Define what happens on successful data submission
    XHR.addEventListener("load", function (event) {
        console.log('reponse', event.target.responseText);
        const reponse = JSON.parse(event.target.responseText);
        console.log('reponse JSON', reponse);
        if (reponse.err === true) {
            const eleError = document.getElementById("form-login-error")
            eleError.classList.remove('hidden');
        } else {

        }

        if (reponse.trouvé === true) {
            window.location.href='change.html';
        } else {
            const eleError = document.getElementById("form-login-error")
            eleError.classList.remove('hidden');
        }

        // au hasard je dirais qu'il faut aller dans reponse.form
        /* if (reponse.form === ****) {

        }*/
    });

    // Define what happens in case of error
    XHR.addEventListener("error", function (event) {
        alert('Oops! Something went wrong.');
    });

    // Set up our request
    XHR.open("POST", "/auth");
    XHR.setRequestHeader("Content-Type", "application/json");
    // The data sent is what the user provided in the form
    console.log(dataToSend);
    XHR.send(dataToSend);
}

// Access the form element...
var form = document.getElementById("form-login");

// ...and take over its submit event.
form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendData();
});