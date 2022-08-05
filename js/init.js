const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://mpose.github.io/prueba_e-commerce/json/json_products.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const PRODUCT_INFO_CELERIO = "https://mpose.github.io/prueba_e-commerce/json/json_product_info_celerio.json";
const PRODUCT_INFO_CHEVROLET = "https://mpose.github.io/prueba_e-commerce/json/json_product_info_chevrolet.json";
const PRODUCT_INFO_FIAT = "https://mpose.github.io/prueba_e-commerce/json/json_product_info_fiat.json";
const PRODUCT_INFO_PEUGEOT = "https://mpose.github.io/prueba_e-commerce/json/json_product_info_peugeot.json";
const PRODUCT_INFO_NISSAN = "https://mpose.github.io/prueba_e-commerce/json/json_product_info_kicks.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  let ulog = localStorage.getItem('ulog');
  let infousuario = document.getElementById("info-usuario")
  

if (ulog) {
  ulog = JSON.parse(ulog);
  document.getElementById("usuario").innerHTML = ulog;
  infousuario.style = "display: inline-block";
  }

  if (document.getElementById("salir")) {
    document.getElementById("salir").addEventListener("click", function () {
      localStorage.removeItem('ulog');
      localStorage.removeItem('puntuacionUsurio');
      localStorage.removeItem('comentarioUsuario');
      localStorage.removeItem('producto');
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('edad');
      localStorage.removeItem('email');
      localStorage.removeItem('telefono');
      window.location = 'index.html';
    })
}
});