
let ultima = -1; //-1 representa vacio

document.addEventListener("DOMContentLoaded", () => {

    const estrellas = document.querySelectorAll('.estrellas');

    if(!estrellas.length) return;

    // index respresenta la primera estrella a la que se le hizo click
    estrellas.forEach((estrellaSeleccionada, index) => { 
        estrellaSeleccionada.addEventListener('change', () => {

            //  si index es <= a i entonces que se seleccionen las que esten abajo del nivel de index
            if(ultima == index ){
                estrellas.forEach(e => e.checked = false);
                ultima = -1;
            }else{
                // I representa cada una de las estrellas mientras el codigo va revisando una por una para pintarlas
                estrellas.forEach((e, i) => { e.checked = i <= index})
                ultima = index;
            };
            /* automaticamente Desmarca las que son mayores a index */

        });

    });

    renderzarDatos();

});

function recibirComentario( ){
    const comentario = document.querySelector('.escritura_comentario');
    const comentarioUser = comentario.value;

    if(!comentarioUser.trim())
    { 
        console.log("No hay texto");
        return;
    }

    if(ultima === -1){
        alert("Porfavor seleccione una calificacion")
        return;
    }

    recibirResenia(ultima,comentarioUser.trim());
    comentario.value = "";
}

function recibirResenia(ultima,comentarioUser) {
    const cantidadEstrellas = ultima + 1;

    let dataFecha = new Date();
    let diaActual = dataFecha.getDate();

    const resenias = JSON.parse(localStorage.getItem('mis_resenias')) || [];

    const nuevasResenias = {
        comentario: comentarioUser,
        estrellas: cantidadEstrellas,
        fecha: diaActual
    };

    resenias.push(nuevasResenias);

    localStorage.setItem('mis_resenias',JSON.stringify(resenias));

}

function fechaEstadoComentario()
{
    let buttomFecha = document.querySelector('.fechaEstadoComentario');
    buttomFecha.addEventListener('click', () => {

    });

}

function renderzarDatos()
{
    // EL div principal llamdo directamente desde HTML
    const lista = document.querySelector(".container_mostrar_comentarios");

    // Esto almacena la clave(con sus valores) del localStorage en una variable, si no hay nada devuelve un array/objeto vacio
    const datosAlmacenados = JSON.parse(localStorage.getItem('mis_resenias')) || [];

    lista.innerHTML = "";

    datosAlmacenados.forEach(resenia => {
        let iconosEstrellas = '';

        for(let i = 0; i < resenia.estrellas; i++){
            iconosEstrellas += '<i class="fa-solid fa-star" style="color: gold; font-size: 15px;"></i>';
        }

        let contenedor = document.createElement('div');
        contenedor.className = 'contenedorComentarios';
        contenedor.innerHTML = `
            <div class="estrellasCantidadPublic">${iconosEstrellas}
                <p class="fechaPublic">Hace ${resenia.fecha} días</p>
            </div>
            <p class="comentarioPublic">${resenia.comentario}</p>
        `;

        lista.prepend(contenedor);

    });

}
