const ORDER_ASC_BY_COST = "Menor Precio";
const ORDER_DESC_BY_COST = "Mayor Precio";
const ORDER_BY_PROD_COUNT = "Mas Vendido";
var currentListadoProductos = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;

function sortProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aSCount = parseInt(a.soldCount);
            let bSCount = parseInt(b.soldCount);

            if ( aSCount > bSCount ){ return -1; }
            if ( aSCount < bSCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function verProducto(name){
    localStorage.setItem("producto",JSON.stringify({productName: name}));
    window.location =  'product-info.html'
}

function mostrarListadoProductos(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentListadoProductos.length; i++){
        let product = currentListadoProductos[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
            
                if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {

                    htmlContentToAppend += `
                    <div class="col-md-4 col-sm-6 col-lg-3">
                        <div class="card mb-4 shadow-sm custom-card">
                        <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `">
                        <h3 class="m-3">`+ product.name +`</h3>
                        <div class="card-body">
                            <p class="card-text">` + product.description + `</p>
                            <p class="mb-1">` + product.currency + product.cost + `</p>
                            <p class="card-text"><small class="text-muted">` + product.soldCount + ` Ventas</small></p>
                            <button style="float: right;" class="btn btn-info btn-sm" onclick=" verProducto('` + product.name + `')">Más Información</button>
                        </div>
                        </div>
                    </div>
                    `
                }
            }

        document.getElementById("lista-de-productos").innerHTML = htmlContentToAppend;
    }
}
function ordenarYMostrarProductos(sortCriteria, listadoProductos){
    currentSortCriteria = sortCriteria;

    if(listadoProductos != undefined){
        currentListadoProductos = listadoProductos;
    }

    currentListadoProductos = sortProductos(currentSortCriteria, currentListadoProductos);

    //Muestro las categorías ordenadas
    mostrarListadoProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            ordenarYMostrarProductos(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        ordenarYMostrarProductos(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        document.getElementById("buscador").value = "";

        minCount = undefined;
        maxCount = undefined;
        buscar = undefined;

        mostrarListadoProductos();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        mostrarListadoProductos();
    });
    document.getElementById("buscador").addEventListener('input', function () {

        buscar = document.getElementById("buscador").value.toLowerCase();

        mostrarListadoProductos();

    });
});