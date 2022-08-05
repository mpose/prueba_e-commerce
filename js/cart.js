let subTotal;
let comissionPercentage = 0.15;
let PESO_SYMBOL = "UYU ";
var listaProductosCarrito = [];
let cargaTarjetaOk = "Tienes una tarjeta de Credito agregada";
let cargaTransBancariaOk = "Tienes una transferencia bancaria agregada";
let cargaDatosPago = "No hay forma de pago asociada";

function calculoSubtotal(unitCost) {
    let cantidad = parseInt(document.getElementById("cantidadComprar").value);

    subTotalX = PESO_SYMBOL + Math.round(unitCost * cantidad);

    subTotal = unitCost * cantidad

    document.getElementById("productCostText").innerHTML = subTotalX;

    updateTotalCosts();
}

function mostrarCarrito(listado) {

    let htmlContentToAppend = "";
    for (let i = 0; i < listado.length; i++) {
        let product = listado[i];
        subTotal = Math.round(product.unitCost * product.count);
        document.getElementById("productCostText").innerHTML = product.currency + " " + subTotal;

        htmlContentToAppend += `
        <div>
            <div class="row">
                <div class="col-3">
                    <img src="` + product.src + `" alt="" class="img-thumbnail">
                </div>
                <div class="col" class="col-md-8 order-md-1">
                    <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h4 class="mb-1">Producto: `+ product.name + `</h4>
                        <p>Precio por unidad: ` + product.currency + product.unitCost + `</p>
                        <div class="col-md-3 mb-3">
                            <label>¿Cantidad?</label>
                                <input type="number" class="form-control" onchange="calculoSubtotal(`+ product.unitCost + `)" id="cantidadComprar" value="` + product.count + `" min="0">
                                    <div class="invalid-feedback">
                                        La cantidad es requerida.
                                    </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `

        document.getElementById("mostrarCarrito").innerHTML = htmlContentToAppend;
    }
}

function updateTotalCosts() {
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = Math.round(comissionPercentage * subTotal);
    let totalCostToShow = (Math.round(subTotal * comissionPercentage) + subTotal);

    comissionCostHTML.innerHTML = PESO_SYMBOL + comissionToShow;
    totalCostHTML.innerHTML = PESO_SYMBOL + totalCostToShow;
}



function miValidacion() {
    let inputDireccionEnvio = document.getElementById("direccionEnvio");
    let inputCiudadEnvio = document.getElementById("ciudadEnvio");
    let inputPaisEnvio = document.getElementById("paisEnvio");
    let inputCodigoPostal = document.getElementById("codigoPostal");
    let formaDePagoOk = document.getElementById("checkFormaPago").innerHTML;
    let camposCompletosEnvio = true;
    let camposCompletosPago = true;

    //Validacion general
    if (formaDePagoOk === cargaDatosPago) {
        camposCompletosPago = false;
        alert("Datos de pago incompletos");
    }
    if (inputDireccionEnvio.value === '') {
        camposCompletosEnvio = false;
    }
    if (inputPaisEnvio.value === '') {
        camposCompletosEnvio = false;
    }
    if (inputCiudadEnvio.value === '') {
        camposCompletosEnvio = false;
    }
    if (inputCodigoPostal.value === '') {
        camposCompletosEnvio = false;
    }
    if (camposCompletosEnvio === false) {
        alert("Falta completar datos de envio");
    }
    if (camposCompletosEnvio && camposCompletosPago) {
        alert("Compra exitosa");
    }
}

