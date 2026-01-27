


const container = document.getElementById('div_productos_sale');

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('divMajor_products_sale')){

        const name = e.target.dataset.nombre;
        const image = e.target.dataset.url;
        const price = e.target.dataset.precio;

        shoppingCart(name, image, price)
    }
})

export function shoppingCart(name, image, price){
    const div = document.createElement('div');



}