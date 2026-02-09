import { animalesRescatados } from "./jsonAnimalesAdopcion.js";
import { newPuppies } from "./jsonNewPuppies.js";

document.addEventListener("DOMContentLoaded", () => {
    // Si el elemento de "Inicio" existe en esta página, ejecuta la función
    if (document.getElementById('animalesEnAdopcion')) {
        mostrarDataInicio();
    }
    
    // Si el elemento de "Adopción" existe en esta página, ejecuta la función
    if (document.getElementById('idAdopcion')) {
        mostradorData();
    }

    if( document.querySelector('.containerNewPuppies')){
        showNewPuppies();
    }

    if(document.getElementById('div_principal')){
        verDetalles();
    }

    // Se ejecuta automáticamente al abrir conocerMascota.html
    if (window.location.pathname.includes('conocerMascota.html')) {
        conocerMascota();
    }

});

// muestra 3 mascotas en adopcion en el inicio
function mostrarDataInicio() {
    const animalesAdopcion = document.getElementById('animalesEnAdopcion');
    animalesAdopcion.innerHTML = '';

    // 1. Tomamos solo los primeros 3 elementos del array
    const primerosTres = animalesRescatados.slice(0, 3);

    // 2. Usamos forEach sobre ese nuevo array pequeño
    primerosTres.forEach(animal => {
        const divMascotas = document.createElement('div');
        divMascotas.classList.add('div_mascotas_adopcion');

        divMascotas.innerHTML = `
            <div class="card_animal">
                <div class="contenedor_img">
                    <img src="${animal.URL}" alt="${animal.nombre}">
                </div>
                <div class="info_animal">
                    <h3>${animal.nombre} - ${animal.especie}</h3>
                    <h4>${animal.genero}</h4>
                    <p class="caracteristicas">${animal.caracteristicas}</p>
                    <a href="/conocerMascota.html?nombre=${animal.nombre}&genero=${animal.genero}" class="conocerAnimal">Conocer a ${animal.nombre}</a>
                </div>
            </div> 
        `;

        animalesAdopcion.append(divMascotas);
    });

}




// funcion para conocer los datos de la mascota en adopcion
function conocerMascota() { // Le quitamos los parámetros
    const divPrincipal = document.querySelector('.div_principal');
    if(!divPrincipal) return; // Otro guardaespaldas

    const urlParams = new URLSearchParams(window.location.search);
    const nombreSeleccionado = urlParams.get('nombre');

    const animal = animalesRescatados.find(a => a.nombre === nombreSeleccionado);

    if (animal) {
        // Lógica de icono y color MUDADA aquí adentro
        let claseIcono = animal.genero === 'Hembra' ? 'fa fa-venus' : 'fa fa-mars';
        let colorGenero = animal.genero === 'Hembra' ? '#ff69b4' : '#00aaff';
        let tamanioIcono = '30px';

        let separar = animal.caracteristicas.split('-');
        

        const listaCharacteristics = separar.map(char => {
            return `<span class="tag-caracteristica">${char}</span>`;
        }).join('');

        const container = document.createElement('div');
        container.classList.add('historiaMascota');

        container.innerHTML = `
            <div class="card_Animal">
                <img src="${animal.URL}">
                <div class="card_Informacion">

                    <h3 style="color: #ff5e01fd; background-color: #faeed8cc; padding: 4px 14px; width: 103px; border-radius: 15px; font-size: 17px; margin-left: 20px;">ADOPTABLE</h3>
                    <h1 style="font-size: 40px; margin-left: 20px;">${animal.nombre}</h1>

                    <div class="containers-information">

                        <div class="div_genero">
                            <h4>
                                <i class="${claseIcono}" style="color: ${colorGenero}; margin-left: 30px; font-size: ${tamanioIcono};"></i>
                            </h4>
                            <p style="color: rgba(70, 68, 65, 0.53); margin-left: 12px;">GENDER</p>
                            <p style="font-size: 20px; margin-left: 6px;"> ${animal.genero} </p>
                        </div>

                        <div class="div_breed">
                            <h4>
                                <i class="fa fa-tags" style="font-size: 35px;color: #332e31; margin-left: 30px;"></i>
                            </h4>
                            <p style="color: rgba(70, 68, 65, 0.53); margin-left: 15px;">BREED</p>
                            <p style="font-size: 18px; margin-left: 6px;">${animal.raza}</p>
                        </div>   
                        
                        <div class="div_breed">
                            <h4>
                                <i class="fa fa-dna" style="font-size: 35px;color: #332e31; margin-left: 30px;"></i>
                            </h4>
                            <p style="color: rgba(70, 68, 65, 0.53); margin-left: 15px;">SPECIES</p>
                            <p style="font-size: 20px; margin-left: 18px;">${animal.especie}</p>
                        </div> 

                    </div>

                    <div class="history-information">
                        <p style="font-size: 21px;">
                            <i class="fa fa-refresh"></i>
                            History
                        </p>
                        <p class="parrafo-history">${animal.historia}</p>
                    </div>

                    <div class="Characteristics-information">
                        <p style="font-size: 21px;">
                            <i class="fa fa-cog"></i>
                            Characteristics
                        </p>
                        
                        <div class="contenedor-tags">
                            ${listaCharacteristics}
                            <p style="font-style: italic; color: #5e615d; font-weight: 500;">"${animal.actitudes}"</p>
                        </div>

                        <div class="health">
                            <p>
                                <i class="fa fa-shield" style="font-size: 22px; color: orange;"></i>
                                <span style="margin-left: 10px; font-size: 20px;">Health & Care</span>
                            </p>

                            <div>
                                <p style="width: 300px; box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.08); padding: 14px 12px; background-color: #ffffff; border-radius: 14px;">
                                    Vaccinated
                                    <i class="fa fa-check-circle" style="margin-left: 10rem; font-size: 19px; color: #48da05;"></i>
                                </p>                            
                            </div>

                            <p style="width: 300px; box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.08); padding: 14px 12px; background-color: #ffffff; border-radius: 14px;">
                                Neutered
                                <i class="fa fa-check-circle" style="margin-left: 11rem; font-size: 19px; color: #48da05;"></i>
                            </p>
                        </div>

                        <div class="div-adoptMe">
                            <i class="fa fa-commenting" style="cursor: pointer; background: #d9e3f8; padding: 15px 15px; font-size: 22px; border-radius: 14px;"></i>
                            <button type="button" style="cursor: pointer; box-shadow: 0px 0px 12px rgba(255, 140, 0, 0.3); margin-left: 10px; background-color: #f8a915; padding: 15px 15px; font-size: 20px; font-weight: bold; width: 300px; border: none; border-radius: 18px; color: white;">Adopt Me</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        `;
        divPrincipal.append(container);
    }
}



