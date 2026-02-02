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

    console.log(`data guardada ${products}`);
}



const carrito = document.getElementById('carrito-panel');

carrito.addEventListener('click', () => {
    //const containerMain = document.createElement('div');
    //containerMain.classList.add('containerMainCart');

    const obtenerDatos = JSON.parse(localStorage.getItem('dataProductArray')) || [];

    obtenerDatos.forEach(products => {

        const divMain = document.createElement('div');
        divMain.classList.add('divMainCard');

        divMain.innerHTML = `
            <div class="card-cart">
                <div class="panel-introduccion">
                    <p>Carrito de productos</p> 
                </div>

                <div class="card-products">
                    <p>${products.name}</p>
                    <img src="${products.image}" alt="${products.name}">
                </div>
                
            </div>
        
        `;

        document.body.append(divMain);
    })




})