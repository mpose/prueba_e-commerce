

document.addEventListener("DOMContentLoaded", function () { //espera a que cargue el contenido
    document.getElementById("submitb").addEventListener("click", function () {
        let inputEmail = document.getElementById("inputEmail");
        let inputPassword = document.getElementById("inputPassword");
        let camposCompletos = true; //funcion bandera (flag)

        if (inputEmail.value === '') {
                camposCompletos = false;
        }
        if (inputPassword.value === '') {
                camposCompletos = false;
        }
        if (camposCompletos) {
                localStorage.setItem('ulog', JSON.stringify(inputEmail.value));
                window.location = 'inicio.html';
        } else {
            alert("Debes ingresar usuario y contraseña")
        }
    })
});