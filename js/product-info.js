var product = {};

function showImagesGallery(array) {


    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        let activeClass = i == 0 ? "active" : "";        

        htmlContentToAppend += `
            <div class="carousel-item ${activeClass}" id="imagen${i}">
                <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>
            
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}


var listaComentarios = [];

function mostrarListaComentarios(listado) {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let comentario = listado[i];

        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1"> Puntuacion: `+ estrellas(comentario.score) + `</h4>
                        <p> Comentario: ` + comentario.description + `</p>
                        <p> Usuario: ` + comentario.user + `</p>
                        <p> Fecha: ` + comentario.dateTime + `</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `

        document.getElementById("mostrarComentarios").innerHTML = htmlContentToAppend; //+ agregarComentario (puntuacionUlog, comentarioUlog);
    }
}
/* JSON.parse(localStorage.getItem("puntuacionUsuario")) */
function agregarComentario (){
    let ulog = localStorage.getItem('ulog');
    let puntuacionUsuario = JSON.parse(localStorage.getItem("puntuacionUsuario"));
    let comentarioUsuario = JSON.parse(localStorage.getItem("comentarioUsuario"));
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let htmlContentToAppendComentario = "";

    htmlContentToAppendComentario += `
    <div class="list-group-item list-group-item-action>
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                <div class="mb-1">
                    <h4 class="mb-1"> Puntuacion: `+ estrellas(puntuacionUsuario) + `</h4>
                    <p> Comentario: "` + comentarioUsuario + `"</p>
                    <p> Usuario: "` + ulog + `"</p>
                    <p> Fecha: ` + fecha + " " + hora + `</p>
                </div>
            </div>
        </div>
    </div>
    </div>
    `
    document.getElementById("agregarComentarios").innerHTML = htmlContentToAppendComentario;
};

function estrellas(score) {
    let total = 5;
    let result = "";
    for (let i = 0; i < total; i++) {
        if (score > 0) {
            result += '<span class="fa fa-star checked"></span>';
            score--;
        } else {
            result += '<span class="fa fa-star"></span>';
        }
    }
    return result;
}

function verProducto(name) {
    localStorage.setItem("producto", JSON.stringify({ productName: name }));
    window.location = 'product-info.html'
}

function urlJson() {
    let name = JSON.parse(localStorage.getItem("producto")).productName;
    let url;

    switch (name) {
        case "Suzuki Celerio":
            url = PRODUCT_INFO_CELERIO;
            break;

        case "Chevrolet Onix Joy":
            url = PRODUCT_INFO_CHEVROLET;
            break;

        case "Fiat Way":
            url = PRODUCT_INFO_FIAT;
            break;

        case "Peugeot 208":
            url = PRODUCT_INFO_PEUGEOT;
            break;

        case "Nissan Kicks":
            url = PRODUCT_INFO_NISSAN;
            break;
        default: "";


    }
    return url;
}

var listadoProductos = [];

function mostrarRelatedProducts(arrayListado, arrayRelacionados) {
    let htmlContentToAppend = '';
    arrayRelacionados.forEach(function (indice) {
        htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + arrayListado[indice].imgSrc + `" alt="` + arrayListado[indice].description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + arrayListado[indice].name + `</h4>
                        </div>
                        <p class="mb-1">` + arrayListado[indice].description + `</p>
                        <p class="mb-1">` + arrayListado[indice].currency + arrayListado[indice].cost + `</p>
                        <button class="btn btn-info" onclick=" verProducto('` + arrayListado[indice].name + `')">Más Información</button>
                    </div>
                </div>
            </div>
            `
    });

    document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(urlJson()).then(function (resultObj) {

        let categoryNameHTML = document.getElementById("categoryName");
        let categoryDescriptionHTML = document.getElementById("categoryDescription");
        let productCountHTML = document.getElementById("productCount");
        let productCategoryHTML = document.getElementById("productCategory");

        if (resultObj.status === "ok") {
            product = resultObj.data.forEach(product => {
                if (product.name == JSON.parse(localStorage.getItem('producto')).productName) {
                    categoryNameHTML.innerHTML = product.name;
                    categoryDescriptionHTML.innerHTML = product.description;
                    productCountHTML.innerHTML = product.soldCount;
                    productCategoryHTML.innerHTML = product.category;


                    //Muestro las imagenes en forma de galería
                    showImagesGallery(product.images);
                }
                getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
                    if (resultObj.status === "ok") {
                        listaComentarios = resultObj.data;
                        //Muestro las categorías ordenadas
                        mostrarListaComentarios(listaComentarios);
                        agregarComentario ();
                    }
                    getJSONData(PRODUCTS_URL).then(function (resultObj) {
                        if (resultObj.status === "ok") {
                            listadoProductos = resultObj.data;
        
                            mostrarRelatedProducts(listadoProductos, product.relatedProducts);
                        }
                    });
                });
            })
        }
        let ulog = localStorage.getItem('ulog');
        let infousuario = document.getElementById("info-usuarioComent")

        if (ulog) {
            ulog = JSON.parse(ulog);
            document.getElementById("usuarioComent").innerHTML = ulog;
            infousuario.style = "display: inline-block";
        }
        document.getElementById("submitComent").addEventListener("click", function () {
            let puntuacionUlog = document.getElementById("puntuacionUlog");
            let comentarioUlog = document.getElementById("comentarioUlog");
            let camposCompletos = true; //funcion bandera (flag)
    
            if (puntuacionUlog.value === "0") {
                camposCompletos = false;
            }
            if (comentarioUlog.value === '') {
                camposCompletos = false;
            }
            if (camposCompletos) { //DESAFIO
                localStorage.setItem('puntuacionUsuario', JSON.stringify(puntuacionUlog.value));
                localStorage.setItem('comentarioUsuario', JSON.stringify(comentarioUlog.value));
                window.location = 'product-info.html'
            } else {
                alert("Para comentar debes completar los campos solicitados")
            }
        })
    })
});