//validacion forma de pago
function checkkformaPago() {
    let camposCompletos = true;

    let infoDatosPago = document.getElementById("checkFormaPago");

    let tarjetaCredito = document.getElementById("tarjetaCredito");
    let transBancaria = document.getElementById("transBancaria");

    let titularTarjeta = document.getElementById("titularTarjeta");
    let numeroTarjeta = document.getElementById("numeroTarjeta");
    let vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
    let cvvTarjeta = document.getElementById("cvvTarjeta");

    let titularTransferencia = document.getElementById("titularCuenta");
    let bancoTransferencia = document.getElementById("banco");
    let cuentaTransferencia = document.getElementById("cuenta");

    if (tarjetaCredito.checked) {
        if (titularTarjeta.value === '') {
            camposCompletos = false;
        }
        if (numeroTarjeta.value === '') {
            camposCompletos = false;
        }
        if (vencimientoTarjeta.value === '') {
            camposCompletos = false;
        }
        if (cvvTarjeta.value === '') {
            camposCompletos = false;
        }
        if (camposCompletos) {
            infoDatosPago.innerHTML = cargaTarjetaOk;
        } else {
            infoDatosPago.innerHTML = cargaDatosPago;
        }
    }

    if (transBancaria.checked) {
        if (titularTransferencia.value === '') {
            camposCompletos = false;
        }
        if (bancoTransferencia.value === '') {
            camposCompletos = false;
        }
        if (cuentaTransferencia.value === '') {
            camposCompletos = false;
        }
        if (camposCompletos) {
            infoDatosPago.innerHTML = cargaTransBancariaOk;
        } else {
            infoDatosPago.innerHTML = cargaDatosPago;
        }
    }
}

function eventoSubmit(event) {
    if (!miValidacion()) {
        event.preventDefault();
        event.stopPropagation();
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaProductosCarrito = resultObj.data.articles;
            //Muestro las categorías ordenadas
            mostrarCarrito(listaProductosCarrito);
            updateTotalCosts(); //Agrego la funcion para que por defecto traiga el costo con envio Premium
        }
    });
    
    document.getElementById("formaPagoChecked").addEventListener("click", function () {
        checkkformaPago();
    });

    document.getElementById("goldradio").addEventListener("change", function () {
        comissionPercentage = 0.15;
        updateTotalCosts();
    });

    document.getElementById("premiumradio").addEventListener("change", function () {
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standardradio").addEventListener("change", function () {
        comissionPercentage = 0.05;
        updateTotalCosts();
    });

    document.getElementById("tarjetaCredito").addEventListener("change", function () {
        let titularTarjeta = document.getElementById("titularTarjeta");
        let numeroTarjeta = document.getElementById("numeroTarjeta");
        let vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
        let cvvTarjeta = document.getElementById("cvvTarjeta");

        let titularTransferencia = document.getElementById("titularCuenta");
        let bancoTransferencia = document.getElementById("banco");
        let cuentaTransferencia = document.getElementById("cuenta");

        titularTarjeta.style = "display: inline-block";
        numeroTarjeta.style = "display: inline-block";
        vencimientoTarjeta.style = "display: inline-block";
        cvvTarjeta.style = "display: inline-block";

        titularTransferencia.style = "display: none";
        bancoTransferencia.style = "display: none";
        cuentaTransferencia.style = "display: none";

        titularTransferencia.value = "";
        bancoTransferencia.value = "";
        cuentaTransferencia.value = "";

    });

    document.getElementById("transBancaria").addEventListener("change", function () {
        let titularTarjeta = document.getElementById("titularTarjeta");
        let numeroTarjeta = document.getElementById("numeroTarjeta");
        let vencimientoTarjeta = document.getElementById("vencimientoTarjeta");
        let cvvTarjeta = document.getElementById("cvvTarjeta");

        let titularTransferencia = document.getElementById("titularCuenta");
        let bancoTransferencia = document.getElementById("banco");
        let cuentaTransferencia = document.getElementById("cuenta");

        titularTarjeta.value = "";
        numeroTarjeta.value = "";
        vencimientoTarjeta.value = "";
        cvvTarjeta.value = "";

        titularTarjeta.style = "display: none";
        numeroTarjeta.style = "display: none";
        vencimientoTarjeta.style = "display: none";
        cvvTarjeta.style = "display: none";

        titularTransferencia.style = "display: inline-block";
        bancoTransferencia.style = "display: inline-block";
        cuentaTransferencia.style = "display: inline-block";
    })

});


//$('#modalTC').modal('hide')