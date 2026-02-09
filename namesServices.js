
import { featuredServices } from './jsonFeaturedServices.js';

document.addEventListener('DOMContentLoaded', () => {
    nameServices();
});


function nameServices() {
    const botones = document.querySelectorAll('.learnMore');

    botones.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const valorBtn = e.target;
            const containerFather = valorBtn.closest('.divs-featured-services');
            const nameHtml = containerFather.querySelectorAll('.nameServices');

            let nameService = '';
            nameHtml.forEach(name => {
                // Verificamos que el dataset exista para evitar errores
                if (name.dataset.nombre) {
                    nameService = name.dataset.nombre;
                }
            });

            // BUSQUEDA EN EL ARRAY
            const arrayData = featuredServices.find(items => items.tittle === nameService);

            // CONTROL DE ERRORES: Si no encuentra el servicio, no sigas
            if (!arrayData) {
                console.error("No se encontró el servicio en el array para:", nameService);
                return;
            }

            // LIMPIEZA: Evita que se acumulen muchos divs si tocas el botón varias veces
            const existingDiv = containerFather.querySelector('.card-featured-services');
            if (existingDiv) {
                existingDiv.remove();
            }

            // CREACIÓN DEL ELEMENTO
            const card = document.createElement('div');
            card.classList.add('card-featured-services');
            card.innerHTML = `
                <h3>${arrayData.tittle}</h3>
                <p>${arrayData.description}</p>
            `;
            
            containerFather.appendChild(card);
        });
    });
}
