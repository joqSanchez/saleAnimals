// Importaciones
import { shoppingCart } from "./carrito.js";
import { productosVenta } from "./jsonProductosVenta.js";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("div_productos_sale")) {
    showProductsSale();
  }
});

// Funcion que muestra los productos que hay en venta

let contadorVeces = 0; //memoria que guarde el corte del slice()
function showProductsSale() {
  const containerProducts = document.getElementById("div_productos_sale");

  if (!containerProducts) {
    console.log("No se encontro ningun contenedor de productos en venta");
    return;
  }

  // 1. LIMPIAR SIEMPRE AL INICIO
  containerProducts.innerHTML = "";

  //.slice pide prestado los primeros 3 empieza desde 0
  // cuando recorta la entrega la nueva lista y la guarda en la variable que luego la recorre el forEach
  const productsTimes = productosVenta.slice(contadorVeces, contadorVeces + 3); // (0,0 + 3 (3 es el valor de fin) ) luego (3,6 + 3 (3+3 es) ), el 3 es el valor de final del slice

  productsTimes.forEach((productsSale) => {
    const storeProducts = document.createElement("div");
    storeProducts.classList.add("storeProducts");

    storeProducts.innerHTML = `
            <div class="card_store_products">
                <h2>${productsSale.nombre}</h2>
                <img src="${productsSale.url}" alt="${productsSale.nombre}">
                <div class="card_information_products"> 
                    <p>Categoria: ${productsSale.categoria}</p>
                    <p>${productsSale.descripcion}</p>
                    <p style="font-weight: 600; font-size: 17px;">$${productsSale.precio.toFixed(2)}
                        <strong style="margin-left: 10rem;">
                            <button type="button" class="buttonCompra" 
                              data-nombre="${productsSale.nombre}" 
                              data-imagen="${productsSale.url}"
                              data-precio="${productsSale.precio}">
                              +
                            </button>
                        </strong>
                    </p>
                </div>
            </div>
        `;
    containerProducts.append(storeProducts);
  });
}

//cuando se hace click el la variable contadorVeces pasa a hacer 3, y el .slice se hace (3, 3 + 3 (osea 6) )
const buttonTwo = document.getElementById("eventButtonTwo");

// Al tocar el boton se aumenta el contadorVeces y el .slice muestra el nuevo valor, y eso es lo que corta de el array de productos
buttonTwo.addEventListener("click", () => {
  // Solo sumamos si todavía hay productos por delante
  // si el contadorVeces es menor que lo que hay en productosVenta.length entonces
  if (contadorVeces + 3 < productosVenta.length) {
    contadorVeces = contadorVeces + 3; // le da un valor de 3
    showProductsSale();
  } else {
    alert("¡Ya no hay más productos para mostrar!");
    // Opcional: buttonTwo.style.display = 'none'; (Para ocultarlo)
  }
});

// second button ( returns to the previous products )
const buttonOne = document.getElementById("eventButtonOne");
buttonOne.addEventListener("click", () => {
  if (contadorVeces > 0) {
    contadorVeces = contadorVeces - 3;
    showProductsSale();
  } else {
    alert("Ya no hay mas atras");
  }
});

// EL EVENTO VA AFUERA DE LA FUNCIÓN (Para que no se multiplique)
//Esto  abre un panel para confirmar si se enviara el producto al carrito
document.getElementById("div_productos_sale").addEventListener("click", (e) => {

  // Recibe datos del productos donde se hizo click
  if (e.target.classList.contains("buttonCompra")) {
    const name = e.target.dataset.nombre;
    const img = e.target.dataset.imagen;
    const price = e.target.dataset.precio;

    const panelButtom = document.createElement("div");
    panelButtom.classList.add("panel_button");// este es el que se muestra al tocar el buttom +

    panelButtom.innerHTML = `
      <div class="second_div_panel_buttom">
        <p>¿Enviar ${name} al carrito?</p>
        <button class="confirmar">Si enviar al carrito</button>
        <button class="cancelar">No enviar</button>
      </div>
    `;

    document.body.append(panelButtom);

    // I added an event listener to the panelButton div to handle the 'Confirm' and 'Cancel' buttons."
    panelButtom.addEventListener("click", (eventoPanel) => {
      if (eventoPanel.target.classList.contains("cancelar") || eventoPanel.target === panelButtom) {
        panelButtom.remove();
      }

      if (eventoPanel.target.classList.contains("confirmar")) {
        // 1. Respuesta inmediata: El usuario ve que algo pasó
        panelButtom.innerHTML = `
          <div class="second_div_panel_buttom">
            <div class="loader"></div>
            <p>Enviando <strong>${name}</strong> al carrito...</p>
          </div>
        `;

        setTimeout(() => {
          shoppingCart(name,img, price);
          console.log("enviado correctamente!");

          // Esto crea el boton "x" de cerrar
          const x = document.createElement("button");
          x.textContent = "x";
          x.classList.add("button_close_panel");

          //Se asigna el evento del boton "x" para cerrar el panel
          x.addEventListener("click", () => {
            panelButtom.remove();
          });

          // Se agrega un panel que muestra el exito del envio
          panelButtom.innerHTML = `
                        <div class="second_div_panel_buttom">
                          <p>Enviado correctamente</p>
                        </div>
                    `;

          // Se mete el boton en el panel
          panelButtom.querySelector(".second_div_panel_buttom").append(x);
        }, 2000);
      }
    });
  }
});
