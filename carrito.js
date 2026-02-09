export function shoppingCart(name, img, price){
    const nameProduct = name;
    const imageProduct = img;
    const priceProduct = price;

    console.log(`Producto: ${nameProduct} Recibido!`);   

    const dataGuardada = JSON.parse(localStorage.getItem('dataProductArray')) || [];

    const products = {
        name: nameProduct,
        image: imageProduct,
        precio: priceProduct
    }

    dataGuardada.push(products);

    localStorage.setItem('dataProductArray',JSON.stringify(dataGuardada));

    console.log(`data guardada ${products.name}`);
}



const carrito = document.getElementById('carrito-panel');

carrito.addEventListener('click', () => {
    // 1. EL FONDO OSCURO (Overlay): Se crea una sola vez
    const overlay = document.createElement('div');
    overlay.classList.add('divMainCard'); // Esta clase ocupa toda la pantalla

    // 2. EL CONTENEDOR BLANCO (El panel): Donde van los productos
    const containerMain = document.createElement('div');
    containerMain.classList.add('containerMainCart');

    // 3. BOTÓN CERRAR: Se añade al panel principal
    const botonCerrar = document.createElement('button');
    botonCerrar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    botonCerrar.classList.add('cerrar-panel-carrito');
    botonCerrar.onclick = () => overlay.remove(); // Cerramos todo el overlay

    // Título del carrito
    const intro = document.createElement('div');
    intro.classList.add('panel-introduccion');
    intro.innerHTML = '<p style="font-weight: bolder;">Tu Carrito de Mascotas</p>';

    containerMain.append(botonCerrar, intro);

    // 4. LOS PRODUCTOS: Se añaden al panel blanco
    const obtenerDatos = JSON.parse(localStorage.getItem('dataProductArray')) || [];

    obtenerDatos.forEach(product => {
        const cardProduct = document.createElement('div');
        cardProduct.classList.add('card-products');
        cardProduct.innerHTML = `
            <p style="font-weight: 600; color: #4a494d;">${product.name}</p>
            <img src="${product.image}" alt="${product.name}" style="width: 100px; border-radius: 10px;">
            <p style="font-weight:bolder; margin-left: 10px;">$ ${product.precio}</p>
        `;
        containerMain.append(cardProduct);
    });

    const comprarTodo = document.createElement('div');
    comprarTodo.classList.add('buy-products');

    if(obtenerDatos.length){
        comprarTodo.innerHTML = `
            <div style="text-align: center;">
                <button style="cursor: pointer; font-size: 14px; font-weight: bolder; border-radius: 14px; border: none; padding: 15px 40px; background-color: #deff4bcf;" id="comprarBotton">Comprar</button>
            </div>
        `;
    }else{
        comprarTodo.innerHTML = `<p style="text-align: center;">No hay productos</p>`;
    }
    // 1. Armamos el contenido interno primero
    // Metemos el botón de "Comprar" (o el mensaje de "No hay productos") 
    // dentro del panel blanco del carrito.
    containerMain.append(comprarTodo);

    // 2. Metemos el panel en su envoltorio
    // Ahora que el panel blanco está completo con sus productos y su botón,
    // lo metemos dentro del "overlay" (el fondo oscuro transparente).
    overlay.append(containerMain);

    // 3. ¡Lo hacemos visible en la web!
    // Este es el paso más importante: pegamos el overlay (que ya lleva todo adentro)
    // al cuerpo de la página (body). Hasta que no haces esto, nada aparece en pantalla.
    document.body.append(overlay);

    const btn = document.getElementById('comprarBotton');
    if(btn){
        btn.addEventListener('click', () => {
            const buscarDataUser = JSON.parse(localStorage.getItem('data-user')) || [];

            if(buscarDataUser.length === 0){
                alert('Debes iniciar sesión para comprar');
                btn.disabled = false; // Deshabilita el botón
                btn.style.opacity = "1";
                btn.style.cursor = "pointer";
                overlay.remove();
                return;
            }

            if(buscarDataUser.length > 0){
                btn.disabled = true; // Deshabilita el botón
                btn.style.opacity = "0.5";

                const confirmacion = document.createElement('div');
                confirmacion.classList.add('panel-confirmacion');
                confirmacion.innerHTML = `
                    <p style="font-weight: bold;">¿Estás seguro de tu compra?</p>
                    <div style="display: flex; gap: 10px;">
                        <button type="button" class="confirmBuy">Confirmar</button>
                        <button type="button" class="canceledBuy">Cancelar</button>
                    </div>
                `;
                
                containerMain.append(confirmacion);

                confirmacion.addEventListener('click', (e) => {
                    if(e.target.classList.contains('canceledBuy') || e.target === confirmacion){
                        btn.disabled = false; // Deshabilita el botón
                        btn.style.opacity = "1";
                        btn.style.cursor = "pointer";
                        confirmacion.remove();
                    }

                    if(e.target.classList.contains('confirmBuy')) {
                        
                        const loader = document.createElement('div');
                        loader.classList.add('loader-buy');
                        loader.innerHTML = `
                            <div class="loader-eliminated">Loading...</div>
                        `;
                        comprarTodo.append(loader);

                        setTimeout(() => {
                            const listo = document.createElement('div');
                            listo.classList.add('carga-lista');

                            listo.innerHTML = `
                                <div>Ready</div>               
                            `;
                            comprarTodo.append(listo);

                            setTimeout(() => {
                                overlay.remove(); 
                                // 1. Limpiamos los datos
                                localStorage.removeItem('dataProductArray');
                            }, 1500);
                        },3000);

                    };
                });

            };
        });
    }
});


