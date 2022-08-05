
function previewFile() {
    let preview = document.getElementById('foto');
    let file = document.getElementById("inputFile").files[0];
  
    let reader = new FileReader();//instancia de objeto.
    //C O N S T R U C T O R 
  
    reader.onload = function () {
      preview.src = reader.result;
  
    }
  
    if (file) {
      reader.readAsDataURL(file);
  
    } else {
      preview.src = "img/avatar.png";
    }
  }

  function guardar() {
    let preview = document.getElementById('foto');
  
    localStorage.setItem('laImagen', JSON.stringify(preview.src));
    alert("Imagen guardada")
  }


function mostrarDatos(){
    let nombre = JSON.parse(localStorage.getItem("nombre"));
    let apellido = JSON.parse(localStorage.getItem("apellido"));
    let edad = JSON.parse(localStorage.getItem("edad"));
    let email = JSON.parse(localStorage.getItem("ulog"));
    let telefono = JSON.parse(localStorage.getItem("telefono"));

    let idNombre = document.getElementById("inputNombre");
    let idApellido = document.getElementById("inputApellido");
    let idEdad = document.getElementById("inputEdad");
    let idEmail = document.getElementById("inputEmail");
    let idTelefono = document.getElementById("inputTelefono");

    idNombre.value = nombre;
    idApellido.value = apellido;
    idEdad.value = edad;
    idEmail.value = email;
    idTelefono.value = telefono;

}

function guardarDatos() {
    let inputNombre = document.getElementById("inputNombre");
    let inputApellido = document.getElementById("inputApellido");
    let inputEdad = document.getElementById("inputEdad");
    let inputEmail = document.getElementById("inputEmail");
    let inputTelefono = document.getElementById("inputTelefono");
    let camposCompletos = true; //funcion bandera (flag)

    if (inputNombre.value === '') {
        camposCompletos = false;
    }
    if (inputApellido.value === '') {
        camposCompletos = false;
    }
    if (inputEdad.value === '') {
        camposCompletos = false;
    }
    if (inputEmail.value === '') {
        camposCompletos = false;
    }
    if (inputTelefono.value === '') {
        camposCompletos = false;
    }
    if (camposCompletos) {
        localStorage.setItem('nombre', JSON.stringify(inputNombre.value));
        localStorage.setItem("apellido",JSON.stringify(inputApellido.value));
        localStorage.setItem("edad",JSON.stringify(inputEdad.value));
        localStorage.setItem("ulog",JSON.stringify(inputEmail.value));
        localStorage.setItem("telefono",JSON.stringify(inputTelefono.value));
        window.location =  'my-profile.html'
    }else {
    alert("Debes completar todos los datos")
}
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let preview = document.getElementById('foto');
  let laImagen = JSON.parse(localStorage.getItem('laImagen'));
  
    if (laImagen != null) {
        preview.src = laImagen;
    
      } else {
        preview.src = "img/avatar.png";
      }
    mostrarDatos();
});