// funcion de cachorros nuevos muestra los 4
function showNewPuppies() {
    const containerNewAnimals = document.querySelector('.containerNewPuppies');
    containerNewAnimals.innerHTML = '';

    newPuppies.forEach(newAnimals => {

        const card_Animal = document.createElement('div');
        card_Animal.classList.add('cardAnimalsNew');

        card_Animal.innerHTML = `
            <div class="card_new_puppies">
                <img src="${newAnimals.URL}" alt="${newAnimals.raza}">
                <p>${newAnimals.raza}
                    <span style="font-weight: 500; font-size: 12px; margin-left: 20px; color: #606461; border-radius: 10px; padding: 2.5px; background-color: #8afaa6;">${newAnimals.estadia}</span>
                </p>
                <p style="color: #5bf18d;">${newAnimals.precio}</p>
                <a href="/detailsAnimals.html?raza=${newAnimals.raza}" class="enlaceVerDetalles">Ver detalles</a>
            </div>
        `;

        containerNewAnimals.append(card_Animal);

    })
    
}

// Funcion para mostrar todos los detalles de los animales nuevos
function verDetalles() {
    const containerMajor = document.getElementById('div_principal');

    // 1. Verificar primero si el contenedor existe en el HTML
    if(!containerMajor){
        console.error('no se encontro el contenedor principal');
        return;
    }

    // Obtener el valor del animal seleccionado segun su raza y click
    const urlParams = new URLSearchParams(window.location.search);
    const razaSeleccionada = urlParams.get('raza');

    // 2. Buscar el animal
    const newAnimal = newPuppies.find(a => a.raza === razaSeleccionada);

    // 3. Validar si se encontró el animal
    if(newAnimal){
        // Limpiamos el contenido previo para que no se acumulen
        containerMajor.innerHTML = '';

        let claseIcono = newAnimal.sexo === 'hembra' ? 'fa fa-venus' : 'fa fa-mars';
        let colorGenero = newAnimal.sexo === 'hembra' ? '#ff69b4' : '#00aaff';
        let tamanioIcono = '30px';

        const cardNewAnimals = document.createElement('div');
        cardNewAnimals.classList.add('card_NewAnimals');

        cardNewAnimals.innerHTML = `
            <div class="details_animals_new">
                <div class="container-foto">
                    <div class="contenedor-foto">
                        <img src="${newAnimal.URL}" alt="${newAnimal.raza}">
                    </div>               
                    <i class="fa-solid fa-paw" style="margin-left: 20rem; box-shadow: 0px 0px 10px 1px rgba(115, 116, 116, 0.53); color: white; padding: 22px 20px; background-color: #fadd37; border-radius: 30px;"></i>
                </div>

                <div class="raza">
                    <p>${newAnimal.raza}</p>
                </div>                

                <div class="divs-information">

                    <div class="sexo">
                        <div>
                            <i class="${claseIcono}" style="color: ${colorGenero}; margin-left: 34px; font-size: ${tamanioIcono};"></i>
                            <p>${newAnimal.sexo}</p>
                        </div>
                    </div>

                    <div class="peso">
                        <div>
                            <i class="fa fa-balance-scale" style="font-size: 30px; margin-left: 34px;"></i>
                            <p>${newAnimal.peso}</p>
                        </div>
                    
                    </div>

                    <div class="personalidad">

                        <div>
                            <i class="fa fa-brain" style="font-size: 30px; margin-left: 34px;"></i>
                            <p style="font-size: 14px;">${newAnimal.personalidad}</p>      
                        </div>

                    </div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 60px;">
                    <div style="background-color: #ff7070; border-radius: 14px; width: 150px; padding: 5px; display: flex; gap: 10px;">
                        <p>
                            <i class="fa-solid fa-cake-candles" style="font-size: 20px; "></i>
                            <p style="font-size: 17px; ">${newAnimal.edad}</p>                 
                        </p>
                    </div>

                    <div style="background-color: #fd65fd; border-radius: 14px; width: 150px; padding: 5px; display: flex; gap: 10px;">
                        <p>
                            <i class="fa-solid fa-tag"  style="font-size: 20px;"></i>
                            <p>${newAnimal.precio}</p>                  
                        </p>
                    </div>

                    <div style="background-color: #34e1ff; border-radius: 14px; width: 150px; padding: 5px; display: flex; gap: 10px;">
                        <p>
                            <i class="fa-solid fa-clock-rotate-left"  style="font-size: 20px;"></i>
                            <p>${newAnimal.estadia}</p>                      
                        </p>

                    </div>               
                
                </div>

                <div style="height: 250px; margin-top: 40px;">
                    <p>
                        <i class="fa-solid fa-book-open" style="color: #fc7f6f; font-size: 24px;"></i>
                        <span style="font-size: 18px; font-family: Arial, sans-serif; font-weight: bolder;">Su Historia</span>      
                    </p>


                    <p style="line-height: 1.4; font-style: italic; color: rgba(71, 70, 70, 0.75); background-color: #fcfcfc; padding: 20px; border-radius: 16px; border-left: 5px solid #fc7f6f;">${newAnimal.historia}</p>
                </div>

                <div class="div-final">
                    <p>
                        <button type="button" style="margin-right: 10px; color: #ffffff; font-size: 14px; width: 250px; font-weight: bolder; padding: 14px; border-radius: 16px; border:none; background-color: #fd65fd;">Consultar por el ${newAnimal.raza}</button>
                        <i class="fa-solid fa-share-nodes" style="border-radius: 16px; background-color: #95979321; padding: 15px 15px; font-size: 22px; text-aling: center;"></i>
                    </p>
                </div>
                
            </div>
        `;

        containerMajor.append(cardNewAnimals);

    }else{
        containerMajor.innerHTML = `<p>No hay datos de la mascota nueva</p>`
    }
}


// Funcion para ver todos los datos de los animales en adopcion
function mostradorData() {
    const containerDivAdopcion = document.getElementById('idAdopcion');
    containerDivAdopcion.innerHTML = '';

    animalesRescatados.forEach(animal => {

        const cardAnimales = document.createElement('div');
        cardAnimales.classList.add('animalesAdopcion');

        cardAnimales.innerHTML = `
            <div class="card_animal_adopcion">
                <img src="${animal.URL}" alt="${animal.nombre}" style="width: 80%; height: 250px; margin-left: 20px;">
                <h3 style="font-weight: bolder;">${animal.nombre}</h3>
                <p><strong style="font-weight: 600;">Especie:</strong> ${animal.especie}</p>
                <p><strong style="font-weight: 600;">Raza:</strong> ${animal.raza}</p>
                <p></p>
                <a href="/conocerMascota.html?nombre=${animal.nombre}"  class="conocerAnimal">Conocer a ${animal.nombre}</a>
            </div>
        `;

        containerDivAdopcion.append(cardAnimales);

    });

}

